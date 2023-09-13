import {StyleSheet, View, ImageBackground, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, AdressBlock, InformationBlock, TeamMember } from '../../Components/index';

export default function App( { navigation, route }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <View style = {styles.photo}></View>
                <ProfilHead index = {2} navigation = { navigation }/>
                <View style = {styles.pagecontainer}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style = {styles.body}>
                            <View style = {styles.topcards}>
                                <TeamMember name = { "Fermin Vergas" } job = { "VP of Engineering" } image = { require("../../../assets/avatar.png") }/>
                            </View>
                            <View style = {styles.middleline}/>
                            <View style = {styles.topcards}>
                                <TeamMember name = { "Tobias Valdez" } job = { "Frontend Engineer" } image = { require("../../../assets/avatar2.png") }/>
                                <TeamMember name = { "Lea Bowers" } job = { "Backend Engineer" } image = { require("../../../assets/avatar3.png") }/>
                                <TeamMember name = { "Louise Mullen" } job = { "Q/A Tester" } image = { require("../../../assets/avatar4.png") }/>
                            </View>
                        </View>
                        <View style = {{height: 100}}/>
                    </ScrollView>
                </View>
            <NavBar navigation={navigation} index = {5} id = {route.params.id} code = {route.params.code}/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '60%',
        marginTop: '27%',
        alignItems: 'center',
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
        backgroundColor: '#EAEAEA',
    },
    photo: {
        zIndex: 2,
        width: "23%",
        height: "11%",
        position: "absolute",
        backgroundColor: "red",
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
    topcards: {
        width: '83%',
        height: 'auto',
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: '2%',
    },
    middleline: {
        width: '65%',
        height: 1,
        backgroundColor: 'grey',
        opacity: 0.3,
        marginBottom: '2%',
    },


});