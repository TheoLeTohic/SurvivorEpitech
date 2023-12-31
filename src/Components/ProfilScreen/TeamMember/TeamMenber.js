import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';

export default class Navbar extends Component {
    render() {
        return (
            <View style = {styles.card}>
                <View style = {styles.left}>
                    <Image source = {this.props.image} resizeMode="cover" style = {styles.img}/>
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
        width: "48%",
        backgroundColor: "#EAEAEA",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 25,
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
        marginBottom: "5%",
        paddingVertical: "2%",
    },
    left: {
        width: "30%",
        borderRadius: 10,
        height: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginLeft: "5%",
    },
    right: {
        width: "50%",
        display: "flex",
        paddingVertical: "7%",
        justifyContent: "center",
    },
    name: {
        fontSize: 13,
        fontWeight: "bold",
    },
    job: {
        fontSize: 9,
        fontWeight: "bold",
        marginTop: "2%",
        color: "#E24545",
    },
    img: {
        width: "100%",
        marginVertical: "20%",
        height: "100%",
        borderRadius: 10,
    },
});