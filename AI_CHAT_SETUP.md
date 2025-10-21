# AI Chat Service Integration Guide

## Overview

The Medi-AI Suite backend is now configured to use an **external AI Chat service** via a direct URL link. OpenAI code has been removed to allow you to integrate your preferred AI chat provider.

## How It Works

The `/api/chat` endpoint now acts as a **proxy** that forwards chat requests to your external AI service.

### Request Flow:
1. User sends message to: `POST /api/chat`
2. Backend forwards to: `AI_CHAT_URL` (your external service)
3. External service returns AI response
4. Backend returns response to user

## Setup Instructions

### Step 1: Get Your AI Chat Service URL

You need to provide a URL to an AI chat API endpoint that accepts this format:

**Request:**
```json
POST https://your-ai-service.com/api/chat
Content-Type: application/json

{
  "message": "What are the symptoms of a cold?"
}
```

**Expected Response:**
```json
{
  "response": "Common cold symptoms include...",
  "confidence": 0.9,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Step 2: Add URL to Environment

#### For Local Development:

Edit `packages/backend/.env`:
```env
AI_CHAT_URL=https://your-ai-service.com/api/chat
```

#### For Railway Deployment:

1. Go to Railway Dashboard
2. Select your project
3. Go to "Variables" tab
4. Add new variable:
   - **Name**: `AI_CHAT_URL`
   - **Value**: `https://your-ai-service.com/api/chat`
5. Click "Save" and redeploy

### Step 3: Test the Integration

```bash
# Test the chat endpoint
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the symptoms of a cold?"}'
```

## Fallback Behavior

If `AI_CHAT_URL` is not set, the backend will:
- Return smart fallback responses for common medical questions
- Provide helpful messages for other queries
- Still work without errors

**Example fallback topics:**
- Cold symptoms
- Fever information
- Headache advice
- General health guidance

## Supported AI Services

You can use any AI chat service that:
- Accepts POST requests with JSON
- Returns JSON responses
- Has a publicly accessible URL

**Popular options:**
- Custom AI chat APIs
- Hugging Face Inference API
- Replicate API
- Custom LLM deployments
- Any REST API that provides chat functionality

## API Contract

### Your AI Service Must Accept:

```typescript
interface ChatRequest {
  message: string;  // User's question
}
```

### Your AI Service Should Return:

```typescript
interface ChatResponse {
  response: string;      // AI's answer
  confidence?: number;   // Optional confidence score (0-1)
  timestamp?: string;    // Optional ISO timestamp
  model?: string;        // Optional model name
  [key: string]: any;    // Any additional fields
}
```

## Example Integration

### Example 1: Hugging Face Inference API

```env
AI_CHAT_URL=https://api-inference.huggingface.co/models/your-model
```

You may need to adjust the backend code to match Hugging Face's request format.

### Example 2: Custom API

```env
AI_CHAT_URL=https://my-custom-ai.example.com/chat
```

### Example 3: OpenAI Alternative

```env
AI_CHAT_URL=https://api.openai-alternative.com/v1/chat
```

## Troubleshooting

### Issue: "AI Chat service not configured"

**Solution**: Set the `AI_CHAT_URL` environment variable.

### Issue: "External AI service is temporarily unavailable"

**Causes:**
- AI service is down
- Incorrect URL
- Network connectivity issues
- AI service requires authentication headers

**Solutions:**
1. Verify the URL is correct
2. Test the URL directly with curl/Postman
3. Check AI service status/logs
4. Add authentication if required (see below)

### Adding Authentication Headers

If your AI service requires authentication, modify `packages/backend/app/routes.py`:

```python
# In the chat() function, update the requests.post call:
response = requests.post(
    ai_chat_url,
    json={'message': message},
    timeout=10,
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {current_app.config.get("AI_CHAT_API_KEY")}'
    }
)
```

Then add `AI_CHAT_API_KEY` to your environment variables.

## Testing Without External Service

The backend works perfectly without an external AI service - it uses smart fallback responses. This is great for:
- Development/testing
- Demos
- Situations where AI service is unavailable

## Next Steps

1. **Choose your AI service** - Select an AI chat API provider
2. **Get the URL** - Obtain the API endpoint URL
3. **Set environment variable** - Add `AI_CHAT_URL` to .env or Railway
4. **Test** - Verify the integration works
5. **Deploy** - Push changes and redeploy

## Questions?

When you have your AI Chat service URL ready, simply set the `AI_CHAT_URL` environment variable and the integration will work automatically!

---

**Status**: ✅ OpenAI code removed - Ready for your AI Chat URL
**Updated**: After removing OpenAI dependency

