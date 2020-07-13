import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';

class Products extends Component {
  render() {
    const Item = ({item, name, price}) => (
      <View style={styles.item}>
        <View style={{width: 240, height: 70}}>
          <Text style={styles.title}>
            {name} - {price} $
          </Text>
        </View>
        <View style={{width: 80, height: 70}}>
          <TouchableOpacity onPress={() => this.props.onPress(item)}>
            <Text style={styles.btn}>
              {this.props.propsAction === 'Remove' ? 'Remove' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    const renderItem = ({item}) => (
      <Item item={item} name={item.name} price={item.price} />
    );
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: '#33c37d',
    marginTop: 20,
  },
  title: {
    // paddingHorizontal: 10,
    // justifyContent: 'center',
    fontSize: 35,
  },
  btn: {
    padding: 5,
    marginRight: 5,
    textAlign: 'right',
    backgroundColor: '#33c37d',
    // justifyContent: 'center',
    fontSize: 18,
  },
});
