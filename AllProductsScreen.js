/* eslint-disable react-native/no-inline-styles */
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
console.disableYellowBox = true;

class AllProductsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCart: [],
    };
  }
  componentDidMount() {
    let arrQt = [];
    AsyncStorage.getItem('cart')
      .then((cart) => {
        if (cart !== null) {
          const dataCart = JSON.parse(cart);
          this.setState({dataCart: dataCart});
        }
      })
      .catch((err) => {
        console.log(' ' + err);
      });

    console.log(
      'AllProductS - id: ' +
        this.props.cartItems.id +
        ' Qt: ' +
        this.props.cartItems.quantity,
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.cartItems !== prevProps.cartItems) {
      this.componentDidMount();
      this.forceUpdate();
    }
  }

  updateQuantity(byId) {
    let qt = 0;
    this.state.dataCart.forEach((el) => {
      if (el.id === byId.toString()) {
        qt = el.quantity;
      }
      return qt;
    });
    // console.log(qt !== 0 ? qt : '');
    if (qt !== 0) {
      return qt;
    } else {
      return 0;
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
            this.props.navigation.navigate('DetailProduct', {item});
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
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // items: state.items,
    // quantity: state.quantity,
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
