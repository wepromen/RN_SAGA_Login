/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

var {width} = Dimensions.get('window');

class DetailProductScreen extends Component {
  constructor(props) {
    super(props);
  }

  onClickAddCart(data) {
    const itemcart = {
      girl: data,
      quantity: 1,
      price: data.price,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!!
          let cart = JSON.parse(datacart);
          let isExist = false;
          cart.map((item, i, cartOld) => {
            console.log(item.girl.name + ' vs ' + data.name);
            if (item.girl.name === data.name) {
              item.quantity++;
              isExist = true;
            }
          });
          if (!isExist) {
            console.log('   Push New Item into Cart: ' + itemcart.girl.name);
            cart.push(itemcart);
          }
          // AsyncStorage.removeItem('cart');
          return cart;
        } else {
          let cart = [];
          cart.push(itemcart);
          cart.map((item, i) => {
            console.log('Detail - create cart[] item: ' + item.girl.name);
          });
          // AsyncStorage.removeItem('cart');
          return cart;
        }
      })
      .then((rs) => {
        // *** set into Async
        AsyncStorage.setItem('cart', JSON.stringify(rs));
        return rs;
      })
      .then((rs) => {
        console.log('Detail items: ' + rs);
        // *** Set into props !!!!
        this.props.addItemsToCart(rs);
        this.props.navigation.navigate('TabNav');
      })
      .catch((err) => {
        console.log('DetailS ClickAdd err: ' + err);
      });
  }
  render() {
    const item = this.props.route.params.item;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'trangraysparent',
          paddingBottom: 8,
        }}>
        <Image
          resizeMode={'contain'}
          style={{width: width, height: width / 1.7}}
          source={{uri: item.image}}
        />
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          <View
            style={{
              width: width,
              // height: width / 4,
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, width: width / 3}}>
              {item.name}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#33c37d',
                fontSize: 20,
                // alignItems: 'center',
              }}>
              $ {item.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              paddingTop: 7,
              paddingLeft: 20,
              paddingRight: 20,
              width: width,
              height: width / 2.2,
            }}>
            <Text>This is content of product aaaaa aaaaaa aaaaaaa aaaa</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.onClickAddCart(item);
            }}
            style={{
              backgroundColor: '#33c37d',
              width: width - 30,
              alignItems: 'center',
              padding: 15,
              borderRadius: 5,
              margin: 15,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemsToCart: (items) => dispatch({type: 'ADD_TO_CART', payload: items}),
  };
};
export default connect(null, mapDispatchToProps)(DetailProductScreen);
