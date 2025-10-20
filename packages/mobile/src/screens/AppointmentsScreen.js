import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, getFirestore, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export default function AppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Listen to user's appointments
    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', auth.currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(apps);
    });
    
    return unsubscribe;
  }, []);

  const scheduleAppointment = () => {
    Alert.alert(
      'Schedule Appointment',
      'Choose appointment type:',
      [
        { text: 'General Checkup', onPress: () => createAppointment('General Checkup') },
        { text: 'Follow-up', onPress: () => createAppointment('Follow-up') },
        { text: 'Emergency', onPress: () => createAppointment('Emergency') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const createAppointment = async (type) => {
    try {
      const appointmentData = {
        userId: auth.currentUser.uid,
        type: type,
        date: selectedDate,
        status: 'scheduled',
        createdAt: new Date()
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      Alert.alert('Success', 'Appointment scheduled successfully');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      Alert.alert('Error', 'Failed to schedule appointment');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      
      <TouchableOpacity style={styles.scheduleButton} onPress={scheduleAppointment}>
        <Text style={styles.scheduleButtonText}>Schedule New Appointment</Text>
      </TouchableOpacity>

      <ScrollView style={styles.appointmentsList}>
        {appointments.length === 0 ? (
          <Text style={styles.noAppointments}>No appointments scheduled</Text>
        ) : (
          appointments.map((appointment) => (
            <View key={appointment.id} style={styles.appointmentCard}>
              <Text style={styles.appointmentType}>{appointment.type}</Text>
              <Text style={styles.appointmentDate}>
                {formatDate(appointment.date.toDate())}
              </Text>
              <Text style={styles.appointmentStatus}>
                Status: {appointment.status}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
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
    marginBottom: 20,
    color: '#333',
  },
  scheduleButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  scheduleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentsList: {
    flex: 1,
  },
  noAppointments: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appointmentDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  appointmentStatus: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
});
