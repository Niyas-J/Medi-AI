import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 justify-center p-4">  {/* Tailwind example */}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} className="mb-4 border p-2" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry className="mb-4 border p-2" />
      <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} />
      <Button title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} onPress={() => setIsSignUp(!isSignUp)} />
    </View>
  );
}
