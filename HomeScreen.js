/* eslint-disable react-native/no-inline-styles */
console.disableYellowBox = true;

import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DataFile from './DataFile';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

var {width} = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: null,
      totalQuantity: 0,
      totalPrice: 0,
    };
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle('dark-content');
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

    if (dataCart !== null && typeof dataCart !== 'undefined') {
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
    if (
      this.state.dataCart !== null &&
      typeof this.state.dataCart === 'object'
    ) {
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
    } else {
      return 0;
    }
  }

  render() {
    const Item = ({item}) => (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('DetailProduct', {
            item: item,
            itemQt: this.updateQuantity(item.id),
          });
        }}>
        <View
          style={{
            width: width - 20,
            margin: 10,
            // backgroundColor: 'gray',
            flexDirection: 'row',
            borderBottomWidth: 0.6,
            borderColor: '#cccccc',
            paddingBottom: 18,
            paddingLeft: 18,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode={'cover'}
              style={{
                width: width / 4,
                height: width / 5,
                borderRadius: 5,
                // paddingLeft: 12,
              }}
              source={{uri: item.image}}
            />
            <View
              style={{
                // backgroundColor: 'gray',
                // flex: 1,
                paddingLeft: 5,
                paddingRight: 10,
              }}>
              <View
                style={{
                  width: width / 3,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: width / 3,
                    flexDirection: 'row',
                  }}>
                  {this.updateQuantity(item.id) !== 0 ? (
                    <Text
                      style={{
                        paddingLeft: 5,
                        fontWeight: 'bold',
                        color: '#00b14f',
                        fontSize: 17,
                        width: width / 13,
                      }}>
                      {this.updateQuantity(item.id) + 'x'}
                    </Text>
                  ) : null}

                  <Text
                    style={{
                      paddingLeft: 5,
                      fontSize: 18,
                      width: width / 4,
                    }}>
                    {item.name}
                  </Text>
                </View>

                <View
                  style={{
                    width: width / 2.8,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontWeight: 'bold',
                      // color: '#00b14f',
                      fontSize: 16,
                    }}>
                    $ {item.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  // backgroundColor: 'gray',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: width / 1.4,
                  height: width / 8,
                }}>
                <Text
                  style={{
                    fontSize: 13,
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );

    return this.props.isLogged ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {/* ============================== StatusBar Section ============================== */}
        <View>
          <View
            style={{
              width: width,
              // justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00b14f',
            }}>
            <Text
              style={{
                paddingTop: 24,
                paddingBottom: 15,
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                justifyContent: 'center',
              }}>
              Girl Delivery App
            </Text>
          </View>
          {/* ============================== StatusBar Section ============================== */}

          <FlatList
            data={DataFile}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
          {/* ========================================= View to Cart BTN ================================================*/}
          {this.state.totalQuantity !== 0 ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Cart');
              }}
              style={{
                flexDirection: 'row',
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
                  paddingRight: 5,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                  // width: width - 200,
                  alignItems: 'flex-end',
                }}>
                $ {this.state.totalPrice}
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* ========================================= View to Cart BTN ================================================*/}
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
    cartItems: state.cartItems,
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch({type: 'ADD_TO_CART', payload: product}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
