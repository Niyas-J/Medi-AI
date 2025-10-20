import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export default function HomeScreen() {
  const user = auth.currentUser;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Medi-AI Suite</Text>
        <Text style={styles.subtitle}>Welcome, {user?.email || 'User'}</Text>
      </View>
      
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Wound Detection</Text>
          <Text style={styles.cardDescription}>AI-powered wound analysis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Medicine Scanner</Text>
          <Text style={styles.cardDescription}>Scan and identify medications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>AI Chat</Text>
          <Text style={styles.cardDescription}>Get health advice from AI</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Emergency</Text>
          <Text style={styles.cardDescription}>Quick emergency response</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Appointments</Text>
          <Text style={styles.cardDescription}>Schedule and manage visits</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  card: {
    width: '45%',
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
