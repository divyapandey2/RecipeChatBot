import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import TrendingRecipes from './TrendingRecipes';
import { ScrollView } from 'react-native-gesture-handler';
import { useVoiceSearch } from './useVoiceSearch';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Correct icon import

export default function Home({ navigation }) {
  const [query, setQuery] = useState('');

  // Use the custom voice search hook
  const { isListening, startListening } = useVoiceSearch(setQuery);

  const send = () => {
    navigation.navigate('Recipe', { query });
  };

  return (
    <ScrollView>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="food-name"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.voiceButton} onPress={startListening}>
            <Ionicons name="mic" size={24} color={isListening ? 'red' : 'black'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.send} onPress={send}>
          <Text style={styles.getrecipe}>Get Recipe</Text>
        </TouchableOpacity>
        
        <TrendingRecipes />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderColor: 'lightblue',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',  // To ensure the text is visible on a purple background
  },
  voiceButton: {
    paddingLeft: 10,
  },
  send: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
  },
  getrecipe: {
    textAlign: 'center',
    color: 'white',
  },
});
 