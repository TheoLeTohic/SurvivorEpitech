import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebase } from '../../firebase/config'
import Navbar from '../../Components/NavBar/Navbar';

export default function App({ navigation, route }) {
    return (
        <View style={styles.container}>
        <Navbar navigation={navigation} index = {2} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});