import { StyleSheet, Text,ImageBackground, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import TrendingRecipes from './TrendingRecipes';
import Veg from './Veg';
import { ScrollView } from 'react-native-gesture-handler';
import { useVoiceSearch } from './useVoiceSearch';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Correct icon import
import NonVeg from './NonVeg';

export default function Home({ navigation }) {
  const [query, setQuery] = useState('');

  // Use the custom voice search hook
  const { isListening, startListening } = useVoiceSearch(setQuery);

  const send = () => {
    navigation.navigate('Recipe', { query });
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground  source={require('./images/back.jpg')}><View style={styles.header}>
        <Text style={styles.title}>What would you like to cook?</Text>
        <Text style={styles.subtitle}>Find recipes for your favorite dishes</Text>
      </View></ImageBackground>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={20} color="#718096" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search recipes..."
            placeholderTextColor="#718096"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.voiceButton} onPress={startListening}>
            <Ionicons name="mic" size={24} color={isListening ? '#FF4141' : '#718096'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.send} onPress={send}>
          <Text style={styles.getrecipe}>Find Recipes</Text>
        </TouchableOpacity>
        
        <TrendingRecipes />
        <Veg />
        <NonVeg />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    padding: 28,
    paddingTop: 60,
    height: 280,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 17,
    color: '#F0F4FF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    opacity: 0.9,
  },
  searchContainer: {
    margin: 20,
    marginTop: -30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    color: '#1A2138',
    fontSize: 16,
    fontWeight: '500',
  },
  voiceButton: {
    padding: 10,
  },
  send: {
    backgroundColor: '#2563EB',
    padding: 18,
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  getrecipe: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
});
 