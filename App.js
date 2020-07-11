import * as React from 'react';
// import {View, Text, Button, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';
import CartScreen from './CartScreen';

import rootSaga from './apiSaga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// A very simple store (***authReducer will handle to isLogged State)
let store = createStore(
  combineReducers({
    isLogged: AuthReducer,
    cartItems: CartReducer,
  }),
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
              title: route.params.isLogged
                ? 'Welcome to Dashboard!!!!'
                : 'Let login before!',
            })}
          />
          <RootStack.Screen name="Cart" component={CartScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// then run the saga
sagaMiddleware.run(rootSaga);
