import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function DashboardScreen({route, dispatch, navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {route.params.authState
          ? 'Welcome to Dashboard!!!!'
          : 'Let login before!'}
      </Text>
      <Button
        title="Go to Login screen"
        onPress={() => navigation.navigate('Login')}
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

// // Connect the screens to Redux
// let DashboardContainer = connect((state) => ({authState: state.authState}))(
//   DashboardScreen,
// );

// export default DashboardContainer;
const mapStateToProps = (state) => {
  return {
    authState: state.authState,
  };
};

export default connect(mapStateToProps)(DashboardScreen);
