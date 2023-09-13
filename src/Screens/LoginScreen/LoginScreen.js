
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';

export default function App( { navigation }) {
  const dbRef = ref(getDatabase());
  const [email, SetEmail] = useState("theoltc@gmail.com")
  const [password, SetPassword] = useState("Charlie.02")
  const [token, SetToken] = useState("")


  async function getcompagnyWidgets(id) {
    try {
      let snapshot = await get(child(dbRef, `users/${id}/cmp`));
      snapshot = snapshot.val();
      if (snapshot != null) {
        navigation.navigate("Home", {id: id, code: snapshot.compagny})
      }
      else {
        navigation.navigate('Code', { id: id});
      }
    } catch(e) {
        console.log(e)
    }
}

  function login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          getcompagnyWidgets(userCredential.user.uid)
      })
      .catch((error) => {
          console.log(error);
      })
    return
    fetch("https://masurao.fr/api/employees/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "X-Group-Authorization": "UkPEzS4kSZu07iSS2d2l4OjA4PDfNiGy",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        SetToken(JSON.stringify(responseData.access_token))
      })
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['rgba(0, 0,0,0.7)', 'rgba(0, 154, 117, 1)']}
        style={styles.background}
        />
      <View style = {styles.titlecontainer}>
        <Text style = {styles.title}>Welcome{"\n"} Back</Text>
      </View>
      <View style = {styles.form}>
        <TextInput style = {styles.txtinput} value={email} placeholder='Your Email' onChangeText={(txt) => SetEmail(txt)}/>
        <TextInput style = {styles.txtinput} value={password} placeholder='Password' onChangeText={(txt) => SetPassword(txt)}/>
      </View>
      <View style = {styles.arrowcontainer}>
        <Text style = {styles.signinText}>Sign in</Text>
        <TouchableOpacity onPress={() => login()}>
          <View style = {styles.arrow}></View>
        </TouchableOpacity>
      </View>
      <View style = {styles.buttoncontainer}>
        <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
          <Text style = {styles.buttontxt}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style = {styles.buttontxt}>Forgot Passwords</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.topcircle}></View>
      <View style = {styles.middlecircle}></View>
      <View style = {styles.bottomcontainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
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
  topcircle : {
    height: "48.7%",
    width: "106%",
    borderRadius: 2000,
    backgroundColor: '#5C8374',
    position: "absolute",
    top: -300,
    left: -163,
    zIndex: 3,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  middlecircle : {
    zIndex: 2,
    height: "100%",
    width: "212%",
    borderRadius: 2000,
    backgroundColor: '#183D3D',
    position: "absolute",
    top: -530,
    left: -184,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
  },
  bottomcontainer : {
    zIndex: 1,
    height: "48.7%",
    width: "106%",
    borderRadius: 2000,
    backgroundColor: '#93B1A6',
    position: "absolute",
    top: 10,
    left: 235,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
  },
  titlecontainer: {
    zIndex: 10,
    marginTop: "35%",
    marginLeft: "17.2%",
  },
  title : {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  form :{
    marginLeft: "10%",
    marginTop: '30%',
    zIndex: 11,
  },
  txtinput: {
    marginVertical: 10,
    fontWeight: "bold",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius : 20,
    width: "90%",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
  },
  arrowcontainer : {
    marginTop: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  signinText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  arrow: {
    width: 64,
    height: 64,
    borderRadius: 1000,
    backgroundColor: "#183D3D",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
  },
  buttoncontainer : {
    display: "flex",
    flexDirection: "row",
    marginTop: "17%",
    justifyContent: "space-around"
  },
  buttontxt: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  downbluebutton: {
    width: 100,
    height: 20,
    backgroundColor: "red"
  }
});