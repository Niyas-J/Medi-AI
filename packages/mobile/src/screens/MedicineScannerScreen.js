import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';  // For offline
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export default function MedicineScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setData(data);
    // Fetch metadata (e.g., from public API or dummy)
    const metadata = { name: 'Aspirin', dosage: '500mg' };  // Replace with real query
    // Save offline if no network
    if (!navigator.onLine) {
      await AsyncStorage.setItem('pendingScans', JSON.stringify([...(JSON.parse(await AsyncStorage.getItem('pendingScans')) || []), { data, metadata }]));
    } else {
      // Sync to Firestore
      await addDoc(collection(db, 'scans'), { code: data, metadata, userId: auth.currentUser.uid });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      {data && <Text>Scanned: {data}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
});
