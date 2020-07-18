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
import AllProductsScreen from './AllProductsScreen';
import CartScreen from './CartScreen';
import DetailProductScreen from './DetailProductScreen';
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
let TabStack = createBottomTabNavigator();

function AllScreenStack() {
  return (
    <RootStack.Navigator screenOptions={{headerShown: true}}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen
        name="TabNav"
        component={TabNavigator}
        options={() => ({title: '', headerShown: false})}
      />
      <RootStack.Screen
        name="AllProducts"
        component={AllProductsScreen}
        options={() => ({headerShown: true})}
      />
      <RootStack.Screen name="DetailProduct" component={DetailProductScreen} />
      <RootStack.Screen
        name="Cart"
        component={CartScreen}
        options={() => ({title: 'Cart Screen'})}
      />
    </RootStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <TabStack.Navigator
      initialRouteName="AllProducts"
      tabBarOptions={{
        activeTintColor: 'blue',
      }}>
      <TabStack.Screen
        name="AllProducts"
        component={AllProductsScreen}
        // options={{
        //   headerTitle: 'All Products',
        //   tabBarLabel: 'All Products',
        // }}
      />
      <TabStack.Screen name="Cart" component={CartScreen} />
      <TabStack.Screen name="Setting" component={LoginScreen} />
    </TabStack.Navigator>
  );
}

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AllScreenStack />
        {/* navigation={this.navigation} route={this.route} */}
      </NavigationContainer>
    </Provider>
  );
}

// then run the saga
sagaMiddleware.run(rootSaga);
