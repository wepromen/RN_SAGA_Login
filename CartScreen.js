/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
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

var {width} = Dimensions.get('window');
var totalPrice = 0;
console.disableYellowBox = true;
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    // 1. get cart from AsStore
    AsyncStorage.getItem('cart')
      .then((cart) => {
        if (cart !== null) {
          // We have data!!
          const dataCart = JSON.parse(cart);
          this.setState({dataCart: dataCart});
          console.log('CartScreen mount: ' + dataCart);
        }
      })
      .catch((err) => {
        console.log('CartS did mount: ' + err);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.cartItems) {
      this.componentDidMount();
    }
  }

  onChangeQual(i, type) {
    const dataCar = this.state.dataCart;
    let iquantity = dataCar[i].quantity;

    if (type) {
      iquantity += 1;
      dataCar[i].quantity = iquantity;
      this.setState({dataCart: dataCar});
      totalPrice = 0;
    } else if (type === false && iquantity >= 2) {
      iquantity -= 1;
      dataCar[i].quantity = iquantity;
      this.setState({dataCart: dataCar});
      totalPrice = 0;
    } else if (type === false && iquantity === 1) {
      dataCar.splice(i, 1);
      this.setState({dataCart: dataCar});
      totalPrice = 0;
    }
    AsyncStorage.setItem('cart', JSON.stringify(dataCar));
    if (totalPrice === 0) {
      AsyncStorage.removeItem('cart');
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <ScrollView>
            {this.state.dataCart.map((item, i) => {
              totalPrice += item.price * item.quantity;
              return (
                <View
                  style={{
                    width: width - 20,
                    margin: 10,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    borderBottomWidth: 2,
                    borderColor: '#cccccc',
                    paddingBottom: 5,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{width: width / 3, height: width / 3.8}}
                    source={{uri: item.girl.image}}
                  />
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      paddingTop: 10,
                      paddingLeft: 10,

                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>
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
                          fontWeight: 'bold',
                          color: '#33c37d',
                          fontSize: 20,
                          width: width / 3,
                        }}>
                        $ {item.price * item.quantity}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(i, false)}>
                          <Text
                            style={{
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
                            paddingHorizontal: 8,
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.onChangeQual(i, true)}>
                          <Text
                            style={{
                              color: '#33c37d',
                              paddingHorizontal: 8,
                              fontWeight: 'bold',
                              fontSize: 50,
                            }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View>
            <View
              style={{
                width: width - 40,
                padding: 15,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                Total: ${totalPrice}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                Alert.alert('Total: ' + totalPrice);
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
                CHECKOUT
              </Text>
            </TouchableOpacity>
          </View>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeItem: (product) =>
//       dispatch({type: 'REMOVE_FROM_CART', payload: product}),
//   };
// };

export default connect(mapStateToProps, null)(CartScreen);
// export default CartScreen;
