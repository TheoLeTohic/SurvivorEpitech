import {StyleSheet, View, ImageBackground, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, AdressBlock, InformationBlock, PhoneSvg } from '../../Components/index';
import { getDatabase, ref, child, get } from "firebase/database";
import firebase from '../../firebase/config';
import {Screen} from "react-native-screens";

export default function App( { navigation }) {

  const [object, setObject] = useState([]);
    const [objectother, setObjectother] = useState([]);
  const dbRef = ref(getDatabase(firebase));

    async function getinfoindatabase() {
        try {
          let snapshot = await get(child(dbRef, `users/Theo/address`));
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
          let snapshot = await get(child(dbRef, `users/Theo`));
          snapshot = snapshot.val();
          setObjectother(snapshot);
        } catch(e) {
          setObjectother("error");
        }
      }

        useEffect(() => {
            getinfoindatabase()
            getotherinfo()
        }, []);

        useEffect(() => {
        }, [object, objectother])
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                <View style = {styles.photo}></View>
                <ProfilHead index = {1} navigation = {navigation}/>
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