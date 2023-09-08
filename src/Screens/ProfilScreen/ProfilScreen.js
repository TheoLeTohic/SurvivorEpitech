import { StyleSheet, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, AdressBlock, InformationBlock, PhoneSvg } from '../../Components/index';

export default function App( { navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <View style = {styles.photo}></View>
                <ProfilHead index = {1} navigation = {navigation}/>
                <View style = {styles.pagecontainer}>
                    <View style = {styles.body}>
                    <AdressBlock />
                    <InformationBlock icon = {1} txt = {"Mobile"} value = {"+34 320 817 632"}/>
                    <InformationBlock icon = {2} txt = {"Email"} value = {"frankesteban@gmail.com"} />
                    </View>
                </View>
            <NavBar navigation={navigation} index = {5}/>
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