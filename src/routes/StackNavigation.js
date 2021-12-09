import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  IdeaScreen,
  ListScreen,
  PersonalScreen,
  WorkScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

export default class StackNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Idea" component={IdeaScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Personal" component={PersonalScreen} />
          <Stack.Screen name="Work" component={WorkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
