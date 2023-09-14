import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


class CalendarBig extends Component {
    render() {
        return (
            <TouchableOpacity style = {this.props.click == false ? styles.calendar : styles.calendarclick} onLongPress={ () => this.props.callback() }>
              {this.props.click == true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
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
})