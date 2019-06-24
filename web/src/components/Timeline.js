import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'; 

export default class Timeline extends Component {

  drawTimeline() {
    const timeRange = this.props.range.endTime - this.props.range.startTime;
    if (this.props.items) {
      return this.props.items.map((item, index) => {
        const top = ((item.time - this.props.range.startTime) / timeRange) * 100;
        const height = (item.duration / timeRange) * 100;

        const timeline = {
          position: 'absolute',
          top: `${top}%`,
          flexDirection: 'row',
          width: '100%',
          height: `${height}%`
        }

        const dateStart = new Date(item.time);
        const dateFinish = new Date(item.time + item.duration);
        const StartTime = dateStart.getHours() + ":" + dateStart.getMinutes();
        const FinishTime = dateFinish.getHours() + ":" + dateFinish.getMinutes();
        var ampmStartTime = (dateStart.getHours() >= 12) ? StartTime + " PM" : StartTime + " AM";
        var ampmFinishTime = (dateFinish.getHours() >= 12) ? FinishTime + " PM" : FinishTime + " AM";

        return (<View key={index} style={timeline}>
            <View style={styles.timeDiv}>
              <Text  style={styles.finishTime}>{ampmStartTime}</Text>
              <Text style={styles.finishTime}>{ampmFinishTime}</Text>
            </View>
            <View style={{flex:10}}>
    
                <Text style={styles.divStyleCircle}></Text>
                <Text style={styles.divStyle}></Text>
                <Text style={styles.divStyleCircle}></Text>
     
            </View>
            <View style={styles.descriptionDiv}>
              <Text>{item.description}</Text>
            </View>
        </View>)
      })
    }
  }

  render() {
    return <View style={styles.timelineContainer}>
        {
          this.drawTimeline()
        }
    </View>;
  }
}

const styles = StyleSheet.create({
  timelineContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    position: 'relative',
  },
  divStyle: {
    width: 3,
    backgroundColor: '#227a7a',
    flex: 80,
    marginRight: 6,
    marginLeft: 6
  },
  timeDiv: {
    flex: 40, 
    flexDirection:'column', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    paddingRight: 20, // Change this to be flex
    fontSize: 10,
  },
  descriptionDiv: {
    flex: 50, 
    flexDirection:'column', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    paddingRight: 20, // Change this to be flex
    fontSize: 10,
  },
  divStyleCircle: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#00b3b3',
    width: 15,
    height: 15,
  },
  startTime: {
    backgroundColor: '#7a2229',
    borderRadius: 10,
    color: 'white',
    paddingLeft: 4,
    paddingRight: 4,
  },
  finishTime: {
    backgroundColor: '#b76c72',
    borderRadius: 10,
    color: 'white',
    paddingLeft: 4,
    paddingRight: 4,
  }
});
