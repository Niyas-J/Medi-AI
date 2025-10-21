# Railway Deployment Guide for Medi-AI Suite Backend

This guide will help you deploy the Flask backend to Railway.

## Prerequisites

- Railway account (https://railway.app)
- GitHub repository connected to Railway
- Environment variables configured

## Deployment Steps

### 1. Connect to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose the `Niyas-J/Medi-AI` repository
5. Railway will automatically detect the `nixpacks.toml` configuration

### 2. Configure Environment Variables

In the Railway dashboard, go to your project settings and add these environment variables:

```env
# Flask Configuration
FLASK_SECRET_KEY=43d3e763cc93f6b8bcfe939d44a924cb
FLASK_ENV=production
FLASK_DEBUG=False

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google Maps Configuration
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyAE9fYdR-23iyxOLN1s26UEWiT942vV68E
FIREBASE_AUTH_DOMAIN=medi-ai-f5ab0.firebaseapp.com
FIREBASE_PROJECT_ID=medi-ai-f5ab0
FIREBASE_STORAGE_BUCKET=medi-ai-f5ab0.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=241436652845
FIREBASE_APP_ID=1:241436652845:web:73cf4520df55e8ad638fa4
FIREBASE_MEASUREMENT_ID=G-X15LNRDRLP

# Security
JWT_SECRET_KEY=hzpzM6QWsxRzea26SU0kmo-ULo8ZDWc2hXFNXfGtfyw
ENCRYPTION_KEY=AOdxdJPJLl8-KPi5VTOnN33_60pxxHjJUU8gDmoeno4=

# CORS Configuration (add your frontend URLs)
CORS_ORIGINS=https://your-frontend-domain.com,https://niyas-j.github.io
```

### 3. Deploy

Railway will automatically:
1. Detect the Python environment
2. Install dependencies from `packages/backend/requirements.txt`
3. Run the Flask application using the command in `nixpacks.toml`

### 4. Verify Deployment

Once deployed, Railway will provide you with a URL like:
```
https://your-project-name.up.railway.app
```

Test your endpoints:
- Health check: `https://your-project-name.up.railway.app/api/health`
- AI Chat: `https://your-project-name.up.railway.app/api/chat`

## Configuration Files

### `Dockerfile`
Railway will automatically detect and use this Dockerfile:
- Uses Python 3.11-slim base image
- Installs system dependencies (gcc for Python packages)
- Installs Python dependencies from `packages/backend/requirements.txt`
- Copies the backend application
- Exposes port 5000 (Railway will set the actual PORT)
- Runs the Flask application with `python run.py`

### `Procfile`
Alternative configuration for platforms like Heroku:
```
web: cd packages/backend && python run.py
```

### `.dockerignore`
Excludes unnecessary files from the Docker build:
- Frontend packages (mobile, web)
- Development files and documentation
- Node modules and test files
- Reduces build size and speeds up deployment

## Troubleshooting

### Build Fails with "yarn not found" or Nixpacks errors
✅ **Fixed** - Now using a standard Dockerfile instead of Nixpacks.

### Port Issues
✅ **Fixed** - The Flask app automatically uses Railway's PORT environment variable:
```python
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port, debug=debug)
```

### CORS Errors
Add your frontend domain to the `CORS_ORIGINS` environment variable:
```
CORS_ORIGINS=https://your-frontend.com,https://another-domain.com
```

### Environment Variables Not Loading
1. Check that all required variables are set in Railway dashboard
2. Verify the `.env` file is in `packages/backend/` directory
3. Make sure `python-dotenv` is in `requirements.txt`

## Update Deployment

Whenever you push to the `main` branch on GitHub, Railway will automatically:
1. Pull the latest code
2. Rebuild the application
3. Deploy the new version

## Monitoring

In the Railway dashboard, you can:
- View real-time logs
- Monitor resource usage
- Check deployment history
- Restart the service if needed

## Cost

Railway offers:
- **Free tier**: $5 of usage per month
- **Pro plan**: $20/month with $10 included usage

The Flask backend should easily fit within the free tier for development and testing.

## Support

For Railway-specific issues:
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

For Medi-AI Suite issues:
- GitHub Issues: https://github.com/Niyas-J/Medi-AI/issues

