import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React ,{useState,useEffect} from 'react'




const apiKey = '72aa38298bd743debc60064344b3045a';

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
    borderColor: 'light-grey',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    color: 'grey',
  },
  send: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 10,
  },
});