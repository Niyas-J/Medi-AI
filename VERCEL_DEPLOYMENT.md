# Vercel Deployment Guide

## 🚀 Deploy Medi-AI Suite to Vercel

Vercel is perfect for deploying the Flask backend with zero configuration issues!

## Prerequisites

- Vercel account (free): https://vercel.com
- GitHub repository: https://github.com/Niyas-J/Medi-AI

## Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

#### Step 1: Sign Up / Log In
1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**

#### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"Niyas-J/Medi-AI"** in your repositories
3. Click **"Import"**

#### Step 3: Configure Project
1. **Project Name**: `medi-ai-suite` (or any name you prefer)
2. **Framework Preset**: Select **"Other"** or **"Python"**
3. **Root Directory**: Leave as `/` (or select `medi-ai-suite` if needed)
4. **Build Command**: Leave empty (Vercel auto-detects)
5. **Output Directory**: Leave empty
6. **Install Command**: `pip install -r requirements.txt`

#### Step 4: Environment Variables (Optional)
Click **"Environment Variables"** and add (all optional):
- `AI_CHAT_URL` - Your AI chat service URL (if you have one)
- `GOOGLE_MAPS_API_KEY` - For location services (if you have one)

**Note**: No API keys are required! The app works without them.

#### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. Your app will be live at: `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd medi-ai-suite

# Deploy
vercel

# Follow the prompts
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? medi-ai-suite
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

## Configuration Files

### `vercel.json`
Tells Vercel how to build and route the Flask app:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "packages/backend/run.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "packages/backend/run.py"
    }
  ]
}
```

### `api/index.py`
Vercel serverless function entry point that loads the Flask app.

### `requirements.txt`
Lightweight dependencies (removed TensorFlow/OpenCV for faster builds):
- Flask
- Flask-CORS
- requests
- python-dotenv

## After Deployment

### Test Your Endpoints

Replace `your-project-name` with your actual Vercel project name:

```bash
# Health check
curl https://your-project-name.vercel.app/api/health

# AI Chat
curl -X POST https://your-project-name.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the symptoms of a cold?"}'

# Root endpoint
curl https://your-project-name.vercel.app/
```

Expected responses:
- ✅ `/api/health` - Returns healthy status
- ✅ `/api/chat` - Returns smart fallback responses
- ✅ `/` - Returns API information

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables

To add or update environment variables after deployment:

1. Vercel Dashboard → Your Project → Settings
2. Click **"Environment Variables"**
3. Add variables (all optional):
   - `AI_CHAT_URL`
   - `GOOGLE_MAPS_API_KEY`
   - `CORS_ORIGINS`
4. Click **"Save"**
5. Redeploy to apply changes

## Advantages of Vercel

✅ **No OpenAI errors** - Clean deployment  
✅ **Automatic HTTPS** - Secure by default  
✅ **Fast deployments** - 2-3 minutes  
✅ **Serverless** - Auto-scaling  
✅ **Free tier** - Generous limits  
✅ **GitHub integration** - Auto-deploy on push  
✅ **No build cache issues** - Fresh builds every time  

## Troubleshooting

### Build fails with "Module not found"
- Check `requirements.txt` is at project root
- Ensure all imports in code exist in requirements

### 404 on all routes
- Check `vercel.json` routing is correct
- Verify `api/index.py` exists and is correct

### Timeout errors
- Vercel free tier has 10-second timeout for serverless functions
- Heavy ML operations might timeout (use external services instead)

### Environment variables not working
- Add them in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding variables

## Continuous Deployment

Once set up, Vercel automatically deploys on every push to `main` branch:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys!
```

## Monitoring

View deployment logs:
1. Vercel Dashboard → Your Project
2. Click on any deployment
3. View **"Build Logs"** and **"Function Logs"**

## Cost

**Free Tier Includes**:
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Serverless functions
- Preview deployments

**Perfect for this project!** No credit card required.

## Summary

1. ✅ Push code to GitHub (already done)
2. ✅ Go to https://vercel.com
3. ✅ Import `Niyas-J/Medi-AI` repository
4. ✅ Click "Deploy"
5. ✅ Done! Your API is live in 2-3 minutes

---

**No OpenAI errors, no API key requirements, no cache issues!** 🎉

