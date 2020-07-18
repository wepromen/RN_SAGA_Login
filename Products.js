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

var {width} = Dimensions.get('window');

class Products extends Component {
  render() {
    const Item = ({item, name, price}) => (
      <View
        style={{
          width: width - 20,
          margin: 10,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderColor: '#cccccc',
          paddingBottom: 10,
        }}>
        <TouchableOpacity onPress={() => this.props.onPress(item)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'trangraysparent',
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
                <Text
                  style={{fontWeight: 'bold', fontSize: 20, width: width / 3}}>
                  {name}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#00b14f',
                    fontSize: 20,
                    // alignItems: 'center',
                  }}>
                  $ {price}
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

    const renderItem = ({item}) => (
      <Item item={item} name={item.name} price={item.price} />
    );
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.products}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
        />
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

export default connect(mapStateToProps, null)(Products);
