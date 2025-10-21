from flask import Flask
from flask_cors import CORS
from config import config
import os

# import firebase_admin
# from firebase_admin import credentials, firestore

# TODO: Add your service account key
# cred = credentials.Certificate('path/to/serviceAccountKey.json')
# firebase_admin.initialize_app(cred)
# db = firestore.client()

def create_app(config_name=None):
    app = Flask(__name__)
    
    # Load configuration
    config_name = config_name or os.getenv('FLASK_ENV', 'development')
    app.config.from_object(config[config_name])
    
    # Enable CORS for all origins specified in config
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # Register routes
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app
