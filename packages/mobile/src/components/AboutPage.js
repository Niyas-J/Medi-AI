import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';

export default function AboutPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medi-AI Suite - HealthTech SuperApp</Text>
      <Text style={styles.description}>
        A comprehensive healthtech application that combines AI-powered wound detection, 
        medicine scanning, intelligent chat assistance, emergency response, and appointment management.
      </Text>
      
      <View style={styles.linksContainer}>
        <Text style={styles.sectionTitle}>Related Projects:</Text>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://niyas-j.github.io/WoundScan/')}
        >
          <Text style={styles.linkText}>Wound Scan Demo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://niyas-j.github.io/MedicineScan/')}
        >
          <Text style={styles.linkText}>Medicine Scan Demo</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Features:</Text>
        <Text style={styles.featureText}>• AI-powered wound detection and analysis</Text>
        <Text style={styles.featureText}>• Barcode scanning for medication identification</Text>
        <Text style={styles.featureText}>• Intelligent health chat assistant</Text>
        <Text style={styles.featureText}>• Emergency response system</Text>
        <Text style={styles.featureText}>• Appointment scheduling and management</Text>
        <Text style={styles.featureText}>• Offline-first architecture</Text>
        <Text style={styles.featureText}>• HIPAA/GDPR compliant</Text>
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
    marginBottom: 30,
    color: '#666',
    lineHeight: 24,
  },
  linksContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  linkButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  featuresContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
});
