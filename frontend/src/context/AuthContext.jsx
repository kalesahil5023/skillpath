import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi, tokenStorage } from "../api/client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => tokenStorage.getUser());
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login"); // "login" | "register"

  // On mount, verify current user token if stored
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          const res = await authApi.getMe();
          setUser(res.data.user);
          tokenStorage.setTokens(null, null, res.data.user);
        } catch {
          // Token invalid or expired
          tokenStorage.clear();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    const res = await authApi.login({ username, password });
    const { access, refresh, user: userData } = res.data;
    tokenStorage.setTokens(access, refresh, userData);
    setUser(userData);
    setAuthModalOpen(false);
    return userData;
  };

  const register = async (username, email, password, displayName) => {
    const res = await authApi.register({ username, email, password, displayName });
    const { access, refresh, user: userData } = res.data;
    tokenStorage.setTokens(access, refresh, userData);
    setUser(userData);
    setAuthModalOpen(false);
    return userData;
  };

  const loginWithGoogle = async (credential) => {
    const res = await authApi.googleLogin(credential);
    const { access, refresh, user: userData } = res.data;
    tokenStorage.setTokens(access, refresh, userData);
    setUser(userData);
    setAuthModalOpen(false);
    return userData;
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
