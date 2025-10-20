import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

const db = getFirestore();

export const enableOfflineSupport = () => {
  // Set up offline persistence
  NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncPendingData();
    }
  });
};

export const saveOfflineData = async (collectionName, data) => {
  try {
    const key = `offline_${collectionName}_${Date.now()}`;
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving offline data:', error);
  }
};

export const syncPendingData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const offlineKeys = keys.filter(key => key.startsWith('offline_'));
    
    for (const key of offlineKeys) {
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const parsedData = JSON.parse(data);
        const collectionName = key.split('_')[1];
        
        // Sync to Firestore
        await addDoc(collection(db, collectionName), parsedData);
        
        // Remove from offline storage
        await AsyncStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error('Error syncing offline data:', error);
  }
};

export const getOfflineData = async (collectionName) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const collectionKeys = keys.filter(key => key.startsWith(`offline_${collectionName}_`));
    
    const data = [];
    for (const key of collectionKeys) {
      const item = await AsyncStorage.getItem(key);
      if (item) {
        data.push(JSON.parse(item));
      }
    }
    
    return data;
  } catch (error) {
    console.error('Error getting offline data:', error);
    return [];
  }
};
