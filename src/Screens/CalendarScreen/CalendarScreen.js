import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import {BlurView} from "expo-blur";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';



export default function App( { navigation, route }) {
    const [displaydayEvents, setDisplaydayEvents] = useState(0);
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet","Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const dayName = ["lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    const today = new Date();
    const [day, setDay] = useState(today.getDate());
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [startDayInput, setStartDayInput] = useState("");
    const [startHourInput, setStartHourInput] = useState("");
    const [endHourInput, setEndHourInput] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [dayofweek, setDayofweek] = useState((today.getDay()) - 1 % 7);
    const [maxdayinmonth, setMaxdayinmonth] = useState(new Date(year, month + 1, 0).getDate());
    const [firstdayinmonth, setFirstdayinmonth] = useState((new Date(year, month, 1).getDay()) - 1 % 7);
    const [prevmonth, setPrevmonth] = useState(month - 1);
    const dbRef = ref(getDatabase());
    const [events, setEvents] = useState([{
        name: "meeting Nicole",
        year: 2023,
        month: 8,
        day: 12,
        hourstart: 10,
        minstart: 30,
        hourend: 12,
        minend: 30,
    }]);

    async function getotherinfo() {
        try {
          let snapshot = await get(child(dbRef, `users/${route.params.id}/event`));
          snapshot = snapshot.val();
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
        getotherinfo();
    }
    , []);

    useEffect(() => {
        console.log(events);
        if (events.length > 0)
            setcities();
    }, [events]);

    async function setcities(d)
    {
        try {
            for (let i = 0; i < events.length; i++) {
                if (events[i].minend == undefined)
                    events[i].minend = 0;
                if (events[i].minstart == undefined)
                    events[i].minstart = 0;
                console.log(events[i]);
                await set(ref(getDatabase(firebase), `users/${route.params.id}/event/${i}`), events[i]);
            }
        } catch(e) {
            console.log(e);
        }
    }

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
            week.push(<View style={styles.containerdaybefore}><Text style={styles.daybefore}>{prevMonthmaxday - firstdayinmonth + i + 1}</Text></View>)
        }
        for (let i = 0; i < maxdayinmonth; i++) {
            if (week.length == 7) {
                days.push(week)
                week = [];
            }
            if (year == today.getFullYear() && month == today.getMonth() && i + 1 == today.getDate())
            week.push(<TouchableOpacity onPress={() => setDisplaydayEvents(i + 1)} style={styles.containerdaytoday}><Text style={styles.daytoday}>{i + 1}</Text></TouchableOpacity>)
            else
            week.push(<TouchableOpacity onPress={() => setDisplaydayEvents(i + 1)} style={styles.day}><Text>{i + 1}</Text></TouchableOpacity>)
        }
        let i = 1;
        while (week.length < 7) {
            week.push(<View style={styles.containerdaybefore}><Text style={styles.daybefore}>{i}</Text></View>)
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

    const handleDataInput = (input, setter) => {
        let newText = input.replace(/\D/g, '');

        if (newText.length >= 3) {
            newText = newText.substring(0, 2) + '/' + newText.substring(2);
        }
        if (newText.length >= 6) {
            newText = newText.substring(0, 5) + '/' + newText.substring(5, 9);
        }
        setter(newText);
    }

    const submitEvent = () => {
        console.log(startDayInput, startHourInput, endHourInput)
        const [startDay, startMonth, startYear] = startDayInput.split('/').map(Number);
        const [startHour, startMin] = startHourInput.split(':').map(Number);
        const [endHour, endMin] = endHourInput.split(':').map(Number);

        const newEvent = {
            name: eventTitle,
            year: startYear,
            month: startMonth - 1,
            day: startDay,
            hourstart: startHour,
            minstart: startMin,
            hourend: endHour,
            minend: endMin,
        };

        setEvents([...events, newEvent]);
        setEventTitle("");
        setStartDayInput("");
        setStartHourInput("");
        setEndHourInput("");
        setModalVisible(false)
    };

    useEffect(() => {
    }, [displaydayEvents]);

  return (
    <GestureRecognizer
    onSwipe={(direction, state) => onSwipe(direction, state)}
    config={config}
    style={{flex: 1}}>
    <View style={styles.container}>
        <View style={styles.calendar}>
            <View style={styles.topcontainer}>
                <TouchableOpacity style = {styles.button} onPress={() => prevm()}>
                    <Image source={require('../../../assets/arrowleft.png')} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style = {styles.month}>{monthNames[month]}</Text>
                    <Text style = {styles.year}>{year}</Text>
                </View>
                <TouchableOpacity style = {styles.button} onPress={() => nextm()}>
                    <Image source={require('../../../assets/arrowright.png')} style={{width: 20, height: 20}}/>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: "colum", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                {draw().map((week, index) => {
                    return (
                        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                            {week}
                        </View>
                    )
                })}
            </View>
        </View>
        {events.map((event, index) => {
                if (event.year == year && event.month == month && event.day == displaydayEvents) {
                    return (
                        <View style={styles.totaltask}>
                            <View style={styles.leftbar}/>
                            <View style={styles.task}>
                                <Text style={styles.taskname}>{event.name}</Text>
                                <View style={styles.taskhour}>
                                    <Text style={styles.hourtext}>{event.hourstart}:{event.minstart}</Text>
                                    <Text style={styles.hourtext}>-{event.hourend}:{event.minend}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }
            }
        )}
        <TouchableOpacity style={styles.eventbutton} onPress={() => setModalVisible(true)}>
            <Image source={require('../../../assets/add.png')} style={styles.addicon}/>
            <Text style={styles.addtext}>New event</Text>
        </TouchableOpacity>
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(!isModalVisible);
            }}
        >
            <BlurView
                intensity={20}
                tint="dark"
                style={styles.modal}
            >
                <View style = {styles.card}>
                    <Text style = {styles.cardtitle}>New Event</Text>
                    <Text style = {styles.citytitle}>Event Title</Text>
                    <TextInput
                        placeholder="Enter new event"
                        value={eventTitle}
                        onChangeText={(text) => setEventTitle(text)}
                        style = {styles.addressform}
                        placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                    />
                    <Text style = {styles.citytitle}>Date Information</Text>
                    <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "80%"}}>
                        <TextInput
                            placeholder="Start Date"
                            style = {styles.dateform}
                            value={startDayInput}
                            onChangeText={(text) => handleDataInput(text, setStartDayInput)}
                            placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                            maxLength={10}
                        />
                    </View>
                    <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "80%"}}>
                        <TextInput
                            placeholder="Start Hour"
                            value={startHourInput}
                            onChangeText={(text) => setStartHourInput(text)}
                            maxLength={5}
                            style = {styles.dateform}
                            placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                        />
                        <TextInput
                            placeholder="End Hour"
                            value={endHourInput}
                            onChangeText={(text) => setEndHourInput(text)}
                            maxLength={5}
                            style = {styles.dateform}
                            placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                        />
                    </View>
                    <View style = {styles.buttoncontainer}>
                        <TouchableOpacity style = {styles.cancelbutton} title="Cancel" onPress={() => setModalVisible(false)}>
                            <Text style = {{color: "#000000"}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.savebutton} title="Save" onPress={submitEvent} >
                            <Text style = {{color: "#fff", fontWeight: "400"}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
        </Modal>
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
    calendar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        borderRadius: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "#9CA3AF",
        marginBottom: "5%",
    },
    topcontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
    },
    containerdaybefore: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    daybefore: {
        color: "#949494",
    },
    day: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    containerdaytoday: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ededed",
        borderRadius: 10,
    },
    daytoday: {
        color: "#6EE7B7",
        fontWeight: "bold",
    },
    month: {
        fontSize: 18,
        fontWeight: "400",
        color: "#979CA4",
    },
    year: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6EE7B7",
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "40%",
    },
    totaltask: {
        display: "flex",
        flexDirection: "row",
        width: "95%",
        marginBottom: "2%",
    },
    task: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(54, 124, 254, 0.2)",
        width: "95%",
        borderRadius: 3,
        paddingHorizontal: "2%",
        paddingVertical: "1%",
    },
    taskname: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#367CFE",
    },
    taskhour: {
        display: "flex",
        flexDirection: "row",
    },
    hourtext: {
        color: "#367CFE",
        fontSize: 12,
        fontWeight: "500",
    },
    leftbar: {
        width: "1%",
        borderRadius: 4,
        backgroundColor: "#367CFE",
        marginRight: "1%",
    },
    eventbutton: {
        top: "92%",
        right: "5%",
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#35BC88',
        height: 50,
        width: "35%",
        borderRadius: 10,
        paddingHorizontal: "5%",
    },
    addicon: {
        width: '20%',
        height: '70%',
        resizeMode: 'contain',
    },
    addtext: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    modal: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressform: {
        width: "80%",
        borderRadius: 5,
        padding: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        marginBottom: 20,
    },
    dateform: {
        width: "48%",
        borderRadius: 5,
        padding: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        marginBottom: 20,
    },
    card: {
        width: "80%",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#EAEAEA",
        borderRadius: 15,
        paddingVertical: 20,
    },
    buttoncontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
    },
    savebutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#2FDB73",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
    },
    cancelbutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#EAEAEA",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
    },
    cardtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: "80%",
        marginBottom: 30,
    },
    citytitle: {
        fontSize: 14,
        color: "#636363",
        fontWeight: '400',
        width: "80%",
        marginBottom: 10,
    },
});