import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from '../..//firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import { Path, Svg } from 'react-native-svg';
import { useState } from 'react';
import { getDatabase, ref, child, get, set } from "firebase/database";


export default function App({ navigation }) {
    const auth = getAuth();
    const db = getDatabase(firebase);
    const [user, setUser] = useState("test");
    const [email, setEmail] = useState("testmail@gmail.com");
    const [password, setPassword] = useState("Charlie.02");
    const [name, setName] = useState("test");
    const [surname, setSurname] = useState("test");
    const [Job, setJob] = useState("test");
    const dbRef = ref(getDatabase());

    function createAccount(idco) {
        set(ref(db, 'users/' + idco), {
            name: name,
            email: {
                email: email,
            },
            surname: surname,
            idConnect: idco,
            job: Job,
            phone: {
                phone: "",
            },
            widgets: {
                0: {
                    name: "Calendar",
                    type: "small",
                    id: 0,
                },
                1: {
                    name: "Calendar",
                    type: "big",
                    id: 1,
                }
            },
            address: {
                0: {
                    main: "Rue de la paix",
                    sub: "75000 Paris",
                },
            },
            todo: {
                0: {
                    name: "Test",
                    done: false,
                },
            },
            role: {
                role: "member",
            },
          });

    }

    async function getcompagnyWidgets(id) {
        try {
          let snapshot = await get(child(dbRef, `users/${id}`));
          snapshot = snapshot.val();
          console.log(snapshot)
          if (snapshot != null && snapshot.cmp != null) {
            navigation.navigate("Home", {id: id, code: snapshot.cmp.compagny, me: snapshot})
          }
          else {
            navigation.navigate('Code', { id: id, name: name, me: snapshot});
          }
        } catch(e) {
            console.log(e)
        }
    }

    function register() {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            createAccount(userCredential.user.uid);
            getcompagnyWidgets(userCredential.user.uid);
        })
            .catch((error) => {
                console.log(error);
            }
            )
    }
    return (
        <View style={ styles.container }>
            <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['rgba(0, 0,0,0.7)', 'rgba(0, 154, 117, 1)']}
          style={styles.background}
          />
            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>Create{"\n"}Account</Text>
            </View>
            <View style={ styles.circle1 } />
            <View style={ styles.circle2 } />
            <View style={ styles.form } >
                <View style={{display: "flex", flexDirection: "row", height: "17%", width: "80%", justifyContent: "space-between", marginBottom: "5%"}} >
                <TextInput style={ styles.inputsmall } placeholder="Name" value={name} onChangeText={(txt) => setName(txt)}/>
                <TextInput style={ styles.inputsmall } placeholder="Surname" value={surname} onChangeText={(txt) => setSurname(txt)}/>
                </View>
                <TextInput style={ styles.input } placeholder="Your Email" value={email} onChangeText={(txt) => setEmail(txt)}/>
                <TextInput style={ styles.input } placeholder="Job" value={Job} onChangeText={(txt) => setJob(txt)}/>
                <TextInput style={ styles.input } secureTextEntry={true} placeholder="Password" value={password} onChangeText={(txt) => setPassword(txt)}/>
            </View>
            <View style={ styles.signup } >
                <Text style={ styles.signupText }>Sign Up</Text>
                <TouchableOpacity onPress={() => register()} style={ styles.circle3 } ><Svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M23.8535 7.64649L16.3535 0.146496C16.1582 -0.048832 15.8418 -0.048832 15.6465 0.146496C15.4512 0.341824 15.4512 0.65823 15.6465 0.853511L22.293 7.50001H0.500015C0.22364 7.50001 0 7.72365 0 8.00002C0 8.2764 0.22364 8.50004 0.500015 8.50004H22.293L15.6465 15.1465C15.4512 15.3418 15.4512 15.6582 15.6465 15.8535C15.7441 15.9511 15.8721 16 16 16C16.1279 16 16.2559 15.9511 16.3536 15.8535L23.8535 8.3535C24.0488 8.15822 24.0488 7.84182 23.8535 7.64649Z" fill="white"/>
</Svg></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={ styles.signin } >
                <Text style={ styles.signinText }>Sign In</Text>
            </TouchableOpacity>
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
        zIndex: 10,
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
        borderRadius: 20000,
        backgroundColor: '#183D3D',
        top: -414,
        left: -284,
    },
    circle2: {
        backgroundColor: '#93B1A6',
        position: 'absolute',
        width: '122.4%',
        height: '49.01477%',
        borderRadius: 459 / 2,
        top: 579,
        left: 154,
    },
    circle3: {
        backgroundColor: '#183D3D',
        width: 64,
        height: 64,
        borderRadius: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    inputsmall: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingLeft: 30,
        marginVertical: 10,
        width: '45%',
        height: '100%',
    },
    signup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: "25%",
        marginRight: 30,
    },
    signupText: {
        fontSize: 32,
        marginRight: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: '#FFF',
    },
    signin: {
        display: 'flex',
        left: '65%',
        top: '9%',
    },
    signinText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: '#FFF',
    },
    rectangle1: {
        backgroundColor: '#367CFE',
        width: 75,
        height: 10,
    }

});
