import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './menu/Home';
import Login from './menu/Login';
import Vote from './menu/Vote';

const home="home";
const login="로그인";
const vote="투표";

const Tab=createBottomTabNavigator();

export default function TabContainer(){
    return (
        <Tab.Navigator
            initialRouteName={login}>
            <Tab.Screen name={home} component={Home} options={{}}/>
            <Tab.Screen name={vote} component={Vote} options={{}} />
            <Tab.Screen name={login} component={Login} options={{}}/>
        </Tab.Navigator>
    );
}

const styles=StyleSheet.create({

})
