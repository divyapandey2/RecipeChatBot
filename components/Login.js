import { StyleSheet, Text,Alert, View, Image,TextInput, TouchableOpacity } from 'react-native';
import React ,{useState}from 'react';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const[password,setPassword]=useState('');

  const signIn = () => { 
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('MainTabs'); 
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
  
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
  
        console.error(error);
      });
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image source={require('./images/food.jpeg')} style={styles.profilePicture} />

      <TextInput 
        style={styles.input}
        placeholder="Email Id"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true} 
        value={password}
        onChangeText={setPassword}
        
      />
      <Text style={styles.forgotPassword}>Forgot Your Password?</Text>
      <TouchableOpacity style={styles.Inbtn} onPress={signIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.accountText}>Don't Have an Account?<TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signuptext}>Register</Text>
        </TouchableOpacity></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 36,
    borderWidth: 3,
    borderColor: '#4a90e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  input: {
    backgroundColor: '#EDF2F7',
    color: '#2D3748',
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    height: 56,
    borderRadius: 16,
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: '#CBD5E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  Inbtn: {
    backgroundColor: '#4a90e2',
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginVertical: 24,
    elevation: 4,
    shadowColor: '#4a90e2',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  forgotPassword: {
    color: '#4a90e2',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 20,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  accountText: {
    marginTop: 24,
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  signuptext: {
    color: '#4a90e2',
    fontWeight: '700',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});