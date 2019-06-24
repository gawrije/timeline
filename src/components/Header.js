import React, { Component } from 'react';
import { View, StyleSheet, Platform, StatusBar, Text, TouchableOpacity } from 'react-native'; 
import AddNewItem from './AddNewItem';
const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 * 3 : StatusBar.currentHeight * 2;


export default class Header extends Component {

    addNewItem = () => {
        this.props.callBackAddNewItem();
    }

    render() {
        return (
                <View style={styles.header}>
                    <View><Text style = {styles.text}>Menu</Text></View>
                    <View><Text style = {styles.text}>{this.props.title}</Text></View>
                    <TouchableOpacity onPress={this.addNewItem}> 
                        <View><Text style = {styles.text}>Add</Text></View>
                    </TouchableOpacity>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
      height: '100%',
      backgroundColor: '#008375',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

