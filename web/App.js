import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, Text } from 'react-native'; 
import Header from './src/components/Header';
import Timeline from './src/components/Timeline';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const API_URL = 'http://localhost:9000';

export default class App extends Component {

  state = {};

  constructor() {
    super();
  }
  componentDidMount() {
    fetch(`${API_URL}/items`)
      .then(response => response.json())
      .then(bookings => {
        this.setState({ bookings });
      });
  }

  getRange() {
    let range = {
      startTime: null,
      endTime: null
    };
    let allBookings = [];
    if (this.state.bookings) {
      allBookings = [...allBookings, ...this.state.bookings];
    }

    if (this.state.newBookings) {
      allBookings = [...allBookings, ...this.state.newBookings];
    }

    if (allBookings) {
      const startTimes = allBookings.map(booking => booking.time);
      const endTimes = allBookings.map(
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
      <View>
        <View style={styles.statusBar}>
          <StatusBar translucent backgroundColor="#008375" barStyle="light-content"></StatusBar>
        </View>
        <View style={styles.container}>
         <Header title="Timeline"></Header>
        </View>
        <View>
          <Text>Existing bookings: gawri</Text>
          <Timeline bookings={this.state.bookings} range={range}></Timeline>
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
    
  },
});


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

