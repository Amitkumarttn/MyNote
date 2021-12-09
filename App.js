import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import StackNavigation from './src/routes/StackNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <StackNavigation />
        </Provider>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
