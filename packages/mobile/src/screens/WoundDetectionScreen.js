import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import axios from 'axios';  // For Flask API call

const FLASK_API_URL = "http://localhost:5000/api";  // Or production URL
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export default function WoundDetectionScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const takePhoto = async (cameraRef) => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync({ quality: 0.5 });
      setPhoto(photoData.uri);
      // Upload to Storage
      const storageRef = ref(storage, `wounds/${Date.now()}.jpg`);
      const response = await fetch(photoData.uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      // Call Flask ML
      const mlResponse = await axios.post(`${FLASK_API_URL}/ml/wound`, { imageUrl: storageRef.fullPath });
      // Store results in Firestore
      await addDoc(collection(db, 'mlResults'), { result: mlResponse.data, userId: auth.currentUser.uid, timestamp: new Date() });
    }
  };

  if (hasPermission === null) {
    return <Button title="Grant Camera Permission" onPress={requestPermission} />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={{ flex: 1 }} type={type} ref={(ref) => (this.camera = ref)}>
        <View style={styles.cameraOverlay}>
          <Button title="Capture" onPress={() => takePhoto(this.camera)} />
        </View>
      </Camera>
      <Text style={styles.tips}>Tips: Good lighting, steady hand.</Text>  {/* Guided UX */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  tips: {
    padding: 16,
    backgroundColor: 'white',
  },
});
