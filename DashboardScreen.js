import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import DataFile from './DataFile';
import Products from './Products';
import {connect} from 'react-redux';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Products products={DataFile} onPress={this.props.addItemToCart} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: true,
    cartItems: state.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch({type: 'ADD_TO_CART', payload: product}),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
