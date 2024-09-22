import { StyleSheet, Text, View,ActivityIndicator,FlatList} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function Recipe() {
    const route= useRoute();
    const { query } = route.params;
    const { food,isLoading}=useFetch('');

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }
    
  return (
    <View>
      <Text>Recipes for: {query}</Text>
      <FlatList
        data={food}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({})