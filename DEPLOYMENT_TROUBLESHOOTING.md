# Railway Deployment Troubleshooting Guide

## ✅ Issue: Nixpacks Build Errors (RESOLVED)

### Error Message:
```
error: undefined variable 'pip'
RUN nix-env -if .nixpacks/nixpkgs-ffeebf0acf3ae8b29f8c7049cd911b9636efd7e7.nix
ERROR: failed to build: failed to solve: process ... did not complete successfully: exit code: 1
```

### Root Cause:
Railway was auto-detecting the project as a Node.js/npm project and trying to use Nixpacks builder, which was failing due to Python configuration issues.

### Solution Implemented:

#### 1. **Created `railway.toml`** ✅
Forces Railway to use Docker instead of Nixpacks:
```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"
```

#### 2. **Created `.nixpacksignore`** ✅
Prevents Nixpacks auto-detection entirely:
```
*
```

#### 3. **Created Production Dockerfile** ✅
Standard Docker configuration that Railway can reliably build:
```dockerfile
FROM python:3.11-slim
# ... optimized for Railway deployment
```

#### 4. **Removed Node.js Hints** ✅
- Removed `engines` section from `package.json`
- Simplified build scripts to avoid npm confusion

#### 5. **Updated Flask App** ✅
Configured to work with Railway's environment:
```python
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port, debug=debug)
```

## 🚀 Deployment Steps

### Option 1: Automatic (Recommended)
Railway should now automatically:
1. Detect the `Dockerfile` in the root
2. Use the `railway.toml` configuration
3. Build with Docker (not Nixpacks)
4. Deploy the Flask backend

### Option 2: Manual Override (If Still Using Nixpacks)

If Railway dashboard still shows "Nixpacks" builder:

1. **Go to Railway Dashboard**
   - Open your project
   - Click on "Settings" tab

2. **Change Builder Manually**
   - Find "Build" section
   - Set "Builder" to: `DOCKERFILE`
   - Set "Dockerfile Path" to: `Dockerfile`
   - Click "Save"

3. **Trigger Redeploy**
   - Go to "Deployments" tab
   - Click "Redeploy" button
   - Monitor logs for successful Docker build

## 📋 Verification Checklist

After deployment, verify:

- [ ] Build logs show "Building Dockerfile" (not "Building with Nixpacks")
- [ ] Build completes successfully without Python/pip errors
- [ ] Application starts on Railway-assigned PORT
- [ ] Health check endpoint responds: `/api/health`
- [ ] AI Chat endpoint works: `/api/chat`

## 🔍 Expected Build Output

You should see logs like:
```
Building Dockerfile
Step 1/10 : FROM python:3.11-slim
Step 2/10 : WORKDIR /app
Step 3/10 : RUN apt-get update && apt-get install -y gcc
Step 4/10 : COPY packages/backend/requirements.txt ./
Step 5/10 : RUN pip install --no-cache-dir -r requirements.txt
...
Successfully built and deployed!
```

## ⚙️ Environment Variables

Make sure these are set in Railway dashboard:

### Required:
- `FLASK_SECRET_KEY` - Your Flask secret key
- `OPENAI_API_KEY` - OpenAI API key for AI chat
- `FIREBASE_API_KEY` - Firebase API key
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_APP_ID` - Firebase app ID
- `JWT_SECRET_KEY` - JWT secret for authentication
- `ENCRYPTION_KEY` - Encryption key for sensitive data

### Optional:
- `GOOGLE_MAPS_API_KEY` - For location services
- `CORS_ORIGINS` - Allowed frontend origins (comma-separated)
- `FLASK_DEBUG` - Set to `False` for production

## 🐛 Still Having Issues?

### Check 1: Verify Files Exist
Ensure these files are in your repository:
- ✅ `Dockerfile` (at root)
- ✅ `railway.toml` (at root)
- ✅ `.nixpacksignore` (at root)
- ✅ `packages/backend/requirements.txt`
- ✅ `packages/backend/run.py`

### Check 2: Clear Railway Cache
1. Go to Railway Dashboard → Settings
2. Find "Danger Zone"
3. Click "Clear Build Cache"
4. Redeploy

### Check 3: Check Repository
Verify latest commit is deployed:
```bash
git log --oneline -3
# Should show: "Force Railway to use Docker..."
```

### Check 4: Contact Railway Support
If issue persists:
- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app
- Railway GitHub: https://github.com/railwayapp/railway

## 📚 Related Files

- `Dockerfile` - Main deployment configuration
- `railway.toml` - Railway builder configuration
- `.dockerignore` - Docker build optimization
- `.nixpacksignore` - Prevents Nixpacks detection
- `Procfile` - Alternative for Heroku deployment
- `RAILWAY_DEPLOYMENT.md` - Complete deployment guide
- `railway.README.md` - Quick reference for Railway

## ✅ Success Indicators

Deployment is successful when you can:
1. Access your app at the Railway URL
2. GET `/api/health` returns `{"status": "healthy", "version": "1.0.0"}`
3. POST to `/api/chat` with `{"message": "test"}` returns AI response
4. No Nixpacks errors in build logs
5. Application logs show Flask running on PORT from Railway

---

**Last Updated**: After commit `38730bb`  
**Status**: ✅ Nixpacks errors resolved - using Docker builder

