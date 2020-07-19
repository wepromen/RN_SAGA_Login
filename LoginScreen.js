import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('===isPressLogin ' + this.props.isLogged.isPressLogin);
    AsyncStorage.getItem('token')
      .then((token) => {
        console.log(
          '===LoginScreen  Mount screen check token in Async: ' + token,
        );
        if (typeof token !== 'undefined' && token != null) {
          this.props.dispatch({type: 'LOGIN'});
          console.log('===LoginScreen success move to screen');
          this.props.navigation.jumpTo('Home');
        }
      })
      .catch((err) => {
        this.dispatch({type: 'PRESSBTNLOGOUT'});
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.isLogged);
    console.log(' Vs ');
    console.log(this.props.isLogged);
    if (
      prevProps.isLogged !== this.props.isLogged &&
      this.props.isLogged === true
    ) {
      console.log('==== Move to Home');
      this.props.navigation.navigate('Home', {
        isLogged: this.props.isLogged,
      });
    }
  }

  // isLogged before is app state
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.isLogged
            ? 'Welcome to Home!!!!'
            : 'Let`s to login before!'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.dispatch({type: 'PRESSBTNLOGIN'});
          }}>
          <Text style={styles.btn}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.dispatch({type: 'PRESSBTNLOGOUT'});
          }}>
          <Text style={styles.btn}>LOGOUT</Text>
        </TouchableOpacity>
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
    padding: 15,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    borderRadius: 5,
    margin: 3,
    backgroundColor: '#00b14f',
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

export default connect(mapStateToProps)(LoginScreen);
