import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, Text } from 'react-native'; 
import Header from './src/components/Header'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends Component {

  render() {
    return (
      <View>
        <View style={styles.statusBar}>
          <StatusBar hidden = {false} translucent = {true}></StatusBar>
        </View>
        <View style={styles.container}>
          <Header title="Timeline"></Header>
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#CC6600'
  },
});
