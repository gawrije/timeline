import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'; 

export default class Timeline extends Component {


  drawTimeline() {
    const timeRange = this.props.range.endTime - this.props.range.startTime;
    if (this.props.bookings) {
      console.log(this.props.bookings);
      return (<View style={styles.timeline}>
              {
                this.props.bookings.map((booking, index) => {

                  let left = ((booking.time - this.props.range.startTime) / timeRange) * 100;

                  let width = (booking.duration / timeRange) * 100;

                  let color = 'red';
                  if (booking.overlap) {
                    color = 'green';
                  }

                  let divStyle = {
                      height: '20px',
                      position: 'absolute',
                      backgroundColor: `${color}`,
                      width: `${width}%`,
                      left: `${left}%`
                  };

                  return <Text key = {index} style = {{color: 'red'}}>
                          {booking.description}
                       </Text>
                })
              }
          </View>
          )
    }

    
  }

  render() {
    return <View style={styles.timelineContainer}>{this.drawTimeline()}</View>;
  }
}

const styles = StyleSheet.create({
    timeline: {
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        position: 'relative',
        height: 20,
    },
    timelineContainer: {
        width: '90%',
        height: 20,
        
    },
});
