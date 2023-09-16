
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { firebase } from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get, set } from "firebase/database";

export default function App( { navigation, route }) {
  const [number, setNumber] = useState(1)
  const [me, setMe] = useState(route.params.me)
  const [state, setState] = useState("")
  const dbRef = ref(getDatabase());

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

  async function getcompagnyWidgets(id) {
    try {
      let snapshot = await get(child(dbRef, `users/${id}`));
      snapshot = snapshot.val();
      console.log(snapshot)
      if (snapshot != null)
        navigation.navigate("Payment", {id: id, code: state, me: snapshot})
    } catch(e) {
        console.log(e)
    }
  }

  function setCompagnytouser(nbr) {
      set(ref(getDatabase(firebase), 'users/' + route.params.id + '/cmp'), {
          compagny: nbr,
          status: true,
      });
      const tmp = route.params.me
      tmp.cmp = {compagny: nbr, status: true}
      setMe(tmp)
      set(ref(getDatabase(firebase), 'users/' + route.params.id + '/role'), {
        role: "admin",
    });
  }

  function createCompagny() {
    set(ref(getDatabase(firebase), 'factory/' + state), {
        compagny: state,
        type: 1,
        maxmembers: 10,
        members: 1,
        autorizewidgets: {autorizewidgets: "Calendar,Meteo,Task,duo,Rec"},
        memberList: {"0": {id: route.params.id, name: "Theo", role: "admin"}},
    });
    setCompagnytouser(state)
    getcompagnyWidgets(route.params.id)
  }

  function generateRandomNumber () {
    // Generate a random number between 1000 and 9999
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    setState(randomNumber);
  };

  useEffect(() => {
    generateRandomNumber();
  }
  , []);

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
          <View style = {styles.square}>
            <Text style={styles.plantitle}>Standard</Text>
            <View style={styles.planpricecontainer}>
              <Text style={styles.plandollar}>$</Text>
              <Text style={styles.planprice}>50</Text>
              <Text style={styles.planmonth}>/ Month</Text>
            </View>
            <View style={styles.planfeaturescontainer}>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Up to 50 Employees</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Access to Basic Gallery</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Standard Widgets</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Basic Support</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/no.png')} />
                <Text style={styles.planfeature}>Basic Admin Page</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/no.png')} />
                <Text style={styles.planfeature}>Chat Page</Text>
              </View>
            </View>
          </View>
          <View style = {styles.squareside}></View>
        </>
        : null}
        {number === 2 ?
        <>
          <View style = {styles.squaresideother}></View>
          <View style = {styles.squaresecond}>
            <Text style={styles.plantitle}>Premium</Text>
            <View style={styles.planpricecontainer}>
              <Text style={styles.plandollar}>$</Text>
              <Text style={styles.planprice}>120</Text>
              <Text style={styles.planmonth}>/ Month</Text>
            </View>
            <View style={styles.planfeaturescontainer}>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Up to 200 Employees</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Access to Search Filters</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Medium Widgets</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>24h delay Support</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/no.png')} />
                <Text style={styles.planfeature}>Limited Amount of messages</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/no.png')} />
                <Text style={styles.planfeature}>Basic Admin Page</Text>
              </View>
            </View>
          </View>
          <View style = {styles.squareside}></View>
        </>
        : null}
        {number >= 3 ?
        <>
          <View style = {styles.squaresideother}></View>
          <View style = {styles.squaresecond}>
            <Text style={styles.plantitle}>Extreme</Text>
            <View style={styles.planpricecontainer}>
              <Text style={styles.plandollar}>$</Text>
              <Text style={styles.planprice}>250</Text>
              <Text style={styles.planmonth}>/ Month</Text>
            </View>
            <View style={styles.planfeaturescontainer}>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Unlimited Employees</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Fully Usable Admin Page</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>Access to every Widget</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>24h/7 Support</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/yes.png')} />
                <Text style={styles.planfeature}>No Limit for Messages</Text>
              </View>
              <View style={styles.planfeaturecontainer}>
                <Image style={styles.planfeatureimage} source={require('../../../assets/no.png')} />
                <Text style={styles.planfeature}>Multiple Profile Pictures</Text>
              </View>
            </View>
          </View>
        </>
        : null}
      </View>
      </GestureRecognizer>
      <TouchableOpacity onPress={() => createCompagny()} style = {styles.buttonsubmit}>
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
        top: "15%",
        left: "16.2%"
    },
    title :{
        fontSize: 50,
        color: "#fff",
        fontWeight: "bold",
    },
    form: {
        marginLeft: "-10%",
        marginTop: "50%",
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "120%",
        height: "55%",
    },
    square: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        top: "89%",
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
    plantitle: {
        marginVertical: "6%",
        fontSize: 30,
        fontWeight: "bold",
    },
    planpricecontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    plandollar: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#55BE96",
        marginRight: "2%",
    },
    planprice: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#55BE96",
    },
    planmonth: {
        marginLeft: "5%",
        fontSize: 16,
        fontWeight: "300",
        color: "#9C9C9C",
    },
    planfeatureimage: {
        width: 20,
        height: 20,
    },
    planfeaturescontainer: {
        width: "85%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "10%",
    },
    planfeaturecontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "6%",
    },
    planfeature: {
        marginLeft: "8%",
        fontWeight: "400",
    }
});