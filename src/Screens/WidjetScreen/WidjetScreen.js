import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, MeteoSmall, TaskSmall, CalendarSmall, CalendarBig, MeteoBig, AddWidget } from '../../Components/index';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../firebase/config';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default function App( { navigation }) {
  const api = "5e5ba64ce2bba79dba8420c77f1ced3c"

  const [city, setCity] = useState(["Barcelona", "Paris", "London"])
  const [cityweather, setCityWeather] = useState([])
  const [weather, Setweather] = useState()
  const [cityIndex, setCityIndex] = useState(1)
  const [temp, setTemp] = useState(false)
  const [newopen, setNewopen] = useState(false)

  function push() {
    console.log("push")
    setTemp(!temp)
    console.log(temp)
  }

  function remove(id) {
    const tmp = allwidgets.filter((item) => item.index != id);
    SetAllWidgets(tmp);
    console.log(tmp)
  }

  const fetchWeather = (index) => {
    let aaa = weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[index]}&appid=97738c75467adb40204f72417c447761&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((json) => {
      aaa.push(json)
      console.log(aaa)
      setCityWeather(aaa)
    })
    .catch((error) => {
      console.error(error);
    });

  }

  function othernewopen() {
    setNewopen(!newopen)
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

  function newwidget(activity, type) {
    console.log("newwidget")
    console.log(activity)
    console.log(type)
    const tmp = allwidgets;
    tmp.push({name: activity, type: type, index: allwidgets.length})
    SetAllWidgets(tmp);
  }

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
    console.log("useeffect")
    fetchWeather(0)
    fetchWeather(1)
    fetchWeather(2)
    getinfoindatabase()
  }, [])

  //useEffect(() => {
  //}, [temp])

  useEffect(() => {
    console.log("cityweather")
    console.log(cityweather[0])
    console.log(cityweather[1])
    console.log(cityweather[2])
  }, [cityweather])

  useEffect(() => {
    console.log("cityindex")
    console.log(cityIndex)
  }, [cityIndex])

  //useEffect(() => {
  //}, [object])

  //useEffect(() => {
    //console.log("useeffect")
    //console.log(allwidgets)
  //}, [allwidgets])

  //setTimeout(function callback(){
   // setCityIndex((cityIndex + 1) % city.length)
//},3000);


  const [allwidgets, SetAllWidgets] = useState([
    {
      name: "Calendar",
      type: "big",
      index: 0,
    },
    {
      name: "Meteo",
      type: "big",
      index: 1,
    },
    {
      name: "Task",
      type: "small",
      index: 2,
    },
    {
      name: "Meteo",
      type: "small",
      index: 3,
    },
  ])

  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1}}>
      <ScrollView style = {styles.allwidgets}>
      {allwidgets.map((item, index) => (
        <View key={index} style = {styles.test}>
          {item.name == "Calendar" && item.type == "big" ? <CalendarBig callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null}
          {item.name == "Meteo" && item.type == "big" ? <MeteoBig city = {city} cityweather = {cityweather[cityIndex]} cityindex = {cityIndex} callback = {push} click = {temp}remove = {remove} id = {item.index}/> : null}
          <View style = {styles.orga}>
            {item.name == "Task" && item.type == "small" ? <TaskSmall task = {object} callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null}
            {item.name == "Meteo" && item.type == "small" ? <MeteoSmall city = {city} cityweather = {cityweather} cityindex = {cityIndex} callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null}
          </View>
          {item.name == "Calendar" && item.type == "small" ? <CalendarSmall callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null}

        </View>
        ))}
        <View style = {{height: 200}}></View>
      </ScrollView>
      <AddWidget newwidget = {newwidget} open = {newopen} toopen = {othernewopen}></AddWidget>
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
    backgroundColor: '#fff',
    flexDirection: "row",
  },
  allwidgets : {
    paddingTop: 10,
    width: "100%",
    height: "100%",
  },
});