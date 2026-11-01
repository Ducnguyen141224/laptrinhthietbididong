import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { useAppPersistence } from './hooks/usePersistSlice';

function Root() {
  const ready = useAppPersistence();
  if (!ready) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  return <NavigationContainer><AppNavigator /></NavigationContainer>;
}

export default function App() {
  return <SafeAreaProvider><Provider store={store}><Root /></Provider></SafeAreaProvider>;
}
