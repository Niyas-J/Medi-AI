# Railway Deployment Instructions

This project uses **Docker** for deployment, not Nixpacks.

## Configuration

- **Builder**: DOCKERFILE (specified in railway.toml)
- **Dockerfile**: Located at project root
- **Backend Path**: `packages/backend/`

## Important Files

1. `Dockerfile` - Main deployment configuration
2. `railway.toml` - Tells Railway to use Docker builder
3. `.nixpacksignore` - Prevents Nixpacks auto-detection

## Manual Override (if needed)

If Railway still tries to use Nixpacks:

1. Go to Railway Dashboard → Your Project → Settings
2. Under "Build", manually set:
   - Builder: `DOCKERFILE`
   - Dockerfile Path: `Dockerfile`
3. Click "Deploy" to redeploy with Docker

## Environment Variables Required

Set these in Railway dashboard:

- `FLASK_SECRET_KEY`
- `OPENAI_API_KEY`
- `GOOGLE_MAPS_API_KEY`
- `FIREBASE_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_APP_ID`
- `JWT_SECRET_KEY`
- `ENCRYPTION_KEY`
- `CORS_ORIGINS`

See `environment.env` for all available variables.

