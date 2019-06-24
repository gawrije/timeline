
import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export default class AddNewItem extends Component {
    render() {
      return (
        <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            placeholder="Date"
            maxLength={20}
            />
        <TextInput
            style={styles.textInput}
            placeholder="Duration"
            maxLength={2}
            />
        <TextInput
            style={styles.textInput}
            placeholder="Description"
            maxLength={100}
            />
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20
      }
  });