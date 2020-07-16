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

// const itemData = this.props.route.params.item;

class DetailProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      girl: this.props.route.params.item,
      quantity: 1,
      price: this.props.route.params.item.price,
    };
  }

  componentDidMount() {}

  onClickAddCart(data) {
    // this.setState({girl: data, price: data.price});

    const itemcart = {
      girl: this.state.girl,
      quantity: this.state.quantity,
      price: this.state.price,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
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

  onChangeQual(type) {
    // const dataCar = this.state.dataCart;
    let iquantity = this.state.quantity;

    if (type) {
      iquantity += 1;
      // dataCar[i].quantity = iquantity;
    } else if (type === false && iquantity >= 1) {
      iquantity -= 1;
      // dataCar[i].quantity = iquantity;
    }
    //else if (type === false && iquantity === 1) {
    //   dataCar.splice(i, 1);
    //   AsyncStorage.removeItem('cart');
    //   this.setState({totalPrice: 0});
    //   this.forceUpdate();
    // }
    this.setState({quantity: iquantity});
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
              // backgroundColor: 'gray',
              flexDirection: 'column',
              paddingTop: 7,
              paddingLeft: 20,
              paddingRight: 20,
              width: width,
              height: width / 3.5,
            }}>
            <Text>This is content of product aaaaa aaaaaa aaaaaaa aaaa</Text>
          </View>
          {/* ================================================Change to quantity section */}
          <View
            style={{
              // backgroundColor: 'gray',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.onChangeQual(false)}>
              <Text
                style={{
                  alignItems: 'center',
                  color: '#33c37d',
                  paddingHorizontal: 8,
                  fontWeight: 'bold',
                  fontSize: 50,
                }}>
                -
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                alignItems: 'center',
                paddingHorizontal: 30,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {this.state.quantity}
            </Text>
            <TouchableOpacity onPress={() => this.onChangeQual(true)}>
              <Text
                style={{
                  alignItems: 'center',
                  color: '#33c37d',
                  paddingHorizontal: 8,
                  fontWeight: 'bold',
                  fontSize: 50,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {/* ================================================Change to quantity section */}
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
