"""
Root WSGI config entrypoint.
Enables Gunicorn to run from the repository root directory.
"""

import os
import sys
from pathlib import Path

# Add root directory and backend directory to sys.path
root_dir = Path(__file__).resolve().parent
backend_dir = root_dir / "backend"

if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "skillpath_backend.settings")

from skillpath_backend.wsgi import application
