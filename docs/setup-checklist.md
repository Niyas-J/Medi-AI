# Medi-AI Suite Setup Checklist

## Prerequisites
- [ ] Node.js 18+ installed
- [ ] Python 3.9+ installed
- [ ] Git installed
- [ ] Expo CLI installed (`npm install -g @expo/cli`)
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)

## 1. Firebase Setup
- [ ] Create Firebase project at https://console.firebase.google.com/
- [ ] Enable Authentication (Email/Password)
- [ ] Enable Firestore Database
- [ ] Enable Storage
- [ ] Enable Cloud Functions
- [ ] Enable Cloud Messaging (FCM)
- [ ] Download service account key (serviceAccountKey.json)
- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`
- [ ] Deploy Cloud Functions: `firebase deploy --only functions`

## 2. API Keys Setup
- [ ] Get Google Maps API key for geolocation
- [ ] Get OpenAI API key for chat functionality
- [ ] Get Infura/Alchemy key for blockchain (optional)
- [ ] Update configuration files with API keys

## 3. Mobile App Setup
- [ ] Navigate to `packages/mobile`
- [ ] Run `yarn install`
- [ ] Update `src/App.js` with Firebase config
- [ ] Update `app.json` with correct bundle identifiers
- [ ] Test with `expo start`

## 4. Web App Setup
- [ ] Navigate to `packages/web`
- [ ] Run `yarn install`
- [ ] Update Firebase config
- [ ] Update `capacitor.config.json`
- [ ] Test with `yarn dev`

## 5. Backend Setup
- [ ] Navigate to `packages/backend`
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment:
  - Windows: `venv\Scripts\activate`
  - macOS/Linux: `source venv/bin/activate`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Update `app/__init__.py` with Firebase config
- [ ] Test with `python run.py`

## 6. Blockchain Setup (Optional)
- [ ] Install Hardhat: `npm install -g hardhat`
- [ ] Navigate to `packages/infra/firebase/blockchain`
- [ ] Initialize Hardhat: `npx hardhat init`
- [ ] Deploy contract to Sepolia testnet
- [ ] Update contract address in backend

## 7. Testing
- [ ] Run mobile tests: `yarn workspace mobile test`
- [ ] Run web tests: `yarn workspace web test`
- [ ] Run backend tests: `yarn workspace backend test`
- [ ] Test API endpoints with Postman/curl
- [ ] Test Firebase integration

## 8. Deployment
- [ ] Deploy backend to Heroku/GCP
- [ ] Deploy web app to Vercel/Netlify
- [ ] Build mobile app with Expo
- [ ] Submit to app stores (iOS/Android)

## 9. Security Checklist
- [ ] Review Firestore security rules
- [ ] Enable HTTPS for all endpoints
- [ ] Set up proper CORS policies
- [ ] Implement rate limiting
- [ ] Set up monitoring and logging
- [ ] Review data encryption

## 10. Production Readiness
- [ ] Set up CI/CD pipelines
- [ ] Configure monitoring (Sentry, etc.)
- [ ] Set up backup strategies
- [ ] Performance testing
- [ ] Load testing
- [ ] Security audit

## Troubleshooting

### Common Issues
1. **Firebase connection issues**: Check API keys and project configuration
2. **Camera permissions**: Ensure proper permissions in app.json
3. **Build failures**: Check Node.js and Python versions
4. **API errors**: Verify backend is running and accessible

### Support
- Check logs in Firebase Console
- Review Expo logs for mobile issues
- Check browser console for web issues
- Review backend logs for API issues

## Next Steps
- [ ] Set up user testing
- [ ] Implement analytics
- [ ] Add more ML models
- [ ] Expand feature set
- [ ] Scale infrastructure
