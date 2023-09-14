import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


class CalendarBig extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Calendar")} style = {this.props.click == false ? styles.calendar : styles.calendarclick} onLongPress={ () => this.props.callback() }>
              {this.props.click == true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Mo</Text>
              <Text style = {styles.date}>1</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Tu</Text>
              <Text style = {styles.date}>2</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>We</Text>
              <Text style = {styles.date}>3</Text>
            </View>
            <View style = {[styles.calendarday, styles.today]}>
              <Text style = {[styles.daywithoutevent, styles.todaytxt]}>Th</Text>
              <Text style = {[styles.date, styles.todaydate]}>4</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Fr</Text>
              <Text style = {styles.date}>5</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Sa</Text>
              <Text style = {styles.date}>6</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.day}>Su</Text>
              <Text style = {styles.date}>7</Text>
              <View style = {styles.event}></View>
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

    calendarclick : {
      height: 100,
        width: "90%",
        backgroundColor: "red",
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    calendar : {
        height: 100,
        width: "90%",
        backgroundColor: "#F0F0F0",
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 10,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
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