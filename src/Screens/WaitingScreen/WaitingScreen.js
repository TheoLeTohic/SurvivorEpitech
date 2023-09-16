import {Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function  NewEmployees() {
    return (
        <View style = {styles.container}>
            <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={['rgba(0, 0,0,0.7)', 'rgba(0, 154, 117, 1)']}
                style={styles.background}
            />
            <Text style={styles.toptitle}>Admin Confirm</Text>
            <Image style = {styles.logo} source = {require('../../../assets/Key.png')} />

            <View style = {styles.textview}>
                <Text style = {styles.subtitle}>Thank You!</Text>
                <Text style = {styles.title}>Waiting for admin</Text>
                <Text style = {styles.subtitle}>Check with the admin of the company !</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7E5FF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: 0,
    },
    toptitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    textview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: "10%",
    },
    title: {
        fontSize: 35,
        color: 'white',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#D2D2D2',
        marginTop: "2%",
    },
})