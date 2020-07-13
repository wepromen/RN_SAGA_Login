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
  StatusBar,
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
        <Image
          resizeMode={'contain'}
          style={{width: width / 3, height: width / 3}}
          source={{uri: item.image}}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'trangraysparent',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{name}</Text>
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
              }}>
              $ {price}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.onPress(item)}>
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

    const renderItem = ({item}) => (
      <Item item={item} name={item.name} price={item.price} />
    );
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.products}
          renderItem={renderItem}
          // keyExtractor={(item) => item.food.id}
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
