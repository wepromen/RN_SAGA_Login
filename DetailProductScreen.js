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
    let qt = 1;
    if (this.props.route.params.itemQt !== 0) {
      qt = this.props.route.params.itemQt;
    }
    this.state = {
      id: this.props.route.params.item.id,
      girl: this.props.route.params.item,
      quantity: qt,
      price: this.props.route.params.item.price,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('cart')
      .then((cart) => {
        if (cart !== null) {
          const dataCart = JSON.parse(cart);
          this.setState({
            dataCart: dataCart,
          });
        }
        return this.state.dataCart;
      })
      .catch((err) => {
        console.log('Deatail Screen did mount: ' + err);
      });
  }

  onClickAddCart(data) {
    const itemcart = {
      id: this.state.girl.id,
      girl: this.state.girl,
      quantity: this.state.quantity,
      price: this.state.price,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
          let cart = JSON.parse(datacart);
          let isExist = false;
          cart.map((item, i) => {
            console.log(item.girl.name + ' vs ' + data.name);
            if (item.girl.name === data.name) {
              item.quantity = itemcart.quantity;
              isExist = true;
            }
          });
          if (!isExist) {
            console.log('   Push New Item into Cart: ' + itemcart.girl.name);
            cart.push(itemcart);
          }

          return cart;
        } else {
          let cart = [];
          cart.push(itemcart);
          return cart;
        }
      })
      .then((rs) => {
        // *** set into Async!!!!!!
        AsyncStorage.setItem('cart', JSON.stringify(rs));
        return rs;
      })
      .then((rs) => {
        console.log('Detail items: ' + rs);
        // *** Set into props !!!!
        this.props.addItemsToCart(rs, this.state.girl.id, this.state.quantity);
        this.props.navigation.navigate('TabNav');
      })
      .catch((err) => {
        console.log('DetailS ClickAdd err: ' + err);
      });
  }

  onChangeQual(type) {
    let iquantity = this.state.quantity;

    if (type) {
      iquantity += 1;
    } else if (type === false && iquantity >= 2) {
      iquantity -= 1;
    }

    this.setState({quantity: iquantity});
    // this.props.addItemsToCart(rs, this.state.girl.id, this.state.quantity);
    this.props.updateQt(this.state.girl.id, this.state.quantity);
  }

  render() {
    const item = this.props.route.params.item;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          // backgroundColor: 'trangraysparent',
          paddingBottom: 8,
        }}>
        <Image
          resizeMode={'cover'}
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
                color: '#00b14f',
                fontSize: 20,
                // alignItems: 'center',
              }}>
              $ {this.state.price * this.state.quantity}
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
          {/* ================================================Change to quantity section */}
          <View
            style={{
              // backgroundColor: 'gray',
              height: width / 4.3,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 4,
            }}>
            <TouchableOpacity onPress={() => this.onChangeQual(false)}>
              <Text
                style={{
                  alignItems: 'center',
                  color: '#00b14f',
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
                  color: '#00b14f',
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
              // flexDirection: 'row',
              backgroundColor: '#00b14f',
              width: width - 20,
              height: width - 320,
              alignItems: 'center',
              padding: 5,
              borderRadius: 5,
              margin: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 18,
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
    addItemsToCart: (items, id, quantity) =>
      dispatch({
        type: 'ADD_TO_CART',
        payload: items,
        quantity: quantity,
        id: id,
      }),
    updateQt: (id, quantity) =>
      dispatch({
        type: 'UPDATEQT',
        quantity: quantity,
        id: id,
      }),
  };
};
export default connect(null, mapDispatchToProps)(DetailProductScreen);
