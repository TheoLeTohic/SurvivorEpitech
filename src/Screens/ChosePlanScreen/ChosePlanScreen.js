
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { set } from 'firebase/database';

export default function App( { navigation }) {
  const [number, setNumber] = useState(1)

  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {  
      case SWIPE_UP:
        console.log("up");
        break;
      case SWIPE_DOWN:
        console.log("down");
        break;
      case SWIPE_LEFT:
        setNumber(number + 1)
        if (number == 4)
          setNumber(3)
        break;
      case SWIPE_RIGHT:
        setNumber(number - 1)
        if (number == 0)
          setNumber(1)
        break;
    }
  }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };


  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['rgba(0, 0,0,0.7)', 'rgba(0, 154, 117, 1)']}
        style={styles.background}
        />
      <View style = {styles.titlecontainer}>
        <Text style = {styles.title}>Choose{"\n"} Plan</Text>
      </View>
      <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1, zIndex: 10}}>
      <View style = {styles.form}>
        {number <= 1 ?
        <>
          <View style = {styles.square}></View>
          <View style = {styles.squareside}></View>
        </>
        : null}
        {number == 2 ?
        <>
          <View style = {styles.squaresideother}></View>
          <View style = {styles.squaresecond}></View>
          <View style = {styles.squareside}></View>
        </>
        : null}
        {number >= 3 ?
        <>
          <View style = {styles.squaresideother}></View>
          <View style = {styles.squaresecond}></View>
        </>
        : null}
      </View>
      </GestureRecognizer>
      <TouchableOpacity onPress={() => navigation.navigate("Payment")} style = {styles.buttonsubmit}>
        <Text style = {styles.buttonsubmittext}>Confirm</Text>
      </TouchableOpacity>
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
    top: "20%",
    left: "16.2%"
  },
  title :{
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  form: {
    marginLeft: "-10%",
    marginTop: "60%",
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "120%",
    height: "45%",
  },
  square: {
    zIndex: 10,
    width: "60%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginLeft: "20%",
  },
  squareside: {
    marginLeft: "5%",
    zIndex: 10,
    width: "10%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  squaresideother: {
    marginLeft: "5%",
    zIndex: 10,
    width: "10%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  squaresecond: {
    zIndex: 10,
    width: "60%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginLeft: "5%",
  },
  buttonsubmit: {
    zIndex: 10,
    backgroundColor: "#55BE96",
    width: "70%",
    height: "8%",
    marginLeft: "15%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "85%",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: "#fff",
  },
  buttonsubmittext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});