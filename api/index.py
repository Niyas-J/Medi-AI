"""
Vercel Serverless Function Entry Point
This file imports the Flask app and makes it compatible with Vercel
"""
import sys
import os

# Add the backend package to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'packages', 'backend'))

from app import create_app

# Create the Flask app
app = create_app()

# Vercel expects the Flask app to be available as 'app'
# This is the WSGI application that Vercel will call

