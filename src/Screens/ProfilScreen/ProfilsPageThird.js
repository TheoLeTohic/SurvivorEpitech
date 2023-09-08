import { StyleSheet, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, TeamMember, ExtraBlock } from '../../Components/index';
import {Path, Svg} from "react-native-svg";

export default function App( { navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <View style = {styles.photo}></View>
                <ProfilHead index = {3} navigation = { navigation }/>
                <View style = {styles.pagecontainer}>
                    <View style = {styles.body}>
                        <View style = {{width: '100%', height: '80%', display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                        <ExtraBlock name = { "Fermin Vergas" } txt = { "text" } svg = { <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/Svg">
                            <Path d="M13.8116 13.4759H13.146V5.3619C13.146 4.91552 12.9596 4.49795 12.6335 4.22436L11.8147 3.5332L11.8014 1.7693C11.8014 1.37332 11.5019 1.05654 11.1358 1.05654H8.86605L7.97412 0.307783C7.49487 -0.102594 6.81594 -0.102594 6.3367 0.307783L1.67736 4.22436C1.35121 4.49795 1.16483 4.91552 1.16483 5.3547L1.13155 13.4759H0.499214C0.226311 13.4759 0 13.7207 0 14.0159C0 14.311 0.226311 14.5558 0.499214 14.5558H13.8116C14.0845 14.5558 14.3108 14.311 14.3108 14.0159C14.3108 13.7207 14.0845 13.4759 13.8116 13.4759ZM3.4945 7.35615V6.27621C3.4945 5.88023 3.79403 5.55625 4.16012 5.55625H5.49136C5.85745 5.55625 6.15698 5.88023 6.15698 6.27621V7.35615C6.15698 7.75213 5.85745 8.07611 5.49136 8.07611H4.16012C3.79403 8.07611 3.4945 7.75213 3.4945 7.35615ZM8.81946 13.4759H5.49136V11.4959C5.49136 10.8984 5.93732 10.416 6.48979 10.416H7.82103C8.37349 10.416 8.81946 10.8984 8.81946 11.4959V13.4759ZM10.8163 7.35615C10.8163 7.75213 10.5168 8.07611 10.1507 8.07611H8.81946C8.45336 8.07611 8.15384 7.75213 8.15384 7.35615V6.27621C8.15384 5.88023 8.45336 5.55625 8.81946 5.55625H10.1507C10.5168 5.55625 10.8163 5.88023 10.8163 6.27621V7.35615Z" fill="black"/>
                        </Svg> }/>
                    </View>
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