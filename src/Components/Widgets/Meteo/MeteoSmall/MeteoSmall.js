import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Navbar extends Component {
    render() {
        return (
            <View style = {styles.meteosmall}>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              // Background Linear Gradient
              colors={['rgba(255,202,0,1)', 'rgba(255,80,0,1)']}
              style={styles.backgroundsmallmeteo}
            />
              <View style = {styles.topsmall}>
                <View style = {styles.leftsmall}>
                  <Image source={require('../../../../../assets/Sun.png')} style = {styles.iconsmall}/>
                </View>
                <View style = {styles.rightsmall}>
                  <View style={styles.tempnumcontainersmall}>
                    <Text style = {styles.tempnumsmall}>23°</Text>
                    <Text style = {styles.humiditynumsmall}>67°</Text>
                  </View>
              </View>
              </View>
              <View style = {styles.bottomsmall}>
              <View style = {styles.citycontainersmall}>
                    <Text style = {styles.citysmall}>{this.props.city[0]}</Text>
                    <Text style = {styles.weathersmall}>Sunny</Text>
                  </View>
                </View>
                <View style = {styles.pointsmall}>
                  <View style = {styles.pointactivesmall}></View>
                  <View style = {styles.pointinactivesmall}></View>
                  <View style = {styles.pointinactivesmall}></View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    meteosmall : {
        marginTop: 20,
        marginLeft: "0.7%",
        height: 168,
        width: "44.8%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      },
      backgroundsmallmeteo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 168,
        width: "100%",
        borderRadius: 20,
      },
      topsmall : {
        height: "60%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      leftsmall : {
        marginLeft: "8%",
        height: "70%",
        width: "40%",
        backgroundColor: "#ffffff7d",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      rightsmall : {
        marginLeft: "4%",
        height: "70%",
        width: "45%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      },
      tempnumcontainersmall : {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        marginLeft: "20%",
      },
      tempnumsmall : {
        fontSize: 40,
        fontWeight: "bold",
        color: "#000000cc",
      },
      humiditynumsmall : {
        fontSize: 18,
        fontWeight: "bold",
        color: "#53535399",
      },
      citysmall : {
        fontSize: 26,
        fontWeight: "bold",
        color: "#000000cc",
      },
      weathersmall : {
        fontSize: 15,
        fontWeight: "bold",
        color: "#53535399",
      },
      bottomsmall : {
        height: "27%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      citycontainersmall : {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginLeft: "8%",
      },
      pointsmall : {
        height: "5%",
        width: "25%",
        marginLeft: "5%",
        display: "flex",
        marginBottom: "5%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      pointactivesmall : {
        height: 7,
        width: 7,
        borderRadius: 20,
        backgroundColor: "#fff",
      },
      pointinactivesmall : {
        height: 7,
        width: 7,
        borderRadius: 20,
        backgroundColor: "#fff",
        opacity: 0.5,
      },
      iconsmall : {
        height: "120%",
        width: "120%",
        marginTop: "20%",
        marginLeft: "12%",
      },

})
