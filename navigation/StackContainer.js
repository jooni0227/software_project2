import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './menu/Login';
import SignUp from './menu/SignUp';
import Home from './menu/Home';
import Vote from './menu/Vote';
import TabContainer from './TabContainer';

const login = "Login";
const signUp = "SignUp"; // 이 부분을 수정하세요
const home = "Home";
const vote = "Vote";
const tabmenu = "TabContainer";

const Stack = createNativeStackNavigator();

export default function StackContainer() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={tabmenu} component={TabContainer} options={{}} />
      <Stack.Screen name={login} component={Login} options={{}} />
      <Stack.Screen name={signUp} component={SignUp} options={{}} />
      <Stack.Screen name={home} component={Home} options={{}} />
      <Stack.Screen name={vote} component={Vote} options={{}} />
    </Stack.Navigator>
  );
}
