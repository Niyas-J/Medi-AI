import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as Location from 'expo-location';

const db = getFirestore();
const auth = getAuth();

export default function EmergencyScreen() {
  const [isEmergency, setIsEmergency] = useState(false);

  const handleEmergency = async () => {
    Alert.alert(
      'Emergency Alert',
      'Are you sure you want to send an emergency alert?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Alert', style: 'destructive', onPress: sendEmergencyAlert }
      ]
    );
  };

  const sendEmergencyAlert = async () => {
    try {
      // Get current location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required for emergency alerts');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      
      // Create emergency record
      const emergencyData = {
        userId: auth.currentUser.uid,
        timestamp: new Date(),
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        status: 'active',
        type: 'medical_emergency'
      };

      await addDoc(collection(db, 'emergencies'), emergencyData);
      
      // Send push notification to nearby clinicians
      // This would be handled by Cloud Functions
      
      setIsEmergency(true);
      Alert.alert('Alert Sent', 'Emergency alert has been sent to nearby medical professionals');
      
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      Alert.alert('Error', 'Failed to send emergency alert. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Response</Text>
      <Text style={styles.description}>
        In case of a medical emergency, tap the button below to alert nearby medical professionals.
      </Text>
      
      <TouchableOpacity 
        style={[styles.emergencyButton, isEmergency && styles.emergencyButtonActive]}
        onPress={handleEmergency}
        disabled={isEmergency}
      >
        <Text style={styles.emergencyButtonText}>
          {isEmergency ? 'Alert Sent' : 'SEND EMERGENCY ALERT'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Emergency Information:</Text>
        <Text style={styles.infoText}>• Your location will be shared with medical professionals</Text>
        <Text style={styles.infoText}>• Emergency services will be contacted</Text>
        <Text style={styles.infoText}>• Stay calm and follow instructions</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
    lineHeight: 24,
  },
  emergencyButton: {
    backgroundColor: '#f44336',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyButtonActive: {
    backgroundColor: '#4caf50',
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
});
