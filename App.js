import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { data } from './src/data/peapool'
import { Svg, Path } from 'react-native-svg';
import { LoginScreen, HomeScreen, WidjetScreen, ProfilScreen, ProfilScreenSecond, ProfilScreenThird } from './src/Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="Login" component={ LoginScreen } />
      <Stack.Screen name="Home" component={ HomeScreen } />
      <Stack.Screen name="Widjet" component={ WidjetScreen } />
      <Stack.Screen name="Profil" component={ ProfilScreen } />
      <Stack.Screen name="Profilsecond" component={ ProfilScreenSecond } />
      <Stack.Screen name="ProfilThird" component={ ProfilScreenThird } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
