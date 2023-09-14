import {Component, useState} from "react";
import {Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Touchable} from 'react-native';
import { Svg, Path, Use, Rect, SvgFromUri } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import {getDatabase, ref, push} from "firebase/database";
import firebase from "../../../firebase/config";

export default class NewEmployees extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.topcontainer}>
                    <View style = {styles.blockcontainer}><Svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Path d="M9.25803 7.18118C9.69518 6.80082 10.0458 6.33038 10.2861 5.80178C10.5265 5.27319 10.6508 4.69882 10.6508 4.11765C10.6508 3.02558 10.2192 1.97824 9.451 1.20603C8.68276 0.433822 7.64081 1.47338e-07 6.55435 1.47338e-07C5.4679 1.47338e-07 4.42595 0.433822 3.65771 1.20603C2.88947 1.97824 2.45788 3.02558 2.45788 4.11765C2.45788 4.69882 2.58225 5.27319 2.82257 5.80178C3.06289 6.33038 3.41353 6.80082 3.85068 7.18118C2.70379 7.7032 1.73073 8.5462 1.04786 9.60939C0.364992 10.6726 0.00120588 11.911 0 13.1765C0 13.3949 0.0863182 13.6044 0.239966 13.7588C0.393613 13.9132 0.602004 14 0.819294 14C1.03658 14 1.24498 13.9132 1.39862 13.7588C1.55227 13.6044 1.63859 13.3949 1.63859 13.1765C1.63859 11.866 2.1565 10.6092 3.07838 9.68253C4.00027 8.75588 5.25061 8.23529 6.55435 8.23529C7.8581 8.23529 9.10844 8.75588 10.0303 9.68253C10.9522 10.6092 11.4701 11.866 11.4701 13.1765C11.4701 13.3949 11.5564 13.6044 11.7101 13.7588C11.8637 13.9132 12.0721 14 12.2894 14C12.5067 14 12.7151 13.9132 12.8687 13.7588C13.0224 13.6044 13.1087 13.3949 13.1087 13.1765C13.1075 11.911 12.7437 10.6726 12.0608 9.60939C11.378 8.5462 10.4049 7.7032 9.25803 7.18118ZM6.55435 6.58824C6.06823 6.58824 5.59302 6.44334 5.18883 6.17187C4.78463 5.90039 4.4696 5.51454 4.28357 5.0631C4.09754 4.61166 4.04886 4.11491 4.1437 3.63566C4.23854 3.15641 4.47263 2.7162 4.81637 2.37068C5.16011 2.02516 5.59806 1.78986 6.07485 1.69453C6.55163 1.5992 7.04583 1.64813 7.49495 1.83512C7.94407 2.02211 8.32793 2.33878 8.59801 2.74506C8.86808 3.15135 9.01224 3.62901 9.01224 4.11765C9.01224 4.77289 8.75328 5.40129 8.29234 5.86462C7.8314 6.32794 7.20623 6.58824 6.55435 6.58824ZM14.5343 6.85176C15.0586 6.25827 15.4011 5.5251 15.5205 4.74051C15.64 3.95592 15.5313 3.15336 15.2075 2.42941C14.8838 1.70547 14.3588 1.09101 13.6957 0.659995C13.0326 0.228982 12.2598 -0.000212141 11.4701 1.47338e-07C11.2528 1.47338e-07 11.0444 0.0867646 10.8908 0.241206C10.7371 0.395648 10.6508 0.605116 10.6508 0.82353C10.6508 1.04194 10.7371 1.25141 10.8908 1.40585C11.0444 1.56029 11.2528 1.64706 11.4701 1.64706C12.122 1.64706 12.7472 1.90735 13.2081 2.37068C13.669 2.834 13.928 3.46241 13.928 4.11765C13.9268 4.5502 13.8127 4.97486 13.5971 5.34917C13.3814 5.72348 13.0717 6.03431 12.6991 6.25059C12.5776 6.32102 12.4761 6.42161 12.4044 6.54273C12.3327 6.66385 12.2931 6.80145 12.2894 6.94235C12.286 7.08216 12.318 7.22054 12.3825 7.34445C12.447 7.46836 12.5419 7.57371 12.6581 7.65059L12.9776 7.86471L13.0841 7.92235C14.0717 8.39318 14.9049 9.13787 15.4855 10.0687C16.0661 10.9996 16.3699 12.0778 16.3613 13.1765C16.3613 13.3949 16.4476 13.6044 16.6013 13.7588C16.7549 13.9132 16.9633 14 17.1806 14C17.3979 14 17.6063 13.9132 17.7599 13.7588C17.9136 13.6044 17.9999 13.3949 17.9999 13.1765C18.0066 11.9127 17.6917 10.6682 17.0851 9.56123C16.4786 8.45425 15.6005 7.52155 14.5343 6.85176Z" fill="#0079AD"/>
</Svg>

</View>
                    <Text style = {{fontSize: 12, fontWeight: "bold", color: "#171717", marginLeft: "8.4%"}}>Total Employees</Text>
                </View>
                <View style = {styles.bottomcontainer}>
                    <Text style = {{fontSize: 36, fontWeight: "bold", color: "#171717"}}><Text style = {{color: "#B4B4B4"}}>{this.props.data} </Text>/ {this.props.max}</Text>
                    <View style = {styles.display}>
                        <View style = {[styles.complete, {width: ((this.props.data / this.props.max) * 100) + "%"}]}></View>
                    </View>
                </View>
            </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        marginLeft: "5.8%",
        width: "41.3%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        borderRadius: 20,
    },
    topcontainer: {
        width: "100%",
        height: "16.8%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "8.4%",
    },
    blockcontainer: {
        width: "16.8%",
        height: "100%",
        backgroundColor: "#C6D7F0",
        marginLeft: "8.4%",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#D3D3D3",
        borderWidth: 1,
    },
    bottomcontainer: {
        marginTop: "30.6%",
        marginLeft: "20.4%",
        width: "100%",
        height: "83.2%",
        display: "flex",
        flexDirection: "column",
    },
    display: {
        width: "78.2%",
        height: "12.6%",
        backgroundColor: "#FFF",
        borderRadius: 5,
        marginTop: "3.2%",
        borderColor: "#D3D3D3",
        borderWidth: 1,
    },
    complete: {
        height: "100%",
        backgroundColor: "#C6D7F0",
        borderRadius: 5,
    }
})