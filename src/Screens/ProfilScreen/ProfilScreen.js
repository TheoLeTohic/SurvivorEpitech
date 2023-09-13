import {StyleSheet, View, ImageBackground, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, AdressBlock, InformationBlock, PhoneSvg } from '../../Components/index';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../firebase/config';

export default function App( { navigation, route }) {

  const [object, setObject] = useState([]);
  const [myinformation, setMyinformation] = useState();
  const [objectother, setObjectother] = useState([]);
  const dbRef = ref(getDatabase(firebase));


  async function getemploye() {
    await fetch("https://masurao.fr/api/employees/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Group-Authorization": "UkPEzS4kSZu07iSS2d2l4OjA4PDfNiGy",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1ODI3MjQzfQ.-tSPtN90QZpMxWzO2e-VpQdIZmLwZoOa2i6zwTXNR5E"
      },
      })
      .then((response) => response.json())
      .then((responseData) => {
        setMyinformation(responseData);
      })
  }

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
                <ProfilHead index = {1} navigation = {navigation} my = {myinformation}/>
                    <View style = {styles.pagecontainer}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View style = {styles.body}>
                                <AdressBlock alladdress = {object} id = {route.params.id} code = {route.params.code}/>
                                <InformationBlock icon = {1} txt = {"Mobile"} value = {objectother.phone}/>
                                <InformationBlock icon = {2} txt = {"Email"} value = {objectother.Email} />
                            </View>
                            <View style = {{height: 120}}/>
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