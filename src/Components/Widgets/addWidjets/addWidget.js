import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


class CalendarBig extends Component {
    constructor(props) {
        super(props);
        this.activity = ""
    }
    render() {
        return (
            <>
            {this.props.open == false ? <TouchableOpacity onPress={() => this.props.toopen()} style = {styles.roundstyle}></TouchableOpacity> : (
            <TouchableOpacity onPress={() => this.props.toopen()} style = {styles.screen}>
                <View style={styles.menustyle}>
                    {this.activity == "" ? (
                        <>
                        <TouchableOpacity onPress={() => this.activity = "Meteo"} style = {styles.activity}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.activity = "calendar"} style = {styles.activity}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.activity = "task"} style = {styles.activity}></TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity onPress={() => this.props.newwidget(this.activity, "small")} style = {styles.type}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.newwidget(this.activity, "medium")} style = {styles.type}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.newwidget(this.activity, "big")} style = {styles.type}></TouchableOpacity>
                        </>
                    )}
                    </View>
                </TouchableOpacity>
            )}
            </>
        )
    }
}

export default CalendarBig;

const styles = StyleSheet.create({
    roundstyle : {
        height: "6%",
        width: "12%",
        borderRadius: 200,
        backgroundColor: "orange",
        position: "absolute",
        opacity: 1,
        top: "85%",
        left: "85%",
    },
    menustyle : {
        height: "50%",
        width: "70%",
        backgroundColor: "red",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        opacity: 1,
        top: "47%",
        left: "25%",
    },
    activity : {
        padding: 10,
        height: "10%",
        width: "25%",
        backgroundColor: "blue",
    },
    type : {
        padding: 10,
        height: "10%",
        width: "25%",
        backgroundColor: "green",
    },
    screen : {
        height: "100%",
        width: "100%",
    }
})