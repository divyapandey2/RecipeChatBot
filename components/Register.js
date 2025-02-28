import { StyleSheet, Text, TextInput,View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import auth from '@react-native-firebase/auth';

export default function Register({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = () => { // Correct the typo here
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('Login'); 
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
      
      <TextInput 
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput 
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      
      <TextInput 
        style={styles.input}
        placeholder="Email Id"
        value={email}
        onChangeText={setEmail}
        
      />
       <TextInput 
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true} 
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.Inbtn} onPress={createAccount}>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>

      <Text style={styles.accountText}>
        Already have an account?
     
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logintext}> Log In</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  input: {
    backgroundColor: '#EDF2F7',  // Light cool grey background
    color: '#2D3748',  // Dark grey text
    fontSize: 16,
    paddingHorizontal: 16,
    width: '100%',
    height: 48,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  Inbtn: {
    backgroundColor: '#4361EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
    shadowColor: '#4361EE',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  accountText: {
    marginTop: 24,
    color: '#666666',
    fontSize: 15,
  },
  logintext: {
    color: '#4361EE',
    fontWeight: '600',
    marginLeft: 4,
  },
})
