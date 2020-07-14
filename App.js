import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen
            name="AllProducts"
            component={AllProductsScreen}
            options={({route}) => ({
              title: route.params.isLogged
                ? 'AllProducts Screen'
                : 'Let login before!',
            })}
          />
          <RootStack.Screen
            name="DetailProduct"
            component={DetailProductScreen}
          />
          <RootStack.Screen
            name="Cart"
            component={CartScreen}
            options={() => ({title: 'Cart Screen'})}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// then run the saga
sagaMiddleware.run(rootSaga);
