import { StyleSheet, View, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, TeamMember, ExtraBlock } from '../../Components/index';
import {Path, Svg} from "react-native-svg";
import req from '../../data/Req.js'

export default function App( { navigation, route }) {
    const [myinformation, setMyinformation] = useState();
    const [pp, setPp] = useState(null);
    const bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1ODI3MjQzfQ.-tSPtN90QZpMxWzO2e-VpQdIZmLwZoOa2i6zwTXNR5E"

    async function getemploye() {
      await req.doReq(bearer_token, "https://masurao.fr/api/employees/me").then((response)  => response.json()).then((responseData) => {
        setMyinformation(responseData);
      })
    }
    async function transformPicture(picture) {
        const arrayBuffer = await picture.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return Promise.resolve('data:image/png;base64,' + base64);
      }
    
      useEffect(() => {
        async function getPp() {
          const image = await req.doReq(bearer_token, "https://masurao.fr/api/employees/" + myinformation.id +"/image")
          const image64 = await transformPicture(image)
          setPp(image64)
        }
        if (myinformation != null) {
          getPp()
        }
      }, [myinformation])

      useEffect(() => {
        getemploye()
    }, []);
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                {pp == null && <View style = {styles.photo}></View>}
                {pp != null && <Image source={{ uri: pp }} style={styles.photo} />}
                <ProfilHead index = {3} navigation = { navigation } my = {myinformation} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
                <View style = {styles.pagecontainer}>
                    <View style = {styles.body}>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                        <ExtraBlock value = { "34" } desc = { "years old" } title = { "Age" } icon = {require("../../../assets/Calendar.png")}/>
                    </View>
                </View>
            <NavBar navigation={navigation} index = {5} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
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