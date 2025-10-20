// TODO: npm install firebase-functions firebase-admin
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.alertOnHighRisk = functions.firestore
  .document('mlResults/{docId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    if (data.result && data.result.infection_score > 0.5) {
      const payload = {
        notification: {
          title: 'High Risk Detected',
          body: 'Check patient record immediately.'
        },
        data: {
          patientId: data.userId,
          severity: data.result.severity || 'high'
        }
      };
      return admin.messaging().sendToTopic('clinicians', payload);  // FCM push
    }
    return null;
  });

// Security trigger: log unauthorized access attempts (via custom logic)
exports.securityTrigger = functions.auth.user().onCreate((user) => {
  // Add user to Firestore with role
  return admin.firestore().collection('users').doc(user.uid).set({ 
    role: 'patient',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    email: user.email
  });
});

// Emergency alert function
exports.emergencyAlert = functions.firestore
  .document('emergencies/{docId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const payload = {
      notification: {
        title: 'Medical Emergency Alert',
        body: `Emergency reported by patient at ${data.location.latitude}, ${data.location.longitude}`
      },
      data: {
        emergencyId: context.params.docId,
        patientId: data.userId,
        timestamp: data.timestamp.toMillis().toString()
      }
    };
    return admin.messaging().sendToTopic('emergency_responders', payload);
  });
