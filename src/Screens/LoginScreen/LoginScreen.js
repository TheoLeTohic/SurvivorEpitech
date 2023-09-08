
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App( { navigation }) {
  const [email, SetEmail] = useState("oliver.lewis@masurao.jp")
  const [password, SetPassword] = useState("password")
  const [token, SetToken] = useState("")

  function login() {
    navigation.navigate("Home")
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
        <TextInput style = {styles.txtinput} value={email} placeholder='Your Email' onChange={(txt) => SetEmail(txt)}/>
        <TextInput style = {styles.txtinput} value={password} placeholder='Password' onChange={(txt) => SetPassword(txt)}/>
      </View>
      <View style = {styles.arrowcontainer}>
        <Text style = {styles.signinText}>Sign in</Text>
        <TouchableOpacity onPress={() => login()}>
          <View style = {styles.arrow}></View>
        </TouchableOpacity>
      </View>
      <View style = {styles.buttoncontainer}>
        <TouchableOpacity>
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 20,
    zIndex: 0,
  },
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
    height: "150%",
    width: "300%",
    borderRadius: 10000,
    backgroundColor: '#183D3D',
    position: "absolute",
    top: -930,
    left: -350,
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
    top: "17%",
    left: "16.2%"
  },
  title :{
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  form :{
    marginLeft: "10%",
    marginTop: '75%',
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