import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


class CalendarBig extends Component {
  constructor(props) {
    super(props);
    this.currentDay = new Date().getDate();
    this.day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    this.currentDayofWeek= new Date().getDay();
    this.actualday = this.currentDay - this.currentDayofWeek + 1
    console.log(this.actualday)
}
    render () {
        return (
          <TouchableOpacity style = {this.props.click == false ? styles.calendarbig : styles.calendarclick} onLongPress={ () => this.props.callback() }>
              {this.props.click == true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
            <View style = {styles.topcalendar}>
                {this.day.map((item, index) => (
                  <View key={index} style = {[styles.calendarday, index == this.currentDayofWeek - 1 ? styles.today : null]}>
                    <Text style = {[styles.day, index == this.currentDayofWeek - 1 ? styles.todaytxt : null]}>{item}</Text>
                    <Text style = {[styles.date, index == this.currentDayofWeek - 1 ? styles.todaydate : null]}>{this.actualday + index}</Text>
                    <View style = {styles.event}></View>
                  </View>
                ))}
              </View>
              <View style = {styles.bottomcalendar}>
                <View style = {[styles.eventday, styles.blueevent]}>
                  <View style = {styles.stt}></View>
                  <Text style = {styles.name}>Daily Standup</Text>
                  <View style = {styles.time}>
                    <Text style = {styles.hour}>10:00 AM</Text>
                    <Text style = {styles.minute}>11:00 AM</Text>
                  </View>
                
                </View>
                <View style = {[styles.eventday, styles.eventorange]}>
                  <View style = {styles.sttorange}></View>
                  <Text style = {styles.nameorange}>Daily Standup</Text>
                  <View style = {styles.time}>
                    <Text style = {styles.hourorange}>10:00 AM</Text>
                    <Text style = {styles.minuteorange}>11:00 AM</Text>
                  </View>
                
                </View>
                <View style = {[styles.eventday, styles.eventgreen]}>
                  <View style = {styles.sttgreen}></View>
                  <Text style = {styles.namegreen}>Daily Standup</Text>
                  <View style = {styles.time}>
                    <Text style = {styles.hourgreen}>10:00 AM</Text>
                    <Text style = {styles.minutegreen}>11:00 AM</Text>
                  </View>
                
                </View>
             
             </View>
          </TouchableOpacity>
        )
    }
}

export default CalendarBig;

const styles = StyleSheet.create({
  remover : {
    zIndex: 10,
        height: 20,
        width: 20,
        borderRadius: 200,
        backgroundColor: "orange",
        position: "absolute",
        opacity: 1,
        top: -10,
        left: -10,
   },
    calendarbig : {
        height: 200,
        width: "90%",
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 20,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
      },
      calendarclick : {
        height: 200,
        width: "90%",
        backgroundColor: 'red',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 20,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
      },
      topcalendar : {
        width: "100%",
        height: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      bottomcalendar : {
        width: "100%",
        height: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      },
      eventday : {
        height: 21,
        width: "95%",
        backgroundColor: "#C3D0F0",
        borderRadius: 3,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      name : {
        marginLeft: 10,
        fontSize: 9,
        fontWeight: "bold",
        color: "#367CFE",
      },
      stt : {
        height: 17,
        width: 5,
        borderRadius: 20,
        backgroundColor: "#367CFE",
        marginLeft: 4,
      },
      hour : {
        fontSize: 7,
        fontWeight: "bold",
        color: "#367CFE",
      },
      minute : {
        fontSize: 7,
        fontWeight: "bold",
        color: "#367CFE",
      },
      time : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "63%",
      },
    
      eventgreen : {
        backgroundColor: "#2fb42c38",
      },
      eventorange : {
        backgroundColor: "#ef842133",
      },
      blueevent : {
        backgroundColor: "#367dfe33",
      },
      nameorange : {
        marginLeft: 10,
        fontSize: 9,
        fontWeight: "bold",
        color: "#ef8421",
      },
      namegreen : {
        marginLeft: 10,
        fontSize: 9,
        fontWeight: "bold",
        color: "#2fb42c",
      },
      hourorange : {
        fontSize: 7,
        fontWeight: "bold",
        color: "#ef8421",
      },
      minuteorange : {
        fontSize: 7,
        fontWeight: "bold",
        color: "#ef8421",
      },
      hourgreen : {
        fontSize: 7,
        fontWeight: "bold",
        color: "#2fb42c",
      },
      minutegreen : {
        fontSize: 7,
        fontWeight: "bold",
        color: "#2fb42c",
      },
      sttorange : {
        height: 17,
        width: 5,
        borderRadius: 20,
        backgroundColor: "#ef8421",
        marginLeft: 4,
      },
      sttgreen : {
        height: 17,
        width: 5,
        borderRadius: 20,
        backgroundColor: "#2fb42c",
        marginLeft: 4,
      },
      calendarday : {
        height: 83,
        width: "12%",
        backgroundColor: "#ffffffd4",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      day : {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000a6",
        marginTop: 10,
        marginLeft: "22%",
      },
      date : {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginTop: 7,
        marginLeft: "37%",
      },
      event : {
        height: 6,
        width: 6,
        backgroundColor: "#367CFE",
        borderRadius: 20,
        opacity: 0.83,
        marginTop: 3,
        marginLeft: "41%",
      },
      daywithoutevent : {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000a6",
        marginTop: 0,
        marginLeft: "22%",
      },
      today : {
        backgroundColor: "#4E87F8",
      },
      todaytxt : {
        color: "#ffffffa1",
      },
      todaydate : {
        color: "#fff",
      },
    })