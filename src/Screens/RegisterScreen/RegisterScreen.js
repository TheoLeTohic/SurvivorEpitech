import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '../..//firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useState } from 'react';


export default function App({ navigation }) {
    const auth = getAuth();
    const db = getDatabase(firebase);
    const [user, setUser] = useState("test");
    const [email, setEmail] = useState("theoltc@gmail.com");
    const [password, setPassword] = useState("Charlie.02");

    function createAccount(idco) {
        set(ref(db, 'users/' + user), {
            name: user,
            Email: email,
            surname: user,
            idConnect: idco,
          });

    }

    function register() {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            createAccount(userCredential.user.uid);
            navigation.navigate('Home', { id: userCredential.user.uid});
        })
            .catch((error) => {
                console.log(error);
            }
            )
    }
    return (
        <View style={ styles.container }>
            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>Create{"\n"}Account</Text>
            </View>
            <View style={ styles.circle1 } />
            <View style={ styles.circle2 } />
            <View style={ styles.form } >
                <TextInput style={ styles.input } placeholder="Name" />
                <TextInput style={ styles.input } placeholder="Your Email" value={email} onChange={(txt) => setEmail(txt)}/>
                <TextInput style={ styles.input } placeholder="Password" value={password} onChange={(txt) => setPassword(txt)}/>
            </View>
            <View style={ styles.signup } >
                <Text style={ styles.signupText }>Sign Up</Text>
                <TouchableOpacity onPress={() => register()} style={ styles.circle3 } />
            </View>
            <View style={ styles.signin } >
                <Text style={ styles.signinText }>Sign In</Text>
                <View style={ styles.rectangle1 } />
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
    },
    titleContainer: {
        marginTop: 100,
    },
    title: {
        zIndex: 1,
        color: '#FFF',
        fontSize: 46,
        fontStyle: 'normal',
        fontWeight: 'bold',
        left: '9.6%',
        top: '35.256%',
    },
    circle1: {
        position: 'absolute',
        width: '186.666666667%',
        height: '86.2068965517%',
        borderRadius: 700 / 2,
        backgroundColor: '#367CFED9',
        top: -414,
        left: -284,
    },
    circle2: {
        backgroundColor: '#B0CBFF',
        position: 'absolute',
        width: '122.4%',
        height: '49.01477%',
        borderRadius: 459 / 2,
        top: 579,
        left: 154,
    },
    circle3: {
        backgroundColor: '#367CFE',
        width: 64,
        height: 64,
        borderRadius: 2000,
    },
    form: {
        display: 'flex',
        top: '12.113300493%',
        left: '9.3%',
        width: '100%',
        height: '40%',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingLeft: 30,
        marginVertical: 10,
        width: '80%',
        height: '17%',
    },
    signup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 30,
    },
    signupText: {
        fontSize: 32,
        marginRight: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    signin: {
        display: 'flex',
        left: '72%',
        top: '15%',
    },
    signinText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    rectangle1: {
        backgroundColor: '#367CFE',
        width: 75,
        height: 10,
    }

});
