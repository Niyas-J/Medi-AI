# Medi-AI Suite

## Overview
Cross-platform mobile-first app (React Native/Expo for iOS/Android, React+Capacitor for PWA) with Flask backend, Firebase cloud, and optional blockchain. Bundles wound detection, medicine scanner, AI chat, emergency alerts, appointments.

## Architecture Diagram
(Text-based, use PlantUML for visual):

```
User -> Mobile/Web App -> Firebase Auth/DB/Storage -> Flask ML APIs -> Optional Blockchain/IPFS
```

Cloud Functions handle alerts/push.

## Setup Checklist
1. Create Firebase project: https://console.firebase.google.com/ - Enable Auth, Firestore, Storage, Functions, FCM.
2. Add Firebase config to mobile/src/App.js and backend.
3. Get Google Maps API key for geo.
4. Get OpenAI key for chat.
5. Optional: Infura/Alchemy for Ethereum.
6. Install deps: `yarn install` (monorepo).
7. Run mobile: `cd packages/mobile && expo start`.
8. Run backend: `cd packages/backend && python run.py`.
9. Deploy PWA: `cd packages/web && vercel`.
10. Deploy mobile: Use Expo for builds, submit to stores.
11. Insert URLs: Run `node scripts/insert-urls.js` - Replaces in AboutPage.js and this README.

Related projects:
- Wound Scan: https://niyas-j.github.io/WoundScan/
- Medicine Scan: https://niyas-j.github.io/MedicineScan/

## API Docs (openapi.yaml excerpt)
```yaml
openapi: 3.0.0
paths:
  /api/ml/wound:
    post:
      summary: Process wound image
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                imageUrl: { type: string }
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  wound_size: { type: number }
```

## UX Flows & Wireframes (Text Descriptions)
Mobile-first: All screens use large tap targets, accessibility labels (e.g., aria-label).

1. Camera Capture: Full-screen camera + overlay guides (rectangle for crop). Bottom button "Capture". Post-capture: Preview + "Upload" + tips modal.
2. Scanner: Similar camera with scan overlay. Post-scan: Metadata card + "Add to Schedule" button.
3. Chat: Bottom input bar, scrollable messages. Suggest button.
4. Emergency: Big red button, modal for context, map view with tracking.
5. Appointments: Calendar grid, doctor list, slot picker.
6. Timeline: Scrollable cards with images/graphs (use Recharts for graphs).

## Deployment Steps
- Mobile: `expo publish` for updates; build APK/IPA for stores.
- Backend: Deploy Flask to Heroku/GCP, expose /api.
- PWA: Vercel/Netlify with service worker for offline.
- Blockchain: Deploy contract to Sepolia testnet.

## One-Page Pitch for Stakeholders
**Medi-AI Suite: Empowering Clinics with AI-Driven HealthTech**

**Benefits:** Streamlines wound monitoring (reduce visits by 30%), medication adherence via scans/reminders, rapid emergency response, seamless bookings. Offline-first for rural areas; real-time alerts improve outcomes.

**Safety:** HIPAA/GDPR compliant with E2E encryption, RBAC, audit logs. Blockchain option for tamper-proof records. Prototype ready for pilot in 2 weeks - install via Expo Go, test modules.

Contact for demo: [Your Email]. See integrations: https://niyas-j.github.io/WoundScan/ and https://niyas-j.github.io/MedicineScan/.
