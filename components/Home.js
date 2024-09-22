import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React ,{useState,useEffect} from 'react'
import useFetch from './hooks/useFetch';



const apiKey = '88fee88334634a4b4e1340580d3c6b15';

export default function Home ({navigation}) {
    const [query,setQuery]=useState('');
   // const { food,isLoading,fetchRecipe}=useFetch('');
   
    const send=()=>{
      navigation.navigate('Recipe',{query})
    }
  return (
    <View>
      <TextInput
       style={styles.input}
       placeholder="ask"
       value={query}
       onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.send} onPress={send}><Text>Get Recipe</Text></TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  send: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
  },
});