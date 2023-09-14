import { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class MeteoBig extends Component {
    render () {
        return (
          <TouchableOpacity style = {styles.meteobig} onLongPress={ () => this.props.callback() }>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              colors={['rgba(0,191,233,1)', 'rgba(6,44,47,0.6)']}
              style = {this.props.click == false ? styles.background : styles.backgroundclick}
            />
              {this.props.click == true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
              <View style = {styles.left}>
              </View>
              <View style = {styles.right}>
                <View style={styles.citycontainer}><Text style = {styles.city}>{this.props.city[0]}</Text></View>
                <View style = {styles.infocontainer}>
                  <View style = {styles.temp}>
                    <Text style = {styles.temptxt}>Partly Cloudy</Text>
                    <Text style = {styles.tempnum}>{this.props.cityweather && this.props.cityweather.main ? Math.round(this.props.cityweather.main.temp) : 0}°</Text>
                  </View>
                  <View style = {styles.humidity}>
                    <Text style = {styles.humiditytxt}>Humidity</Text>
                    <Text style = {styles.humiditynum}>{this.props.cityweather && this.props.cityweather.main ? Math.round(this.props.cityweather.main.humidity) : 0}%</Text>
                  </View>
                </View>
              </View>
              <View style = {styles.point}>
                <View style = {styles.pointactive}></View>
                <View style = {styles.pointinactive}></View>
                <View style = {styles.pointinactive}></View>
              </View>
            </TouchableOpacity>
        )
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    width: "100%",
    borderRadius: 20,
  },
  backgroundclick: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 0,
    width: "0%",
    borderRadius: 20,
    opacity: 0.5,
  },

  meteobig : {
    marginTop: 20,
    marginLeft: 20,
    height: 100,
    width: "90%",
    backgroundColor: "#00BFE9",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
  },
  left : {
    //make glassmorphism
    height: "80%",
    marginTop: "2.5%",
    width: "22%",
    marginLeft: "2.5%",
    backgroundColor: "#ffffff7d",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  right : {
    height: "60%",
    width: "60%",
    marginTop: "2.5%",
    marginLeft: "4%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  citycontainer : {
    height: "60%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "2%",
  },
  city : {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  infocontainer : {
    marginTop: "10%",
    height: "70%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  temp : {
    height: "100%",
    width: "50%",
    display: "flex",
    marginTop: "8%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  temptxt : {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  tempnum : {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  humidity : {
    height: "100%",
    width: "50%",
    display: "flex",
    marginTop: "8%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  humiditytxt : {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  humiditynum : {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  point : {
    height: "40%",
    width: "5%",
    marginTop: "8%",
    marginLeft: "2.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pointactive : {
    height: 7,
    width: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  pointinactive : {
    height: 7,
    width: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
    opacity: 0.5,
  },
  icon : {
    height: "100%",
    width: "10%",
    marginTop: "15%",
    marginLeft: "5%",
  },

});
