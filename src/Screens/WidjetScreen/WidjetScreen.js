import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, MeteoSmall, TaskSmall, CalendarSmall, CalendarBig, MeteoBig, AddWidget, RecipeSmall, ChessSmall, TwitterSmall } from '../../Components/index';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { WeatherApi } from '../../data/WeatherApi';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default function App( { navigation, route }) {
  const compagny = route.params.code
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [city, setCity] = useState(["Barcelona"])
  const [cityweather, setCityWeather] = useState([])
  const [cityIndex, setCityIndex] = useState(1)
  const [temp, setTemp] = useState(false)
  const [newopen, setNewopen] = useState(false)
  const [autorizewidgets, setAutorizewidgets] = useState([])
  const [events, setEvents] = useState([])

  function push() {
    setTemp(!temp)
  }

  async function getcompagnyWidgets() {
    try {
      let snapshot = await get(child(dbRef, `factory/${compagny}/autorizewidgets`));
      snapshot = snapshot.val();
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

async function getweather() {
  try {
    let cityData = await WeatherApi.fetchCityData(city);

    if (!cityData || cityData.length === 0) return;

    const lat = cityData[0].lat;
    const lon = cityData[0].lon;

    let [forecastData, currentWeatherData] = await Promise.all([
        WeatherApi.fetchForecastData(lat, lon),
        WeatherApi.fetchWeatherData(city)
    ]);
    setCityWeather(currentWeatherData);
} catch (error) {
    console.log('Error fetching weather data:', error);
}
}
  
  useEffect(() => {
    getweather()
    getwidgets()
    getcompagnyWidgets()
  }, [])

  useEffect(() => {
    if (autorizewidgets.length > 0 && allwidgets.length > 0) {
      const tmp = [];
      for (const widget of allwidgets) {
        if (autorizewidgets.includes(widget.name)) {
          tmp.push(widget);
        }
      }
      SetAllWidgets(tmp);
    }
  }, [autorizewidgets, allwidgets])


  function remove(id) {
    const tmp = allwidgets.filter((item) => item.index != id);  
    SetAllWidgets(tmp);
    try {
      set(child(dbRef, `users/${route.params.id}/widgets/${id}`), null);
    } catch(e) {
      console.log(e);
    }
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
      if (snapshot == null || snapshot === "" || snapshot === undefined || snapshot === "error" || snapshot === "null" || snapshot === "undefined" || snapshot === " ") {
        SetAllWidgets([]);
        return ;
      }
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
        break;
    }
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };


  function availablewidgets() {
    for (const widget of allwidgets) {
      console.log("widget", widget)
      if (widget.name == "duo" && widget.content.length < 2)
        return (true);
    }
    return (false);
  }

  function newwidget(activity, type) {
    console.log("newwidget")
    const tmp = [...allwidgets];
    try {
    if (type == "big" || type == "medium") {
      tmp.push({name: activity, type: type, index: allwidgets.length})
      set(child(dbRef, `users/${route.params.id}/widgets/${allwidgets.length}`), {name: activity, type: type, index: allwidgets.length});
    } else {
      console.log("availablewidgets", availablewidgets())
      if (availablewidgets() == false) {
        tmp.push({name: "duo", type: type, index: allwidgets.length, content: {0: {name: activity, type: type, index: "0"}}})
        set(child(dbRef, `users/${route.params.id}/widgets/${allwidgets.length}`), {name: "duo", type: type, index: allwidgets.length, content: {0: {name: activity, type: type, index: "0"}}});
      } else {
        for (const widget of tmp) {
          if (widget.name == "duo" && widget.content.length < 2) {
            widget.content.push({name: activity, type: type, index: widget.content.length})
            set(child(dbRef, `users/${route.params.id}/widgets/${widget.index}/content/${widget.content.length}`), {name: activity, type: type, index: widget.content.length});
          }
        }
      }
    }
    } catch(e) {
      console.log(e);
    }
    getwidgets()
  }

  async function getinfoindatabase() {
    try {
      let snapshot = await get(child(dbRef, `users/${route.params.id}/todo`));
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

  useEffect(() => {
  }, [cityweather])

  useEffect(() => {
  }, [cityIndex])

  useEffect(() => {
    console.log("allwidgets", allwidgets)
  }, [allwidgets])


  async function getevents() {
    try {
      let snapshot = await get(child(dbRef, `users/${route.params.id}/event`));
      snapshot = snapshot.val();
      if (snapshot == null || snapshot === "" || snapshot === undefined || snapshot === "error" || snapshot === "null" || snapshot === "undefined" || snapshot === " ") {
        setEvents([]);
        return ;
      }
      const events = [];
        for (const key in snapshot) {   
            events.push(snapshot[key]);
        }
      if (snapshot == null || snapshot === "" || snapshot === undefined || snapshot === "error" || snapshot === "null" || snapshot === "undefined" || snapshot === " ") {
        setEvents([]);
        return ;
      }
      setEvents(events);
    } catch(e) {
        setEvents([])
    }
}

useEffect(() => {
    getevents();
}
, []);

useEffect(() => {
}, [events]);


  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1}}>
      <ScrollView style = {styles.allwidgets}>
      {allwidgets.map((item, index) => (
        <View key={index} style = {styles.test}>
          {item.name == "Calendar" && item.type == "big" ? <CalendarBig callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation}/> : null}
          {item.name == "Meteo" && item.type == "big" ? <MeteoBig city = {city} cityweather = {cityweather} cityindex = {cityIndex} callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation} me = {route.params.id} code = {route.params.code} my = {route.params.me}/> : null}
          {item.name == "Calendar" && item.type == "small" ? <CalendarSmall callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation} event = {events} me = {route.params.id}/> : null}

          {item.name == "duo" ? <View style = {styles.orga}>
              {item.content.map((items, indexs) => (
                <>
                {/* {items.name == "Twitter" ? <TwitterSmall callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation}/> : null} */}
                {/* {items.name == "Chess" ? <ChessSmall callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation}/> : null} */}
                {items.name == "Meteo" ? <MeteoSmall city = {city} cityweather = {cityweather[cityIndex]} cityindex = {cityIndex} callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation}/> : null}
                {items.name == "Tasks" ? <TaskSmall callback = {push} click = {temp} remove = {remove} id = {item.index} task = {object} navigation = {navigation} me = {route.params.id}/> : null}
                {items.name == "Rec" ? <RecipeSmall callback = {push} click = {temp} remove = {remove} id = {item.index} navigation = {navigation}/> : null}
                {items.name == "Maps" ? <TouchableOpacity onLongPress={() => push()} style = {{height: 168, width: "45%", borderRadius: 20, marginTop: 20}}>
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
        </MapView></TouchableOpacity> : null}

                </>
              ))}
            </View> : null}
        </View>
        ))}
        <View style = {styles.orga}>
        
        </View>
        <View style = {{height: 300}}></View>
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