"""
WSGI config proxy for backend/ directory.
Allows Gunicorn to resolve 'wsgi:application' when executed directly inside backend/.
"""

import os
import sys
from pathlib import Path

# Add backend directory to sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "skillpath_backend.settings")

from skillpath_backend.wsgi import application
