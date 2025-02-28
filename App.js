import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Home from './components/Home';
import History from './components/History';
import Cart from './components/Cart';
import Recipe from './components/Recipe';
import appStore from './components/appstore';
import Register from './components/Register';
import Login from './components/Login';
import Splash from './components/Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
                 iconName = 'home';
                }
            else if (route.name === 'Recipe') {
                 iconName = 'fast-food';
                }
            else if (route.name === 'Cart') {
                iconName = 'cart';
                } 
            else if (route.name === 'History') {
                iconName = 'time';
                }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

// Stack Navigator wrapping Tab Navigator
export default function App() {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
      <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200EE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
