import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class WeatherSmall extends Component {
    render() {
        return (
          <TouchableOpacity style = {styles.meteosmall} onLongPress={ () => this.props.callback() }>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              colors={['rgba(255,202,0,1)', 'rgba(255,80,0,1)']}
              style = {this.props.click === false ? styles.background : styles.backgroundclick}
            />
              {this.props.click === true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
              <View style = {styles.topsmall}>
                <View style = {styles.leftsmall}>
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
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
  remover : {
    zIndex: 10,
        height: 20,
        width: 20,
        borderRadius: 200,
        backgroundColor: "orange",
        position: "absolute",
        opacity: 1,
        top: -10,
        left: -10,
   },
      backgroundclick: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 0,
        width: "100%",
        borderRadius: 20,
      },
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 168,
        width: "100%",
        borderRadius: 20,
      },
      
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
