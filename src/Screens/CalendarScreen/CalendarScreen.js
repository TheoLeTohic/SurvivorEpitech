import { ScrollView, StyleSheet, View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, MeteoSmall, TaskSmall, CalendarSmall, CalendarBig, MeteoBig, AddWidget } from '../../Components/index';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default function App( { navigation, route }) {
    const [displaydayEvents, setDisplaydayEvents] = useState(0);
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dayName = ["lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    const today = new Date();
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [dayofweek, setDayofweek] = useState((today.getDay()) - 1 % 7);
    const [maxdayinmonth, setMaxdayinmonth] = useState(new Date(year, month + 1, 0).getDate());
    const [firstdayinmonth, setFirstdayinmonth] = useState((new Date(year, month, 1).getDay()) - 1 % 7);
    const [prevmonth, setPrevmonth] = useState(month - 1);
    if (prevmonth < 0)
        setPrevmonth(11);
    const [prevMonthmaxday, setPrevMonthmaxday] = useState(new Date(year, prevmonth + 1, 0).getDate());

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
            navigation.goBack();
            break;
        }
      }

      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
    draw = () => {
        let days = [];
        let week = [];
        for (let i = 0; i < firstdayinmonth; i++) {
            week.push(<View style={styles.daybefore}><Text>{prevMonthmaxday - firstdayinmonth + i + 1}</Text></View>)
        }
        for (let i = 0; i < maxdayinmonth; i++) {
            if (week.length == 7) {
                days.push(week)
                week = [];
            }
            if (year == today.getFullYear() && month == today.getMonth() && i + 1 == today.getDate())
            week.push(<TouchableOpacity onPress={() => setDisplaydayEvents(i + 1)} style={styles.daytoday}><Text>{i + 1}</Text></TouchableOpacity>)
            else
            week.push(<TouchableOpacity onPress={() => setDisplaydayEvents(i + 1)} style={styles.day}><Text>{i + 1}</Text></TouchableOpacity>)
        }
        let i = 1;
        while (week.length < 7) {
            week.push(<View style={styles.daybefore}><Text>{i}</Text></View>)
            i++;
        }
        days.push(week)
        return days;
    }

    function prevm() {
        let test = month - 1;
        if (test < 0)
            test = 11;
        setFirstdayinmonth(new Date(year, test, 1).getDay() - 1);
        setMaxdayinmonth(new Date(year, test + 1, 0).getDate());
        setPrevMonthmaxday(new Date(year, test, 0).getDate());
        if (month - 1 < 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }

    }

    nextm = () => {
        let test = month + 1;
        if (test < 0)
            test = 11;
        setFirstdayinmonth(new Date(year, test, 1).getDay() - 1);
        setMaxdayinmonth(new Date(year, test + 1, 0).getDate());
        setPrevMonthmaxday(new Date(year, test, 0).getDate());
        if (month + 1 > 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }
    const event = [{
        name: "test",
        year: 2023,
        month: 8,
        day: 12,
        hourstart: 10,
        minstart: 30,
        hourend: 12,
        minend: 30,
    }
    ]

    useEffect(() => {
    }, [displaydayEvents]);

  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1}}>
    <View style={styles.container}>
        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
            <TouchableOpacity style = {styles.buttpn} onPress={() => prevm()}></TouchableOpacity>
            <Text style = {styles.month}>{monthNames[month]} {year}</Text>
            <TouchableOpacity style = {styles.buttpn} onPress={() => nextm()}></TouchableOpacity>
        </View>
        <View style={{flexDirection: "colum", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
            {draw().map((week, index) => {
                return (
                    <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                        {week}
                    </View>)})}
            </View>
            {event.map((event, index) => {
                if (event.year == year && event.month == month && event.day == displaydayEvents) {
                    return (
                        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                            <Text>{event.name}</Text>
                        </View>
                    )
                }
            }
            )}
    </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
    daybefore: {
        backgroundColor: 'red',
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    day: {
        backgroundColor: 'blue',
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttpn: {
        backgroundColor: 'green',
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    daytoday: {
        backgroundColor: 'yellow',
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});