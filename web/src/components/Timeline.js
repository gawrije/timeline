import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'; 

export default class Timeline extends Component {


  drawTimeline1() {
    const timeRange = this.props.range.endTime - this.props.range.startTime;
    if (this.props.items) {
      return (<View style={styles.timeline}>
              {
                this.props.items.map((booking, index) => {

                  const left = ((booking.time - this.props.range.startTime) / timeRange) * 100;

                  const width = (booking.duration / timeRange) * 100;

                  const color = 'red';
                  if (booking.overlap) {
                    color = 'green';
                  }

                  const divStyle = {
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

 

  drawTimeline2() {
    const timeRange = this.props.range.endTime - this.props.range.startTime;
    if (this.props.items) {
      return (<View style={styles.timeline}>
                <View style={styles.time}><Text>Time</Text></View>
                <View style={styles.lineContainer}>
                  <View style={{width: 20, flexDirection: 'row'}}>
                    <View style={styles.line}>
                    {
                      this.props.items.map((booking, index) => {
                        const top = ((booking.time - this.props.range.startTime) / timeRange) * 100;
                        const height = (booking.duration / timeRange) * 100;

                        const divStyle = {
                          backgroundColor: 'blue',
                          width: 4,
                            
                        };

                        const mainDiv = {
                          position: 'absolute',
                         
                          height: `${height}%`,
                          top: `${top}%`,
                          flexDirection: 'column'
                        }

                        const divStyleCircle = {
                          position: 'absolute',
                          backgroundColor: 'white',
                          borderRadius: 50,
                          width: 20,
                          height: 20,
                          borderWidth: 6,
                          borderColor: '#00b3b3',
                          bottom: `${top}%`,
                        }

                        return (<View key = {index} style = {mainDiv}>
                          <Text style = {divStyle}></Text>
                          <Text>Description</Text>
                        </View>)
                    
                      })
                    }
                    
                    </View>
                  </View>
                  
                </View>
              
              <View style={styles.description}><Text>Description</Text></View> 
          </View>
          )
    }
  }

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

/*const styles = StyleSheet.create({
    timelineContainer: {
      flex: 1,
      margin: 10,
      flexDirection: 'row',
    },
    time: {
      flex: 20,
    },
    lineContainer: {
      flex: 30,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    line: {
      backgroundColor: '#00b3b3',
      position: 'relative',
      width: 4, 
    },
    description: {
      flex: 50,
    },
    divStyle: {
      position: 'absolute',
      backgroundColor: 'blue',
      width: 2,
      height: '10%',
      bottom: '50%',
      
    },
    divStyleCircle: {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 50,
      width: 20,
      height: 20,
      borderWidth: 6,
      borderColor: '#00b3b3',
      top: '60%',
    }
})*/
