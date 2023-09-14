import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';
import { Path, Svg } from 'react-native-svg';

export default function App( { navigation }) {
  const dbRef = ref(getDatabase());
  const [email, SetEmail] = useState("testmail@gmail.com")
  const [password, SetPassword] = useState("Charlie.02")
  const [token, SetToken] = useState("")


  async function getcompagnyWidgets(id) {
    try {
      let snapshot = await get(child(dbRef, `users/${id}`));
      snapshot = snapshot.val();
      console.log(snapshot)
      if (snapshot != null) {
        navigation.navigate("Home", {id: id, code: snapshot.cmp.compagny, me: snapshot})
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
          <TextInput style = {styles.txtinput} secureTextEntry={true} value={password} placeholder='Password' onChangeText={(txt) => SetPassword(txt)}/>
        </View>
        <View style = {styles.arrowcontainer}>
          <Text style = {styles.signinText}>Sign in</Text>
          <TouchableOpacity onPress={() => login()}>
            <View style = {styles.arrow}><Svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M23.8535 7.64649L16.3535 0.146496C16.1582 -0.048832 15.8418 -0.048832 15.6465 0.146496C15.4512 0.341824 15.4512 0.65823 15.6465 0.853511L22.293 7.50001H0.500015C0.22364 7.50001 0 7.72365 0 8.00002C0 8.2764 0.22364 8.50004 0.500015 8.50004H22.293L15.6465 15.1465C15.4512 15.3418 15.4512 15.6582 15.6465 15.8535C15.7441 15.9511 15.8721 16 16 16C16.1279 16 16.2559 15.9511 16.3536 15.8535L23.8535 8.3535C24.0488 8.15822 24.0488 7.84182 23.8535 7.64649Z" fill="white"/>
</Svg></View>
          </TouchableOpacity>
        </View>
        <View style = {styles.buttoncontainer}>
          <TouchableOpacity onPress={() => {navigation.navigate("Register")}}>
            <Text style = {styles.buttontxt}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("Forget")}}>
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
    marginTop: "50%",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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