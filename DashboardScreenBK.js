import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {this.props.route.params.isLogged
            ? 'Welcome to Dashboard!!!!'
            : 'Let login before!'}
        </Text>
        <Button
          title="Go to Login screen"
          onPress={() => this.props.navigation.navigate('Login')}
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

// // Connect the screens to Redux
// let DashboardContainer = connect((state) => ({isLogged: state.isLogged}))(
//   DashboardScreen,
// );

// export default DashboardContainer;
const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

export default connect(mapStateToProps)(DashboardScreen);
