
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

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
        SetToken(JSON.stringify(responseData.access_token))
      })
  }

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    backgroundColor: '#D7E5FF',
    display: "flex",
    flexDirection: "column",
  },
  topcircle : {
    height: "48.7%",
    width: "106%",
    borderRadius: 2000,
    backgroundColor: '#9BBEFD',
    position: "absolute",
    top: -300,
    left: -163,
    zIndex: 3,
  },
  middlecircle : {
    zIndex: 2,
    height: "100%",
    width: "212%",
    borderRadius: 2000,
    backgroundColor: '#367CFE',
    position: "absolute",
    top: -530,
    left: -184,
  },
  bottomcontainer : {
    zIndex: 1,
    height: "48.7%",
    width: "106%",
    borderRadius: 2000,
    backgroundColor: '#9BBEFD',
    position: "absolute",
    top: 10,
    left: 235,
  },
  titlecontainer: {
    zIndex: 10,
    top: "17%",
    left: "10%"
  },
  title :{
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  form :{
    marginLeft: "10%",
    marginTop: '70%',
    zIndex: 11,
  },
  txtinput: {
    marginVertical: 10,
    fontWeight: "bold",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius : 20,
    width: "90%"
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
  },
  arrow: {
    width: 64,
    height: 64,
    borderRadius: 1000,
    backgroundColor: "#367CFE"
  },
  buttoncontainer : {
    display: "flex",
    flexDirection: "row",
    marginTop: "20%",
    justifyContent: "space-around"
  },
  buttontxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  downbluebutton: {
    width: 100,
    height: 20,
    backgroundColor: "red"
  }
});