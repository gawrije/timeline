
import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

import DatePicker from 'react-native-datepicker';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default class AddNewItem extends Component {

    constructor( props ) {
        super(props);
        this.state = {
            date: new Date(),
            duration: "",
            description: ""
        };
    }

    isOverlap(newItem) {
        let overlap = false;
        const range1 = moment.range(
          new Date(newItem.date),
          new Date(newItem.date + newItem.duration * 60 * 60 * 1000)
        );
        this.props.items.forEach(it => {
          const range2 = moment.range(
            new Date(it.time),
            new Date(it.time + it.duration)
          );
    
          if (range1.overlaps(range2)) {
            overlap = true;
            return;
          }
        });
    
        return overlap;
      }

    onClickSave = () => {
        if (this.isOverlap(this.state)) {
            this.setState({isOverlap});
            console.log(this.isOverlap);
        }else{
            
        }
    }

    changeDate = (date) => {
        this.state.date = date;
    }

    handleDurationChange = (duration) => {
        this.state.duration = duration;
    }

    handleDescriptionChange = (description) => {
        this.state.description = description;
    }

    render() {
      return (
        <View style={styles.container}>
            <DatePicker style={styles.dateInput}
            date={this.state.date}
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            customStyles={{
                dateInput: {
                    marginLeft: 0,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 6,
                    paddingLeft: 10,
                    borderWidth: 0
                }
            }}
            onDateChange={this.changeDate}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Duration"
                maxLength={2}
                onChangeText={this.handleDurationChange}
                />
            <TextInput
                style={styles.textInput}
                placeholder="Description"
                maxLength={100}
                onChangeText={this.handleDescriptionChange}
                />
            <View style={styles.saveButton}>
                <Text style={{flex:80, padding:10}}>time overlaps with other item</Text>
                <View style={{flex:20}}><Button onPress={this.onClickSave}
                    title="Save"
                    color="#008375"/></View>
            </View>
        </View>
      );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 20,
      padding: 20,
      backgroundColor: '#ffffff',
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
        height: 40,
        paddingLeft: 10,
        paddingRight: 10
    },
    dateInput: {
        height: 40,
        width: '100%',
        borderColor: '#CCCCCC',
        borderBottomWidth: 1,
    },
    saveButton: {
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
    }
  });