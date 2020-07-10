import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Component,
  TouchableOpacity,
  Alert
} from 'react-native';
import DataFile from './DataFile';

export class AItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressAItem(item) {
    Alert.alert(item.title);
  }

  render() {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.onPressAItem(this.props.items)}>
          <Text style={styles.title}>{this.props.items.title}</Text>
          <Text>{this.props.items.content}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={DataFile}
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
    backgroundColor: 'gray', // this.props.index % 2 === 0 ? 'green' : 'gray'
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});
