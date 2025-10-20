// TODO: Configure API keys
const FIREBASE_CONFIG = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"  // Optional for analytics
};
const FLASK_API_URL = "http://localhost:5000/api";  // Or production URL
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_KEY";
const OPENAI_API_KEY = "YOUR_OPENAI_KEY";  // For AI chat
const INFURA_KEY = "YOUR_INFURA_OR_ALCHEMY_KEY";  // Optional for blockchain

import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Provider as PaperProvider } from 'react-native-paper';  // For material UI elements
import AppNavigator from './navigation/AppNavigator';
import { enableOfflineSupport } from './utils/offlineSync';  // Custom offline handler
// import * as Analytics from 'expo-firebase-analytics';  // Privacy-first analytics

initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export default function App() {
  const colorScheme = useColorScheme();  // Dark/light theme
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    enableOfflineSupport();  // Set up local storage sync
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Analytics.logEvent('user_login', { userId: user.uid });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <AppNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  // Tailwind via twin.macro would go here, but for simplicity, use StyleSheet
});
