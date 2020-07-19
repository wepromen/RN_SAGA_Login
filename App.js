import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import DetailProductScreen from './DetailProductScreen';
import rootSaga from './apiSaga';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// A very simple store
let store = createStore(
  combineReducers({
    isLogged: AuthReducer,
    cartItems: CartReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

// Create our stack navigator
let RootStack = createStackNavigator();
let TabStack = createBottomTabNavigator();

function ProfileStack() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: true}}>
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({title: 'Login', headerShown: false})}
      />
      {/* <RootStack.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        options={() => ({title: 'Detail Product Screen', headerShown: false})}
      />
      <RootStack.Screen
        name="Cart"
        component={CartScreen}
        options={() => ({title: 'Your Cart', headerShown: true})}
      /> */}
    </RootStack.Navigator>
  );
}
function HomeStack() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: true}}>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({headerShown: false})}
      />

      <RootStack.Screen
        name="Cart"
        component={CartScreen}
        options={() => ({title: 'Your Cart', headerShown: true})}
      />

      <RootStack.Screen
        name="DetailProduct"
        component={DetailProductScreen}
        options={() => ({title: 'Detail Product Screen', headerShown: false})}
      />
    </RootStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <TabStack.Navigator
      initialRouteName="Setting"
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        activeTintColor: '#00b14f',
        inactiveTintColor: 'gray',
      }}>
      <TabStack.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <FontAwesome name="compass" size={30} color="#00b14f" />
          ),
        }}
      />
      <TabStack.Screen
        name="Setting"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <FontAwesome name="user" size={30} color="#00b14f" />
          ),
        }}
      />
    </TabStack.Navigator>
  );
}

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// then run the saga
sagaMiddleware.run(rootSaga);
