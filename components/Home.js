import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React ,{useState} from 'react'



export default function Home ({navigation}) {
    const [query,setQuery]=useState('');
 
   
    const send=()=>{
      navigation.navigate('Recipe',{query})
    }
  return (
    <View>
      <TextInput
       style={styles.input}
       placeholder="food-name"
       value={query}
       onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.send} onPress={send}><Text style={styles.getrecipe}>Get Recipe</Text></TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'purple',
    borderColor: 'black',
    borderRadius:5,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  send: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius:20,
    width:300,
    marginLeft: 25,
   
  },
  getrecipe:{
    
    textAlign: 'center',
   
  },
});