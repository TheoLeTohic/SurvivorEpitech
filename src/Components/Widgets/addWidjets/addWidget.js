import { Component } from "react";
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
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
        this.setActivity("");
    }
    render() {
        return (
            <>
            {this.props.open === false ? <TouchableOpacity onPress={() => this.props.toopen()} style = {styles.roundstyle}><Image resizeMode="contain" style= {{width: "90%", height: "100%"}} source={require("../../../../assets/plus.png")}/></TouchableOpacity> : (
            <TouchableOpacity onPress={() => this.props.toopen()} style = {styles.screen}>
                <Text style={styles.title}>Choose Widget</Text>
                <TouchableOpacity onPress={() => this.setActivity("")} style={styles.menustyle}>
                {this.state.activity === "" ? (
                        <>
                            <TouchableOpacity onPress={() => this.setActivity("Meteo")} style = {styles.activity}>
                                <Image source={require("../../../../assets/weather_icon.png")} style={styles.icon}/>
                                <Text style={styles.description}>Weather</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActivity("Calendar")} style = {styles.activity}>
                                <Image source={require("../../../../assets/calendar_icon.png")} style={styles.icon}/>
                                <Text style={styles.description}>Calendar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActivity("Tasks")} style = {styles.activity}>
                                <Image source={require("../../../../assets/tasks_icon.png")} style={styles.icon}/>
                                <Text style={styles.description}>Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActivity("Maps")} style = {styles.activity}>
                                <Image source={require("../../../../assets/maps_icon.png")} style={styles.icon}/>
                                <Text style={styles.description}>Maps</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setActivity("Rec")} style = {styles.activity}>
                                <Image source={require("../../../../assets/maps_icon.png")} style={styles.icon}/>
                                <Text style={styles.description}>Receipes</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style = {styles.test}>
                                <TouchableOpacity onPress={() => this.props.newwidget(this.state.activity, "small")} style = {styles.type}>
                                    <Text style={styles.size}>Small</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.newwidget(this.state.activity, "medium")} style = {styles.type}>
                                    <Text style={styles.size}>Medium</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.newwidget(this.state.activity, "big")} style = {styles.type}>
                                    <Text style={styles.size}>Big</Text>
                                </TouchableOpacity>
                            </View>
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
        position: "absolute",
        opacity: 1,
        top: "85%",
        left: "85%",
    },
    menustyle : {
        width: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    activity : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#c9c9c9",
    },
    type : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        paddingVertical: 40,
        backgroundColor: "orange",
    },
    size : {
        fontSize: 30,
        color: "white",
    },
    test: {
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "rgba(239,239,239,0.5)",
    },
    screen : {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(239,239,239,0.5)",
    },
    title: {
        fontSize: 30,
        marginTop: "-10.3%",
    },
    description: {
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: "3%",
    },
    icon: {
        resizeMode: "contain",
        width: 40,
        height: 40,
    },
})
