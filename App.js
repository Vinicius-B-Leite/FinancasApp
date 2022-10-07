import 'react-native-gesture-handler';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from './src/service/firebaseConnection'
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar translucent={true} backgroundColor='transparent'/>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
