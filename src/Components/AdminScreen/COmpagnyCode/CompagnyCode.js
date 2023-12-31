import {Component, useState} from "react";
import {Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Touchable} from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import {getDatabase, ref, push} from "firebase/database";
import firebase from "../../../firebase/config";

export default class CompagnyCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            modalVisible: false,
        }
    }
    setCode = (newCode) => {
        this.setState({ code: newCode });
    }
    render() {
        return (
            <View style = {styles.container}>
                <View style ={styles.topcontainer}>
                    <Text style = {styles.title}>Compagny Code</Text>
                </View>
                <View style = {{width: "100%", height: "auto", display: "flex", flexDirection: "row", alignItems: "flex-end", marginTop: "5%"}}>
                    <Text style = {{fontSize: 40, color: "#171717", marginLeft: "30.2%", marginTop: "2.5%", fontWeight: "bold"}}>{String(this.props.code)[0]} {String(this.props.code)[1]} {String(this.props.code)[2]} {String(this.props.code)[3]}</Text>
                    <View style = {styles.topcontainer}>
                    <View style = {styles.blockcontainer}><Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Path d="M13.6011 10.211C13.0991 10.2143 12.604 10.3286 12.1515 10.5458C11.699 10.763 11.3002 11.0776 10.984 11.4669L6.65036 9.47267C6.85412 8.84956 6.85412 8.17788 6.65036 7.55477L10.984 5.5605C11.4952 6.17657 12.2078 6.59249 12.9962 6.73486C13.7846 6.87723 14.598 6.73689 15.2929 6.33861C15.9877 5.94033 16.5194 5.30971 16.794 4.55805C17.0686 3.80639 17.0685 2.98201 16.7938 2.2304C16.519 1.4788 15.9873 0.848275 15.2923 0.45012C14.5974 0.0519652 13.784 -0.088228 12.9956 0.0542822C12.2073 0.196793 11.4947 0.612845 10.9836 1.22901C10.4725 1.84518 10.1957 2.62185 10.2022 3.42196C10.2048 3.62413 10.2247 3.82571 10.2617 4.02448L5.77515 6.08665C5.29682 5.61954 4.69111 5.3038 4.0339 5.17898C3.37669 5.05416 2.69721 5.1258 2.08059 5.38494C1.46397 5.64409 0.937636 6.0792 0.567529 6.63576C0.197421 7.19233 0 7.8456 0 8.51372C0 9.18185 0.197421 9.83512 0.567529 10.3917C0.937636 10.9482 1.46397 11.3834 2.08059 11.6425C2.69721 11.9016 3.37669 11.9733 4.0339 11.8485C4.69111 11.7236 5.29682 11.4079 5.77515 10.9408L10.2617 13.003C10.2247 13.2017 10.2048 13.4033 10.2022 13.6055C10.2022 14.2769 10.4015 14.9332 10.775 15.4914C11.1485 16.0496 11.6793 16.4847 12.3004 16.7416C12.9215 16.9985 13.6049 17.0658 14.2642 16.9348C14.9235 16.8038 15.5291 16.4805 16.0045 16.0058C16.4798 15.531 16.8035 14.9262 16.9347 14.2677C17.0658 13.6093 16.9985 12.9267 16.7413 12.3065C16.484 11.6862 16.0484 11.156 15.4894 10.7831C14.9305 10.4101 14.2733 10.211 13.6011 10.211ZM13.6011 1.7247C13.9372 1.7247 14.2658 1.82424 14.5453 2.01074C14.8247 2.19724 15.0426 2.46231 15.1712 2.77244C15.2998 3.08258 15.3335 3.42384 15.2679 3.75307C15.2023 4.08231 15.0405 4.38473 14.8028 4.6221C14.5651 4.85946 14.2623 5.02111 13.9326 5.0866C13.603 5.15209 13.2613 5.11848 12.9508 4.99002C12.6402 4.86155 12.3748 4.64401 12.1881 4.3649C12.0013 4.08579 11.9017 3.75764 11.9017 3.42196C11.9017 2.97182 12.0807 2.54011 12.3994 2.22182C12.7181 1.90352 13.1504 1.7247 13.6011 1.7247ZM3.40442 10.211C3.0683 10.211 2.73973 10.1114 2.46025 9.92494C2.18078 9.73844 1.96296 9.47337 1.83433 9.16323C1.7057 8.8531 1.67205 8.51184 1.73762 8.1826C1.8032 7.85337 1.96505 7.55095 2.20273 7.31358C2.4404 7.07622 2.74321 6.91457 3.07287 6.84908C3.40253 6.78359 3.74423 6.8172 4.05477 6.94566C4.3653 7.07412 4.63072 7.29167 4.81746 7.57078C5.00419 7.84989 5.10386 8.17804 5.10386 8.51372C5.10386 8.96386 4.92482 9.39557 4.60611 9.71386C4.2874 10.0322 3.85514 10.211 3.40442 10.211ZM13.6011 15.3027C13.265 15.3027 12.9364 15.2032 12.6569 15.0167C12.3775 14.8302 12.1596 14.5651 12.031 14.255C11.9024 13.9449 11.8687 13.6036 11.9343 13.2744C11.9999 12.9451 12.1617 12.6427 12.3994 12.4053C12.6371 12.168 12.9399 12.0063 13.2696 11.9408C13.5992 11.8754 13.9409 11.909 14.2515 12.0374C14.562 12.1659 14.8274 12.3834 15.0141 12.6625C15.2009 12.9417 15.3006 13.2698 15.3006 13.6055C15.3006 14.0556 15.1215 14.4873 14.8028 14.8056C14.4841 15.1239 14.0518 15.3027 13.6011 15.3027Z" fill="#27C400"/>
</Svg>
</View>
                </View>
                </View>
            </View>
    );
}
}


const styles = StyleSheet.create({
    container: {
        marginTop: "4.44%",
        marginLeft: "5.8%",
        width: "88.4%",
        height: "11.8%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        borderRadius: 20,
    },
    topcontainer: {
        width: "100%",
        height: "75",
        display: "flex",
        flexDirection: "row",
    },
    title: {
        fontSize: 12,
        color: "#171717",
        marginLeft: "5.8%",
        marginTop: "3%",
    },
    blockcontainer: {
        width: 30,
        height: 30,
        marginBottom: "2%",
        backgroundColor: "#C6F0D7",
        marginLeft: "8.4%",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        marginLeft: "21%",
    },

})