import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";


export default function App({ navigation, route }) {
  const dbRef = ref(getDatabase(firebase));

    const [nb1, Setnb1] = React.useState("2")
    const [nb2, Setnb2] = React.useState("3")
    const [nb3, Setnb3] = React.useState("3")
    const [nb4, Setnb4] = React.useState("2")
    const [code, SetCode] = React.useState("")


    function setCompagnytouser(nbr) {
        set(ref(getDatabase(firebase), 'users/' + route.params.id + '/cmp'), {
            compagny: nbr,
        });
    }

    async function submit() {
        SetCode(nb1 + nb2 + nb3 + nb4)
        console.log(code)
        try {
            let actualcode = nb1 + nb2 + nb3 + nb4
            console.log(actualcode)
            let snapshot = await get(child(dbRef, `factory/${actualcode}`));
            snapshot = snapshot.val();
            console.log("snap", snapshot)
            if (snapshot != null) {
                setCompagnytouser(nb1 + nb2 + nb3 + nb4)
                navigation.navigate("Home", {id: route.params.id})
            } else {
                Setnb1("")
                Setnb2("")
                Setnb3("")
                Setnb4("")
                SetCode("")
            }
          } catch(e) {
            console.log(e)
          }
    }
    return (
        <View style={ styles.container }>
            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>Enter{"\n"}Company Code</Text>
            </View>
            <View style={ styles.circle1 } />
            <View style={ styles.circle2 } />
            <View style={ styles.form } >
                <TextInput maxLength={1} style={ styles.input } onChangeText={txt => Setnb1(txt)} value={nb1}/>
                <TextInput maxLength={1} style={ styles.input } onChangeText={txt => Setnb2(txt)} value={nb2}/>
                <TextInput maxLength={1} style={ styles.input } onChangeText={txt => Setnb3(txt)} value={nb3}/>
                <TextInput maxLength={1} style={ styles.input } onChangeText={txt => Setnb4(txt)} value={nb4}/>
            </View>
            <TouchableOpacity onPress={() => submit()} style= {styles.buttonsubmit}>
                <Text style = {styles.submittxt}>Submit</Text>
            </TouchableOpacity>
            <View style = {styles.createcontainer}>
                <Text style = {styles.nottxt}>Not part of any Compagny ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Plan", {id: route.params.id})}><Text style = {styles.createtxt}>Create one</Text></TouchableOpacity>
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
        top: '50%',
        left: '3.5%',
        width: '83%',
        height: '40%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingLeft: 30,
        marginVertical: 10,
        width: '20%',
        height: '20%',
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
    },
    buttonsubmit: {
        backgroundColor: "#55BE96",
        width: "85%",
        height: "10%",
        marginLeft: "7.5%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    submittxt: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
    },
    createcontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "5%",
        width: "100%",
    },
    createtxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    nottxt: {
        fontSize: 12,
        color: "#D2D2D2",
    },
});
