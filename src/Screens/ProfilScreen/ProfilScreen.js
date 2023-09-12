import {StyleSheet, View, ImageBackground, ScrollView, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, AdressBlock, InformationBlock, PhoneSvg } from '../../Components/index';
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';
import req from '../../data/Req.js'
import { Buffer } from 'buffer';

export default function App( { navigation }) {

  const [object, setObject] = useState([]);
  const [myinformation, setMyinformation] = useState();
  const [objectother, setObjectother] = useState([]);
  const dbRef = ref(getDatabase(firebase));
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

  async function getinfoindatabase() {
      try {
        let snapshot = await get(child(dbRef, `users/gyst5lXi27NwEGKjzLKVl6yDaOt1/address`));
        snapshot = snapshot.val();
        const tmp = Object.keys(snapshot);
        let objectlist = [];
        for (const obj of tmp) {
          objectlist.push(snapshot[obj]);
        }
        setObject(objectlist);
        console.log(objectlist)
      } catch(e) {
        setObject("error");
      }
    }

  async function getotherinfo() {
    try {
      let snapshot = await get(child(dbRef, `users/gyst5lXi27NwEGKjzLKVl6yDaOt1`));
      snapshot = snapshot.val();
      setObjectother(snapshot);
    } catch(e) {
      setObjectother("error");
    }
  }

  useEffect(() => {
      getinfoindatabase()
      getemploye()
      getotherinfo()
  }, []);

  useEffect(() => {
    console.log(object)
  }, [object, objectother])

  useEffect(() => {
  }, [myinformation])

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <View style = {styles.photo}></View>
                {pp == null && <View style = {styles.photo}></View>}
                {pp != null && <Image source={{ uri: pp }} style={styles.photo} />}
                <ProfilHead index = {1} navigation = {navigation} my = {myinformation}/>
                    <View style = {styles.pagecontainer}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View style = {styles.body}>
                                <AdressBlock alladdress = {object}/>
                                <InformationBlock icon = {1} txt = {"Mobile"} value = {objectother.phone}/>
                                <InformationBlock icon = {2} txt = {"Email"} value = {objectother.Email} />
                            </View>
                            <View style = {{height: 120}}/>
                        </ScrollView>
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