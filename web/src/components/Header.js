import React from 'react';
import { View, StyleSheet, Platform, StatusBar, Text } from 'react-native'; 

const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 * 3 : StatusBar.currentHeight * 2;

const Header = (props) => (
    <View style={styles.header}>
        <View><Text style = {styles.text}>Menu</Text></View>
        <View><Text style = {styles.text}>{props.title}</Text></View>
        <View><Text style = {styles.text}>Add</Text></View>
    </View>
);

const styles = StyleSheet.create({
    header: {
      height: HEADER_HEIGHT,
      backgroundColor: '#CC6600',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default Header;
