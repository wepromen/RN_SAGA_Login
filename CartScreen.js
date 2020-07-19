/* eslint-disable react-native/no-inline-styles */
console.disableYellowBox = true;

import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

var {width} = Dimensions.get('window');

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      totalPrice: 0,
      itemPrice: 0,
    };
  }

  componentDidMount() {
    // console.log(this.props.cartItems.quantity);
    // 1. get cart from AsStore
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
      .then((rs) => {
        this.onChangeTotal();
      })
      .catch((err) => {
        console.log('CartS did mount: ' + err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cartItems !== prevProps.cartItems) {
      this.componentDidMount();
    }
    if (prevState.dataCart !== this.state.dataCart) {
      this.setState({
        totalPrice: 0,
      });
    }
  }

  onChangeTotal() {
    let totalPrice = 0;
    let itemPrice = 0;
    this.state.dataCart.map((item, i) => {
      itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
      this.setState({
        itemPrice: itemPrice,
        totalPrice: totalPrice,
      });
    });
  }

  onChangeQual(i, type) {
    const dataCar = this.state.dataCart;
    let iquantity = dataCar[i].quantity;

    if (type) {
      iquantity += 1;
      dataCar[i].quantity = iquantity;
      this.props.updateQt(dataCar[i].girl.id, iquantity);
    } else if (type === false && iquantity >= 2) {
      iquantity -= 1;
      dataCar[i].quantity = iquantity;
      this.props.updateQt(dataCar[i].girl.id, iquantity);
    } else if (type === false && iquantity === 1) {
      this.props.updateQt(dataCar[i].girl.id, 0);
      dataCar.splice(i, 1);
      AsyncStorage.removeItem('cart');
      this.setState({totalPrice: 0});
      // this.forceUpdate();
    }
    this.setState({dataCart: dataCar});

    this.onChangeTotal();
    // console.log(dataCar);

    AsyncStorage.setItem('cart', JSON.stringify(dataCar));

    if (this.state.totalPrice === 0) {
      AsyncStorage.removeItem('cart');
    }
  }

  render() {
    return this.props.isLogged ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* <View
          style={{
            width: width,
            alignItems: 'center',
            backgroundColor: '#00b14f',
          }}>
          <Text
            style={{
              paddingTop: 10,
              paddingBottom: 7,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              justifyContent: 'center',
            }}>
            Your Cart
          </Text>
        </View> */}
        <View style={{flex: 1}}>
          <ScrollView>
            {this.state.dataCart.map((item, i) => {
              return (
                <View
                  style={{
                    flex: 1,
                    margin: 5,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderColor: '#cccccc',
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 15,
                  }}>
                  <Image
                    resizeMode={'cover'}
                    style={{
                      width: width / 4,
                      height: width / 5,
                      borderRadius: 5,
                      padding: 15,
                    }}
                    source={{uri: item.girl.image}}
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 15,
                      // justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        {item.girl.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          // fontWeight: 'bold',
                          fontSize: 15,
                          width: width / 4,
                        }}>
                        $ {item.price * item.quantity}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      // backgroundColor: 'gray',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.onChangeQual(i, false)}>
                      <AntDesign
                        name="minussquareo"
                        size={35}
                        color="#00b14f"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        paddingHorizontal: 8,
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.onChangeQual(i, true)}>
                      <AntDesign name="plussquareo" size={35} color="#00b14f" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                width: width,
                paddingHorizontal: 15,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  justifyContent: 'space-between',
                }}>
                Total:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  justifyContent: 'space-between',
                }}>
                $ {this.state.totalPrice}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                // Alert.alert('Total: ' + totalPrice);
              }}
              style={{
                backgroundColor: '#00b14f',
                width: width - 20,
                height: width - 320,
                alignItems: 'center',
                padding: 5,
                borderRadius: 5,
                margin: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                CHECKOUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'blue'}}> Let's login before!</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    cartItems: state.cartItems,
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
