# Environment Configuration Setup

This guide explains how to set up and manage environment variables for the Medi-AI Suite.

## 📁 Environment Files

### 1. `environment.env` (Template)
This is the template file containing all possible configuration options. **DO NOT** commit this file with real API keys.

### 2. `.env` (Local Development)
Copy `environment.env` to `.env` and update with your actual API keys. This file is ignored by git.

## 🔑 Required API Keys

### Essential Keys (Required for basic functionality)
- `OPENAI_API_KEY` - For AI chat functionality
- `GOOGLE_MAPS_API_KEY` - For location services

### Optional Keys (For full functionality)
- `FIREBASE_*` - For authentication and database
- `AWS_*` - For cloud services
- `SMTP_*` - For email notifications

## 🚀 Quick Setup

1. **Copy the environment template:**
   ```bash
   cp environment.env .env
   ```

2. **Update the .env file with your API keys:**
   ```bash
   # Edit .env file
   nano .env
   ```

3. **Install dependencies:**
   ```bash
   cd packages/backend
   pip install python-dotenv
   ```

4. **Start the application:**
   ```bash
   python run.py
   ```

## 🔧 Configuration Classes

The application uses different configuration classes based on the environment:

- **Development** - Debug enabled, local database
- **Production** - Debug disabled, production database
- **Testing** - In-memory database for tests

## 📋 Environment Variables Reference

### Flask Configuration
```env
FLASK_SECRET_KEY=your_secret_key
FLASK_ENV=development
FLASK_DEBUG=True
```

### API Keys
```env
OPENAI_API_KEY=sk-proj-...
GOOGLE_MAPS_API_KEY=AIza...
FIREBASE_API_KEY=your_firebase_key
```

### Database
```env
DATABASE_URL=sqlite:///medi_ai_suite.db
```

### CORS Configuration
```env
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 🛡️ Security Best Practices

1. **Never commit .env files** to version control
2. **Use strong, unique keys** for each environment
3. **Rotate API keys** regularly
4. **Use environment-specific keys** for production
5. **Monitor API usage** to detect unauthorized access

## 🔍 Troubleshooting

### Missing API Keys
If you see warnings about missing API keys:
1. Check that your `.env` file exists
2. Verify the key names match exactly
3. Ensure no extra spaces or quotes around values

### Configuration Not Loading
1. Ensure `python-dotenv` is installed
2. Check that `.env` is in the correct directory
3. Verify the file format (no spaces around `=`)

### CORS Issues
1. Add your frontend URL to `CORS_ORIGINS`
2. Ensure URLs are comma-separated
3. Check for trailing slashes

## 📝 Example .env File

```env
# Flask Configuration
FLASK_SECRET_KEY=your-super-secret-key-here
FLASK_ENV=development
FLASK_DEBUG=True

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google Maps Configuration
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# API URLs
FLASK_API_URL=http://localhost:5000/api
PRODUCTION_API_URL=https://your-production-api.com/api

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8081
```

## 🚨 Important Notes

- The `.env` file is automatically ignored by git
- Always use the `environment.env` template for new deployments
- Test your configuration before deploying to production
- Keep your API keys secure and never share them publicly
