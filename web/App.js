import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, Text, Dimensions } from 'react-native'; 
import Header from './src/components/Header';
import Timeline from './src/components/Timeline';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const API_URL = 'http://localhost:9000';
const {width, height} = Dimensions.get('window');
const {swidth, sheight} = Dimensions.get('screen');
console.log(height, sheight);
export default class App extends Component {

  state = {};

  constructor() {
    super();
  }
  componentDidMount() {
    fetch(`${API_URL}/items`)
      .then(response => response.json())
      .then(items => {
        this.setState({ items });
      });
  }

  getRange() {
    let range = {
      startTime: null,
      endTime: null
    };
    let allitems = [];
    if (this.state.items) {
      allitems = [...allitems, ...this.state.items];
    }

    if (this.state.newitems) {
      allitems = [...allitems, ...this.state.newitems];
    }

    if (allitems) {
      const startTimes = allitems.map(booking => booking.time);
      const endTimes = allitems.map(
        booking => booking.time + booking.duration
      );

      range.startTime = Math.min(...startTimes);
      range.endTime = Math.max.apply(null, endTimes);
    }

    return range;
  }


  render() {
    const range = this.getRange();
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.statusBar}>
          <StatusBar translucent backgroundColor="#008375" barStyle="light-content"></StatusBar>
        </View>
        <View style={styles.container}>
         <Header title="Timeline"></Header>
        </View>
        <View style={{flex: 90}}>
          <Timeline items={this.state.items} range={range}></Timeline>
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    flex: 2
  },
});


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

