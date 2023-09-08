import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';

export default class Navbar extends Component {
    render() {
        return (
            <View style = {styles.card}>
                <View style = {styles.left}>
                </View>
                <View style = {styles.right}>
                    <Text style = {styles.name}>{this.props.name}</Text>
                    <Text style = {styles.job}>{this.props.job}</Text>
                </View>
            </View>
        );
}
}

const styles = StyleSheet.create({
    card: {
        zIndex: 1,
        width: "40%",
        height: "27%",
        backgroundColor: "#EAEAEA",
        top: "20%",
        left: "8%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 25,
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    left: {
        width: "35%",
        borderRadius: 20,
        marginLeft: "5%",
        height: "80%",
        backgroundColor: "red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    right: {
        width: "60%",
        height: "80%",
        display: "flex",
        marginTop: "5%",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    name: {
        marginTop: "20%",
        marginLeft: "5%",
        fontSize: 12,
        fontWeight: "bold",
    },
    job: {
        fontSize: 11,
        marginLeft: "5%",
        marginTop: "2%",
        color: "#E24545",
    },
    img: {
        width: "100%",
        height: "100%",
    },
});