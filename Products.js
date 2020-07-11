import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';

class Products extends Component {
  renderProducts = (products) => {
    return products.map((item, index) => {
      return (
        <View key={index} style={{padding: 20}}>
          <Button
            onPress={() => {
              console.log('**Touch to: ' + item.name);
              this.props.onPress(item);
            }}
            title={item.name + ' - ' + item.price}
          />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderProducts(this.props.products)}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
