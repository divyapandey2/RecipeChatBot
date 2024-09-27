import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import History from './components/History';
import Cart from './components/Cart';
import Recipe from './components/Recipe';
import appStore from './components/appstore';
import { Provider } from 'react-redux';

const Stack= createStackNavigator();

export default function App() {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen name="Recipe" component={Recipe}/>
        <Stack.Screen name="Cart" component={Cart}/>
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  )
}

const styles = StyleSheet.create({})