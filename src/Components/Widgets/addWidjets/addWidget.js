import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { set } from "firebase/database";


class CalendarBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity : ""
        }
    }
    setActivity = (newActivity) => {
        this.setState({ activity: newActivity });
    }

    sendActivity = (size) => {
        this.props.newwidget(this.state.activity, size);
        setActivity("");
    }
    render() {
        return (
            <>
            {this.props.open == false ? <TouchableOpacity onPress={() => this.props.toopen()} style = {styles.roundstyle}></TouchableOpacity> : (
            <TouchableOpacity onPress={() => this.props.toopen()} style = {styles.screen}>
                <TouchableOpacity onPress={() => this.setActivity("")} style={styles.menustyle}>
                {this.state.activity == "" ? (
                        <>
                        <TouchableOpacity onPress={() => this.setActivity("Meteo")} style = {styles.activity}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setActivity("Calendar")} style = {styles.activity}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setActivity("Task")} style = {styles.activity}></TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity onPress={() => this.props.newwidget(this.state.activity, "small")} style = {styles.type}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.newwidget(this.state.activity, "medium")} style = {styles.type}></TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.newwidget(this.state.activity, "big")} style = {styles.type}></TouchableOpacity>
                        </>
                    )}
                    </TouchableOpacity>
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
        top: "30%",
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