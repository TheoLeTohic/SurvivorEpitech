import {Component, useState} from "react";
import {Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Touchable} from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import {getDatabase, ref, push} from "firebase/database";
import firebase from "../../../firebase/config";

export default class NewEmployees extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.topcontainer}>
                    <Text style = {styles.title}>Employees List</Text>
                    <TextInput style = {styles.searchbar} placeholder = "Search user..."/>
                </View>
                {this.props.member.map((item, index) => {
                    <View style = {styles.card}>
                        <View style = {styles.picture}></View>
                        <Text style = {styles.name}>Julia</Text>
                        <Text style = {styles.date}>11/09/2023</Text>
                        <View style = {styles.jobcontainerblue}>
                            <Text style = {styles.jobblue}>CEO</Text>
                        </View>
                    </View>
                })}
            </View>
    );
}
}


const styles = StyleSheet.create({
    container: {
        marginTop: "4.44%",
        marginLeft: "5.8%",
        width: "88.4%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        borderRadius: 20,
    },
    topcontainer: {
        width: "100%",
        height: 35,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#D3D3D3",
        borderBottomWidth: 1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#171717",
        marginLeft: "5.8%",
    },
    searchbar: {
        width: "48%",
        height: "60%",
        marginLeft: "auto",
        marginRight: "5.8%",
        backgroundColor: "#FFFF",
        borderRadius: 5,
        paddingLeft: "2.8%",
        borderColor: "#D3D3D3",
        borderWidth: 1,
    },
    card: {
        width: "100%",
        height: 35,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#D3D3D3",
        borderBottomWidth: 1,
    },
    cardlast: {
        width: "100%",
        height: 35,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#D3D3D3",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },

    picture: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: "red",
        marginLeft: "5.8%",
    },
    name: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#171717",
        marginLeft: "5.8%",
    },
    date: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#171717",
        marginLeft: "auto",
    },
    jobcontainerred: {
        width: 50,
        height: 20,
        backgroundColor: "#FFCBCB",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "5.8%",
    },
    jobred: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#F55",
    },
    jobcontaineryellow: {
        width: 50,
        height: 20,
        backgroundColor: "#FEFFCB",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "5.8%",
    },
    jobyellow: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#FFC700",
    },
    jobcontainerblue: {
        width: 50,
        height: 20,
        backgroundColor: "#CBD6FF",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "5.8%",
    },
    jobblue: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#5585FF",
    },

})