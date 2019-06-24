import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, Text, Dimensions } from 'react-native'; 
import Header from './src/components/Header';
import Timeline from './src/components/Timeline';
import AddNewItem from './src/components/AddNewItem';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const API_URL = 'http://localhost:9000';
const {width, height} = Dimensions.get('window');
const {swidth, sheight} = Dimensions.get('screen');

export default class App extends Component {


  constructor( props ) {
    super(props);
    this.state = { showForm: false};
}
  componentDidMount() {
    /*fetch(`${API_URL}/items`)
      .then(response => response.json())
      .then(items => {
        this.setState({ items });
      });*/

      let data = [
        { "time": "01 Mar 2018 01:00:00 GMT+1000", "duration": 260, "user_id": "0001", "description": "fly to UK" },
        { "time": "01 Mar 2018 6:00:00 GMT+1000", "duration": 120, "user_id": "0001", "description": "Car hire" },
        { "time": "01 Mar 2018 10:00:00 GMT+1000", "duration": 180, "user_id": "0001", "description": "Have some rest" },
        { "time": "01 Mar 2018 15:00:00 GMT+1000", "duration": 180, "user_id": "0001", "description": "Drive to london" },
        { "time": "01 Mar 2018 20:00:00 GMT+1000", "duration": 180, "user_id": "0001", "description": "resturant - dinner" }
    ];

    let items = data.map( itemRecord => {
      return {
        time: Date.parse(itemRecord.time),
        duration: itemRecord.duration * 60 * 1000, // mins into ms
        description: itemRecord.description,
        userId: itemRecord.user_id
      }
    });

    this.setState({ items });
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

  addNewItem = () => {
    const { showForm } = this.state;
    this.setState({ showForm: !showForm});
  }

  render() {
    const range = this.getRange();
    console.log("sadas " + this.state.showForm);
    return (
      <View style={{flex: 1}}>
        <View style={styles.statusBar}>
          <StatusBar translucent backgroundColor="#008375" barStyle="light-content"></StatusBar>
        </View>
        <View style={styles.container}>
         <Header title="Timeline" callBackAddNewItem={this.addNewItem}></Header>
        </View>
        { this.state.showForm ? (
            <View style={{flex: 90}}>
              <View style={{flex: 4}}>
                <AddNewItem></AddNewItem>
              </View>
              <View style={{flex: 6}}>
                <Timeline items={this.state.items} range={range} ></Timeline>
              </View>
            </View>
        ) : (
          <View style={{flex: 90}}>
            <Timeline items={this.state.items} range={range} ></Timeline>
          </View>) 
        }
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

