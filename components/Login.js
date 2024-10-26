import { StyleSheet, Text,Alert, View, Image,TextInput, TouchableOpacity } from 'react-native';
import React ,{useState}from 'react';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const[password,setPassword]=useState('');

  const signIn = () => { 
    auth()
      .signInWithEmailAndPassword(email, password)  // Correct method name
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
      <Image source={require('./images/profileLogo.png')} style={styles.profilePicture} />

      <TextInput 
        style={styles.input}
        placeholder="email Id"
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
    //marginTop: 20,
    backgroundColor:'black',
    width:'100%',
    height:'100%',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'grey',
    color: 'black',
    fontSize: 18,
    paddingHorizontal: 8,
    width: '100%',
    height: 50,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15, 
    marginVertical: 10,
  },
  Inbtn: {
    backgroundColor: 'blue', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  forgotPassword: {
    marginBottom: 10, 
  },     
  accountText: {
    marginTop: 20,
    color: 'white',
    fontSize: 16,
  },
  signuptext: {
    color: 'blue', 
    fontWeight: 'bold',
    marginTop:20,
  },
});
