import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

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
          console.log('===LoginScreen move to TabNav ');
          this.props.navigation.navigate('TabNav', {
            isLogged: this.props.isLogged,
          });
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
      this.componentDidMount();
      // console.log('==== Move to TabNav');
      // this.props.navigation.navigate('TabNav', {
      //   isLogged: this.props.isLogged,
      // });
    }
  }

  // isLogged before is app state
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.isLogged
            ? 'Welcome to AllProducts!!!!'
            : 'Let`s to login before!'}
        </Text>
        <Button
          title="LOGIN"
          onPress={() => {
            this.props.dispatch({type: 'PRESSBTNLOGIN'});
          }}
        />
        <Button
          title="LOGOUT"
          onPress={() => {
            console.log('press logout');
            this.props.dispatch({type: 'PRESSBTNLOGOUT'});
          }}
        />

        {/* <Button
          title="Go to TabNav screen"
          onPress={() => {
            if (this.props.isLogged) {
              this.props.navigation.navigate('TabNav', {
                isLogged: this.props.isLogged,
              });
            } else {
              Alert.alert('Let`s to login before!');
            }
          }}
        /> */}
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
  btn: {
    color: '#00b14f',
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 50,
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
