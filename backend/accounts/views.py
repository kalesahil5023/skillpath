import uuid
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer

class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens immediately upon registration
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "displayName": user.first_name or user.username,
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({"user": serializer.data})


class GoogleAuthView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        credential = request.data.get("credential")
        if not credential:
            return Response(
                {"error": "Google credential token is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Verify the ID token using Google public certificates
            client_id = getattr(settings, "GOOGLE_CLIENT_ID", "") or None
            idinfo = id_token.verify_oauth2_token(
                credential,
                google_requests.Request(),
                audience=client_id,
            )

            email = idinfo.get("email")
            if not email:
                return Response(
                    {"error": "Google account did not provide an email address."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            email = email.lower().strip()
            name = idinfo.get("name", "")

            # Look up existing user by email or create new account
            user = User.objects.filter(email__iexact=email).first()
            if not user:
                base_username = email.split("@")[0].replace(".", "_")[:20]
                unique_suffix = str(uuid.uuid4())[:6]
                username = f"{base_username}_{unique_suffix}"

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=name,
                )
                user.set_unusable_password()
                user.save()
            elif not user.first_name and name:
                user.first_name = name
                user.save()

            # Issue standard SimpleJWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "displayName": user.first_name or user.username,
                },
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "message": "Google authentication successful."
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response(
                {"error": f"Invalid Google token: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Google authentication failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
