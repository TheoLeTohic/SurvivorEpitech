import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, MeteoSmall, TaskSmall, CalendarSmall, CalendarBig, MeteoBig } from '../../Components/index';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../firebase/config';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default function App( { navigation }) {
  const api = "5e5ba64ce2bba79dba8420c77f1ced3c"

  const [city, setCity] = useState(["Barcelona", "Paris", "London"])
  const [cityweather, setCityWeather] = useState([])
  const [cityIndex, setCityIndex] = useState(0)
  const [weather, setWeather] = useState({})

  const fetchWeather = (index) => {
    let aaa = []
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[index]}&appid=97738c75467adb40204f72417c447761&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((json) => {
      aaa.push(json)
    })
    .catch((error) => {
      console.error(error);
    });

    setCityWeather([...cityweather, aaa])
  }

  const [object, setObject] = useState([]);
  const dbRef = ref(getDatabase(firebase));

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
        break;
      case SWIPE_RIGHT:
        navigation.navigate("Home")
        break;
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  async function getinfoindatabase() {
    try {
      let snapshot = await get(child(dbRef, `users/Theo/todo`));
      snapshot = snapshot.val();
      const tmp = Object.keys(snapshot);
      let objectlist = [];
      for (const obj of tmp) {
        objectlist.push(snapshot[obj]);
      }
      setObject(objectlist);
    } catch(e) {
      setObject("error");
    }
  }
  useEffect(() => {
    getinfoindatabase()
  }, []);


  useEffect(() => {
    fetchWeather(0)
    getinfoindatabase()
  }, [])

  useEffect(() => {
    console.log(cityweather)
  }, [cityweather])

  useEffect(() => {
    if (weather.main)
      console.log(weather.main.temp)
  }, [weather])

  useEffect(() => {
  }, [object])

  setTimeout(function callback(){
    setCityIndex((cityIndex + 1) % city.length)
},3000);

  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1}}
    >
      <CalendarBig />
      <MeteoBig city = {city} cityweather = {cityweather} cityindex = {cityIndex}/>
      <CalendarSmall />
      <View style = {styles.orga}>
        <TaskSmall task = {object} />
        <MeteoSmall city = {city} cityweather = {cityweather} cityindex = {cityIndex}/>
      </View>

      <NavBar navigation={navigation} index = {4}/>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  orga : { 
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: "column",
  },
});