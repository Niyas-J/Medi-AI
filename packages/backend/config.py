"""
Configuration management for Medi-AI Suite Backend
Loads environment variables from .env file
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration class"""
    
    # Flask Configuration
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    ENV = os.getenv('FLASK_ENV', 'development')
    
    # API Keys
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY', '')
    
    # Firebase Configuration
    FIREBASE_API_KEY = os.getenv('FIREBASE_API_KEY', '')
    FIREBASE_AUTH_DOMAIN = os.getenv('FIREBASE_AUTH_DOMAIN', '')
    FIREBASE_PROJECT_ID = os.getenv('FIREBASE_PROJECT_ID', '')
    FIREBASE_STORAGE_BUCKET = os.getenv('FIREBASE_STORAGE_BUCKET', '')
    FIREBASE_MESSAGING_SENDER_ID = os.getenv('FIREBASE_MESSAGING_SENDER_ID', '')
    FIREBASE_APP_ID = os.getenv('FIREBASE_APP_ID', '')
    FIREBASE_MEASUREMENT_ID = os.getenv('FIREBASE_MEASUREMENT_ID', '')
    
    # Database Configuration
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///medi_ai_suite.db')
    
    # Blockchain Configuration
    INFURA_KEY = os.getenv('INFURA_KEY', '')
    
    # API URLs
    FLASK_API_URL = os.getenv('FLASK_API_URL', 'http://localhost:5000/api')
    PRODUCTION_API_URL = os.getenv('PRODUCTION_API_URL', '')
    
    # CORS Configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173,http://localhost:8081').split(',')
    
    # Security
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    ENCRYPTION_KEY = os.getenv('ENCRYPTION_KEY', 'encryption-key-change-in-production')
    
    # External Services
    GOOGLE_CLOUD_PROJECT_ID = os.getenv('GOOGLE_CLOUD_PROJECT_ID', '')
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID', '')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY', '')
    AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')
    
    # Email Configuration
    SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
    
    # File Upload Configuration
    MAX_FILE_SIZE = int(os.getenv('MAX_FILE_SIZE', '10485760'))  # 10MB
    ALLOWED_EXTENSIONS = os.getenv('ALLOWED_EXTENSIONS', 'jpg,jpeg,png,gif,pdf,doc,docx').split(',')
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE = int(os.getenv('RATE_LIMIT_PER_MINUTE', '60'))
    RATE_LIMIT_PER_HOUR = int(os.getenv('RATE_LIMIT_PER_HOUR', '1000'))
    
    # Logging
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FILE = os.getenv('LOG_FILE', 'logs/medi-ai-suite.log')
    
    @classmethod
    def get_firebase_config(cls):
        """Get Firebase configuration as dictionary"""
        return {
            'apiKey': cls.FIREBASE_API_KEY,
            'authDomain': cls.FIREBASE_AUTH_DOMAIN,
            'projectId': cls.FIREBASE_PROJECT_ID,
            'storageBucket': cls.FIREBASE_STORAGE_BUCKET,
            'messagingSenderId': cls.FIREBASE_MESSAGING_SENDER_ID,
            'appId': cls.FIREBASE_APP_ID,
            'measurementId': cls.FIREBASE_MEASUREMENT_ID
        }
    
    @classmethod
    def validate_required_keys(cls):
        """Validate that required API keys are present"""
        required_keys = [
            'OPENAI_API_KEY',
            'GOOGLE_MAPS_API_KEY'
        ]
        
        missing_keys = []
        for key in required_keys:
            if not getattr(cls, key):
                missing_keys.append(key)
        
        if missing_keys:
            raise ValueError(f"Missing required API keys: {', '.join(missing_keys)}")
        
        return True

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False

class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    DATABASE_URL = 'sqlite:///:memory:'

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
