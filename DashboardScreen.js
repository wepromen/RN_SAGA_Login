import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Component,
} from 'react-native';

export class AItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{this.props.items.title}</Text>
        <Text>{this.props.items.content}</Text>
      </View>
    );
  }
}

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        content: 'Content item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        content: 'Content item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        content: 'Content item',
      },
    ];
    return (
      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({item, index}) => <AItem items={item} index={index} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
