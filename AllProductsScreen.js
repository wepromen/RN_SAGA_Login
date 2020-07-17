/* eslint-disable react-native/no-inline-styles */
console.disableYellowBox = true;

import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DataFile from './DataFile';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

var {width} = Dimensions.get('window');

class AllProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: null,
      totalQuantity: 0,
      totalPrice: 0,
    };
  }
  componentDidMount() {
    // let arrQt = [];
    AsyncStorage.getItem('cart')
      .then((cart) => {
        let rs;
        if (cart !== null) {
          rs = JSON.parse(cart);
        }
        return rs;
      })
      .then((rs) => {
        this.setState({dataCart: rs});
        this.updateCartInfo(rs);
      })
      .catch((err) => {
        this.setState({
          totalQuantity: 0,
          totalPrice: 0,
        });
        console.log(' ' + err);
      });

    console.log(
      'AllProductS - id: ' +
        this.props.cartItems.id +
        ' Qt: ' +
        this.props.cartItems.quantity,
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cartItems !== this.props.cartItems) {
      this.componentDidMount();
    }
    if (prevState.dataCart !== this.state.dataCart) {
      this.setState({
        totalQuantity: 0,
        totalPrice: 0,
      });
    }
  }

  updateCartInfo(dataCart) {
    let totalQuantity = 0;
    let itemPrice = 0;
    let totalPrice = 0;
    console.log(' AllPro - dataCart: ' + this.state.dataCart);

    if (dataCart !== null) {
      dataCart.map((item, i) => {
        totalQuantity += item.quantity;
        itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
        this.setState({
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
        });
        console.log(
          ' state totalQuantity: ' +
            this.state.totalQuantity +
            ' totalPrice: ' +
            this.state.totalPrice,
        );
      });
    } else {
      console.log(' else AllPro - dataCart: ' + this.state.dataCart);

      this.setState({
        totalQuantity: 0,
        totalPrice: 0,
      });
      console.log(this.state.totalQuantity);
    }
  }

  updateQuantity(byId) {
    let qt = 0;
    if (this.state.dataCart !== null) {
      this.state.dataCart.forEach((el) => {
        if (el.id === byId.toString()) {
          qt = el.quantity;
        }
        return qt;
      });
      if (qt !== 0) {
        return qt;
      } else {
        return 0;
      }
    }
  }

  render() {
    const Item = ({item}) => (
      <View
        style={{
          width: width - 20,
          margin: 10,
          // backgroundColor: 'transparent',
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderColor: '#cccccc',
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DetailProduct', {
              item: item,
              itemQt: this.updateQuantity(item.id),
            });
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: 'trangraysparent',
              paddingBottom: 8,
            }}>
            <Image
              resizeMode={'contain'}
              style={{width: width / 3, height: width / 3.8}}
              source={{uri: item.image}}
            />
            <View>
              <View
                style={{
                  width: width / 3,
                  // height: width / 4,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {/* Quantity Order */}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#33c37d',
                    fontSize: 17,
                    width: width / 13,
                  }}>
                  {this.updateQuantity(item.id) !== 0
                    ? this.updateQuantity(item.id) + 'x'
                    : ''}
                </Text>

                <Text
                  style={{
                    fontSize: 20,
                    width: width / 3.5,
                  }}>
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
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: width / 1.7,
                  height: width / 8,
                }}>
                <Text>
                  This is content of product aaaaa aaaaaa aaaaaaa aaaa
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={DataFile}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
          {/* View to Cart BTN */}
          {this.state.totalQuantity !== 0 ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Cart');
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: '#33c37d',
                width: width - 20,
                height: width - 320,
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                margin: 10,
                // justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  paddingLeft: 7,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                  width: width - 230,
                }}>
                View to cart
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  width: width - 250,
                }}>
                {this.state.totalQuantity > 1
                  ? this.state.totalQuantity + ' items'
                  : this.state.totalQuantity + ' item'}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                  width: width - 240,
                  justifyContent: 'space-between',
                }}>
                $ {this.state.totalPrice}
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* View to Cart BTN */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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
