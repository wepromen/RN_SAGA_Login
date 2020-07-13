import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Products from './Products';
import {connect} from 'react-redux';

class CartScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.cartItems.length > 0 ? (
          <Products
            onPress={this.props.removeItem}
            products={this.props.cartItems}
            propsAction="Remove"
          />
        ) : (
          <Text>No items in your cart</Text>
        )}
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
    removeItem: (product) =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
