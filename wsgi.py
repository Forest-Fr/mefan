import sys
import os

project_home = '/home/oliver128/flask_app'
if project_home not in sys.path:
    sys.path.append(project_home)

from webhook_app import app as application
