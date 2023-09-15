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
          <Image style = {styles.logo} source = {require('../../../assets/Key.png')}/>
          <Text style = {styles.title}>Thank You!</Text>
            <Text style = {styles.subtitle}>Waiting for admin</Text> 
            </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7E5FF',
        display: 'flex',
        flexDirection: 'column',
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
})