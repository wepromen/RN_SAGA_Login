import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import authReducer from './Reducers';
import LoginScreen from './LoginScreen';
import DashboardScreen from './Dashboard';
import rootSaga from './apiSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// mount it on the Store
// const store = createStore(
//   reducer,
//   applyMiddleware(sagaMiddleware)
// )

// A very simple store (***authReducer will handle to authState State)
let store = createStore(
  combineReducers({authState: authReducer}),
  applyMiddleware(sagaMiddleware),
);

// Create our stack navigator
let RootStack = createStackNavigator();

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={({route}) => ({
              title: route.params.authState
                ? 'Welcome to Dashboard!!!!'
                : 'Let login before!',
            })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// then run the saga
sagaMiddleware.run(rootSaga);
