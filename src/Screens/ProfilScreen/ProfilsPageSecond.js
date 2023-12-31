import {StyleSheet, View, ImageBackground, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, AdressBlock, InformationBlock, TeamMember } from '../../Components/index';
import req from '../../data/Req.js'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../firebase/config'
import { Alert } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getDatabase, set } from "firebase/database";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { fetchDataFromDatabase } from "../../data/FirebaseUtils";


export default function App( { navigation, route }) {
    const [myinformation, setMyinformation] = useState();
    const [pp, setPp] = useState([]);
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false) 
    const [display, setDisplay] = useState(0)
    const bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1ODI3MjQzfQ.-tSPtN90QZpMxWzO2e-VpQdIZmLwZoOa2i6zwTXNR5E"


    function onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {  
          case SWIPE_UP:
            console.log("up");
            break;
          case SWIPE_DOWN:
            console.log("down");
            break;
          case SWIPE_LEFT:
            setDisplay (display + 1)
            break;
          case SWIPE_RIGHT:
            setDisplay (display - 1)
            break;
        }
      }

      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };

    async function getpp() {
        try {
            for (let i = 1; i < 100; i++) {
                const storageRef = ref(getStorage(), 'images/' + route.params.id + '/' + i +'.png')
                await getDownloadURL(storageRef).then((url) => {
                    const tmp = [...pp]
                    tmp.push(url)
                    console.log("rm", tmp)
                    setPp(tmp)
                }).catch((error) => {
                    return
                })
            }
        } catch (error) {
        console.log("a", error)
        }
    }

    async function getemploye() {
        fetchDataFromDatabase(`users/${route.params.id}`).then((response) => {
            setMyinformation(response);
        });
    }
      const uploadImage = async () => {
        try {
            const blob = await uriToBlob(image.uri)
            setImage(null)
            const storageRef = ref(getStorage(), 'images/' + route.params.id + '/' +( pp.length + 1) +'.png')
            setUploading(true)
            uploadBytes(storageRef, blob).then((snapshot) => {
            setUploading(false)
            getpp()
            Alert.alert("Image uploaded")
            });
        } catch (error) {
            console.log(error)
        }
    }

    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => { 
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };       
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
          // this helps us get a blob
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
    }

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });
        const source = {uri: result.assets[0].uri}
        console.log(source)
        setImage(source)
    };
      useEffect(() => {
        getpp()
        getemploye()
    }, []);

    useEffect(() => {
        if (image != null) {
            uploadImage()
        }
    }, [image])

    useEffect(() => {
        console.log(pp)
    }
    , [pp])

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <TouchableOpacity onPress={() => pickImage()} style = {styles.photo}>{pp[display] ? <Image style = {{width: "100%", height: "100%", borderRadius: 100000}} resizeMode='contain' source = {{uri : pp[display]}} />  : null}</TouchableOpacity>
                <ProfilHead index = {2} navigation = { navigation } my = {myinformation} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
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
            <NavBar navigation={navigation} index = {5} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
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
        borderRadius: 100000,
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