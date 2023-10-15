import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackContainer from './navigation/StackContainer';

export default function App() {
  return (
    <NavigationContainer>
      <StackContainer />
    </NavigationContainer>
  );
}
