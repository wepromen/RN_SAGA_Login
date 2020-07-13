import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DataFile from './DataFile';
import Products from './Products';
import {connect} from 'react-redux';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
  }

  onClickAddCart(data) {
    const itemcart = {
      food: data,
      quantity: 1,
      price: data.price,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Products products={DataFile} onPress={this.onClickAddCart} />
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
