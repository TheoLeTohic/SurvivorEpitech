import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Path } from "react-native-svg";

class TaskSmall extends Component {
    render() {
        return (
          <TouchableOpacity style = {this.props.click == false ? styles.tasksmall : styles.tasksmallclick} onPress={() => this.props.navigation.navigate("ToDo", {list :this.props.task, id: this.props.me})} onLongPress={ () => this.props.callback() }>
              {this.props.click == true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
            <View style = { styles.tasksmalltop }>
              <Text style = { styles.tasksmalltxt }>Add Task</Text>
              <TouchableOpacity style = { styles.tasksmallplusbtn }>
                <Svg xmlns="http://www.w3.org/2000/Svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <Path d="M7 1V13" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                  <Path d="M1 7H13" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
              </TouchableOpacity>
            </View>
            <ScrollView style = { styles.tasksmallbottom }>
              {this.props.task.map((item, index) => (
                <View key={index} style = { styles.tasksmalltxtline }>
                  <View style = { styles.tasksmalltxtcircle }/>
                  <Text style = { styles.tasksmalltxtbottom }>{item.name}</Text>
                </View>
              ))
              }
              <Text style = { styles.tasksmalltxtadd }> more</Text>
            </ScrollView>
          </TouchableOpacity>
        );
    }

}

export default TaskSmall;

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
  tasksmallclick : {
    height: 168,
    width: "45%",
    backgroundColor: "red",
    borderRadius: 20,
    marginTop: 20,
  },

  calendarsmall : {
    height: 168,
    width: "45%",
    backgroundColor: "#ffffff7d",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tasksmall : {
    height: 168,
    width: "45%",
    backgroundColor: "#1695C7",
    borderRadius: 20,
    marginTop: 20,
  },
  tasksmalltop : {
    marginTop: "9.52%",
    marginLeft: "9.52%",
    marginRight: "9.52%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tasksmalltxt : {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  tasksmallplusbtn : {
    marginTop: 5,
  },
  tasksmallbottom : {
    display: "flex",
    marginLeft: "9.52%",
    marginRight: "9.52%",
    marginTop: "3%",
  },
  tasksmalltxtbottom : {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
    marginLeft: 5,
  },
  tasksmalltxtadd : {
    fontSize: 8,
    color: "#D3D3D3",
    marginLeft: "8%",

  },
  tasksmalltxtcircle : {
    height: 6,
    width: 6,
    borderRadius: 1999,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  tasksmalltxtline : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  calendardaysmall : {
    height: "30%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "15%",
    marginTop: "10%",
  },
  daywithouteventsmall : {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF0000",
  },
  datesmall : {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000cc",
    marginLeft: "5%",
  },
  calendareventsmall : {
    height: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  eventsmall : {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sttsmall : {
    height: 30,
    width: 5,
    borderRadius: 20,
    backgroundColor: "#367CFE",
    marginLeft: 4,
  },
  contentsmall : {
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    backgroundColor: "#C3D0F0",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "5%",
    borderRadius: 10,
  },
  namesmall : {
    fontSize: 10,
    fontWeight: "bold",
    color: "#367CFE",
  },
  timesmall : {
    fontSize: 8,
    fontWeight: "bold",
    color: "#367CFE",
  },
  
});