import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function LoginScreen({isLogged, dispatch, navigation}) {
  console.log('0. Start LoginScreen');

  AsyncStorage.getItem('token')
    .then((token) => {
      console.log('===LoginScreen  Init screen - Get token in Async: ' + token);
      if (typeof token !== 'undefined' && token != null) {
        dispatch({type: 'PRESSBTNLOGIN'});
      } else {
        dispatch({type: 'PRESSBTNLOGOUT'});
      }
    })
    .catch((err) => {
      dispatch({type: 'PRESSBTNLOGOUT'});
      console.log(err);
    });

  // isLogged before is app state
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {isLogged ? 'Welcome to Dashboard!!!!' : 'Let login before!'}
      </Text>
      <Button
        title="LOGIN"
        onPress={() => {
          //*** */
          dispatch({type: 'PRESSBTNLOGIN'});
        }}
      />
      <Button
        title="LOGOUT"
        onPress={() => {
          console.log('press logout');
          dispatch({type: 'PRESSBTNLOGOUT'});
          //   AsyncStorage.multiRemove(['token', 'isLoggined'])
          //     .then((rs) => dispatch({type: 'LOGOUT'}))
          //     .catch((err) => console.log(err));
        }}
      />

      <Button
        title="Go to Dashboard screen"
        onPress={() =>
          navigation.navigate('Dashboard', {
            isLogged,
          })
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

/* Connect the LoginScreen to Redux| It's will store isLogged of Redux Store to isLogged
  and then its can use this where is LoginScreen
*/
// let LoginContainer = connect((state) => ({isLogged: state.isLogged}))(
//   LoginScreen,
// );

// export default LoginContainer;

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

export default connect(mapStateToProps)(LoginScreen);
