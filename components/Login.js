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
    padding: 20,
    backgroundColor: '#ffe4e1',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f39c12',
    marginBottom: 25,
    textAlign: 'center',
  },
  profilePicture: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#4caf50',
  },
  input: {
    backgroundColor: 'white',
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#555',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  Inbtn: {
    backgroundColor: '#007bff',
    borderRadius: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  forgotPassword: {
    color: '#f39c12',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  accountText: {
    marginTop: 15,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  signuptext: {
    color: '#4caf50',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});