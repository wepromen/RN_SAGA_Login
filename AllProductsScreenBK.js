/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DataFile from './DataFile';
import Products from './Products';
import {connect} from 'react-redux';

class AllProductsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Products
          products={DataFile}
          onPress={(item) => {
            this.props.navigation.navigate('DetailProduct', {item});
          }}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(AllProductsScreen);
