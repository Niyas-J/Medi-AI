import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WoundDetectionScreen from '../screens/WoundDetectionScreen';
import MedicineScannerScreen from '../screens/MedicineScannerScreen';
import AIChatScreen from '../screens/AIChatScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import AuthScreen from '../screens/AuthScreen';
import { useAuthState } from 'react-firebase-hooks/auth';  // Or custom hook
import { getAuth } from 'firebase/auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const auth = getAuth();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wound" component={WoundDetectionScreen} />
      <Tab.Screen name="Scanner" component={MedicineScannerScreen} />
      <Tab.Screen name="Chat" component={AIChatScreen} />
      <Tab.Screen name="Emergency" component={EmergencyScreen} />
      <Tab.Screen name="Appointments" component={AppointmentsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
