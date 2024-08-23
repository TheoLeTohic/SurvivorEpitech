import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from "../../Components/NavBar/Navbar";

export default function App( { navigation }) {

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} index = {1}/>
        </View>
    );
}

const styles = StyleSheet.create({
});
