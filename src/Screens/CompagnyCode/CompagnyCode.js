import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { firebase } from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get, set, del } from "firebase/database";
import {LinearGradient} from "expo-linear-gradient";


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
            status: false,
        });
        set(ref(getDatabase(firebase), 'users/' + route.params.id + '/role'), {
            role: "member",
        });
    }


    async function setCompagnyMemberplus1(snapshot) {
            const temp = snapshot
            console.log("temp", temp)
            console.log(temp["members"])
            console.log(temp.members)
            set(ref(getDatabase(firebase), 'factory/' + code), {
                compagny: temp.compagny,
                members: (temp.members + 1),
                memmberList: temp.memmberList,
                maxmembers: temp.maxmembers,
                type: temp.type,
            });
    }

    async function submit() {
        SetCode(nb1 + nb2 + nb3 + nb4)
        try {
            let actualcode = nb1 + nb2 + nb3 + nb4
            let snapshot = await get(child(dbRef, `factory/${actualcode}`));
            snapshot = snapshot.val()
            if (snapshot != null) {
                setCompagnytouser(nb1 + nb2 + nb3 + nb4)
                setCompagnyMemberplus1(snapshot)
                navigation.navigate("Home", {id: route.params.id, name: route.params.name, me: route.params.me, code: nb1 + nb2 + nb3 + nb4})
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
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={['rgba(0, 0,0,0.7)', 'rgba(0, 154, 117, 1)']}
                style={styles.background}
            />
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
            <View style = { styles.buttonContainer }>
                <TouchableOpacity onPress={() => submit()} style= {styles.buttonsubmit}>
                    <Text style = {styles.submittxt}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.createcontainer}>
                <Text style = {styles.nottxt}>Not part of any Compagny ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Plan", {id: route.params.id, me: route.params.me})}><Text style = {styles.createtxt}>Create one</Text></TouchableOpacity>
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
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: 0,
    },
    titleContainer: {
        zIndex: 100,
        marginTop: 100,
    },
    title: {
        zIndex: 100,
        color: '#FFF',
        fontSize: 34,
        fontStyle: 'normal',
        fontWeight: 'bold',
        left: '9.6%',
        top: '35.256%',
    },
    circle1: {
        position: 'absolute',
        width: 700,
        height: 700,
        borderRadius: 700 / 2,
        backgroundColor: '#183D3D',
        top: -414,
        left: -250,
    },
    circle2: {
        backgroundColor: '#93B1A6',
        position: 'absolute',
        width: 450,
        height: 450,
        borderRadius: 450 / 2,
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
        borderRadius: 10,
        paddingLeft: 30,
        width: '22%',
        height: '22%',
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
    buttonsubmit: {
        backgroundColor: "#55BE96",
        height: "100%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    submittxt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    createcontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: "7.5%",
        marginTop: "8%",
        width: "83%",
    },
    createtxt: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    nottxt: {
        fontSize: 12,
        color: "#D2D2D2",
    },
    buttonContainer : {
        display: "flex",
        width: "83%",
        height: "7%",
        marginLeft: "7.5%",
        marginTop: "10%",
    }
});
