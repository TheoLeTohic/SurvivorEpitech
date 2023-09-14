import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, MeteoSmall, TaskSmall, CalendarSmall, CalendarBig, MeteoBig, AddWidget } from '../../Components/index';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../firebase/config';
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default function App( { navigation, route }) {
  const api = "5e5ba64ce2bba79dba8420c77f1ced3c"
  const compagny = route.params.code
  console.log(compagny)

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [city, setCity] = useState(["Barcelona", "Paris", "London"])
  const [cityweather, setCityWeather] = useState([])
  const [weather, Setweather] = useState()
  const [cityIndex, setCityIndex] = useState(1)
  const [temp, setTemp] = useState(false)
  const [newopen, setNewopen] = useState(false)
  const [autorizewidgets, setAutorizewidgets] = useState([])

  function push() {
    setTemp(!temp)
  }



  async function getcompagnyWidgets() {
    try {
      let snapshot = await get(child(dbRef, `factory/${compagny}/autorizewidgets`));
      snapshot = snapshot.val();
      console.log("snapshot")
      console.log(snapshot)
      const tmp = Object.keys(snapshot);
      let objectlist = [];
      for (const obj of tmp) {
        objectlist.push(snapshot[obj]);
      }
      objectlist = objectlist[0].split(",");
      setAutorizewidgets(objectlist);
    } catch(e) {
      setAutorizewidgets("error");
    }
  }
  

  useEffect(() => {
    getwidgets()
    getcompagnyWidgets()
  }, [])

  useEffect(() => {
    if (autorizewidgets.length > 0 && allwidgets.length > 0) {
      const tmp = [];
      for (const widget of allwidgets) {
        console.log(widget.name)
        console.log(autorizewidgets)
        console.log(autorizewidgets.includes(widget.name))
        if (autorizewidgets.includes(widget.name)) {
          tmp.push(widget);
        }
      }
      console.log("tmp")
      console.log(tmp)
      SetAllWidgets(tmp);
    }
    console.log("useeffect")
    console.log(allwidgets)
  }, [autorizewidgets, allwidgets])


  function remove(id) {
    const tmp = allwidgets.filter((item) => item.index != id);  
    SetAllWidgets(tmp);
    //put all the widgets in the database
  }

  const fetchWeather = (index) => {
    let aaa = weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city[index]}&appid=97738c75467adb40204f72417c447761&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((json) => {
      aaa.push(json)
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
  const [allwidgets, SetAllWidgets] = useState([])

  async function getwidgets() {
    try {
      let snapshot = await get(child(dbRef, `users/${route.params.id}/widgets`));
      snapshot = snapshot.val();
      const tmp = Object.keys(snapshot);
      let objectlist = [];
      for (const obj of tmp) {
        objectlist.push(snapshot[obj]);
      }
      SetAllWidgets(objectlist);
    } catch(e) {
      SetAllWidgets("error");
    }
  }

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
    const tmp = allwidgets;
    tmp.push({name: activity, type: type, index: allwidgets.length})
    SetAllWidgets(tmp);
  }

  async function getinfoindatabase() {
    try {
      let snapshot = await get(child(dbRef, `users/gyst5lXi27NwEGKjzLKVl6yDaOt1/todo`));
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
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
    getinfoindatabase()
  }, [])

  //useEffect(() => {
  //}, [temp])

  useEffect(() => {
  }, [cityweather])

  useEffect(() => {
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



  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1}}>
      <ScrollView style = {styles.allwidgets}>
      {allwidgets.map((item, index) => (
        console.log(item.name),
        <View key={index} style = {styles.test}>
          {item.name == "Calendar" && item.type == "small" ? <CalendarBig callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null}
          {item.name == "Meteo" && item.type == "big" ? <MeteoBig city = {city} cityweather = {cityweather[cityIndex]} cityindex = {cityIndex} callback = {push} click = {temp}remove = {remove} id = {item.index}/> : null}
          {item.name == "Calendar" && item.type == "big" ? <CalendarSmall callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null}

          {item.name == "duo" ? <View style = {styles.orga}>
              {item.content.map((items, indexs) => (
                items.name == "Meteo" ? <MeteoSmall city = {city} cityweather = {cityweather[cityIndex]} cityindex = {cityIndex} callback = {push} click = {temp} remove = {remove} id = {item.index}/> : null
              ))}
            </View> : null}
        </View>
        ))}
        <View style = {styles.orga}>
        <View style = {{height: 168, width: "45%", borderRadius: 20, marginTop: 20}}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
        </View>
        </View>
        <View style = {{height: 200}}></View>
      </ScrollView>
      <AddWidget newwidget = {newwidget} open = {newopen} toopen = {othernewopen}></AddWidget>
      <NavBar navigation = {navigation} open = {newopen} toopen = {othernewopen} index = {4} id = {route.params.id} code = {route.params.code} me = {route.params.me}></NavBar>
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
    marginTop: "20%",
    paddingTop: 10,
    height: "80%",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});