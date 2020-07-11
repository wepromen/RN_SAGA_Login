import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import * as React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((token) => {
        console.log(
          '===LoginScreen  Mount screen check token in Async: ' + token,
        );
        if (typeof token !== 'undefined' && token != null) {
          this.props.dispatch({type: 'LOGIN'});
        }
      })
      .catch((err) => {
        this.dispatch({type: 'PRESSBTNLOGOUT'});
        console.log(err);
      });
  }

  // isLogged before is app state
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.isLogged
            ? 'Welcome to Dashboard!!!!'
            : 'Let`s to login before!'}
        </Text>
        <Button
          title="LOGIN"
          onPress={() => {
            //*** */
            this.props.dispatch({type: 'PRESSBTNLOGIN'});
          }}
        />
        <Button
          title="LOGOUT"
          onPress={() => {
            console.log('press logout');
            this.props.dispatch({type: 'PRESSBTNLOGOUT'});
            //   AsyncStorage.multiRemove(['token', 'isLoggined'])
            //     .then((rs) => dispatch({type: 'LOGOUT'}))
            //     .catch((err) => console.log(err));
          }}
        />

        <Button
          title="Go to All Produces screen"
          onPress={() => {
            if (this.props.isLogged) {
              this.props.navigation.navigate('Dashboard', {
                isLogged: this.props.isLogged,
              });
            } else {
              Alert.alert('Let`s to login before!');
            }
          }}
        />
        <Button
          title="Go to Cart"
          onPress={() =>
            // this.props.navigation.navigate('Cart', {
            //   isLogged: this.props.isLogged,
            // })
            {
              if (this.props.isLogged) {
                this.props.navigation.navigate('Cart', {
                  isLogged: this.props.isLogged,
                });
              } else {
                Alert.alert('Let`s to login before!');
              }
            }
          }
        />
      </View>
    );
  }
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
