import { StyleSheet, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, TeamMember, ExtraBlock } from '../../Components/index';
import {Path, Svg} from "react-native-svg";

export default function App( { navigation, route }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <View style = {styles.photo}></View>
                <ProfilHead index = {3} navigation = { navigation }/>
                <View style = {styles.pagecontainer}>
                    <View style = {styles.body}>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                    </View>
                </View>
            <NavBar navigation={navigation} index = {5} id = {route.params.id} code = {route.params.code}/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        width: '83%',
        marginTop: '27%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
    },
    pagecontainer: {
        marginTop: '70%',
        borderRadius: 25,
        width: '100%',
        height: '70%',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
    },
    photo: {
        zIndex: 2,
        width: "23%",
        height: "11%",
        backgroundColor: "red",
        position: "absolute",
        top: "14%",
        left: "39%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 1000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

});