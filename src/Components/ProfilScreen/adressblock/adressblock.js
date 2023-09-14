import {Component, useState} from "react";
import {Modal, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Touchable} from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';
import { BlurView } from 'expo-blur';
import {getDatabase, ref, push} from "firebase/database";
import firebase from "../../../firebase/config";

export default class adressblock extends Component {
    state = {
        modalVisible: true,
        userAddress: "",
        subAddress: "",
    }

    showModal = () => {
        this.setState({ modalVisible: true });
    }

    hideModal = () => {
        this.setState({ modalVisible: false, userAddress: "" });
    }

    handleAddressInput = (text) => {
        this.setState({ userAddress: text });
    }

    handleSubAddressInput = (text) => {
        this.setState({ subAddress: text });
    }

    saveAddress = () => {
        if (this.state.userAddress == "" || this.state.subAddress == "")
            return ;
        this.hideModal();
        const db = getDatabase(firebase);
        const addressRef = ref(db, `users/Theo/address`);
        if (this.state.userAddress === "" || this.state.subAddress === "") {
            return
        }
        push(addressRef, {
            main: this.state.userAddress,
            sub: this.state.subAddress,
        });
        this.props.alladdress.push({
            main: this.state.userAddress,
            sub: this.state.subAddress,
        })
    }

    render() {
        return (
            <View style = {styles.adressblock}>
                <View style = {styles.addnew}>
                    <View style = {styles.txt}>
                    <Svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/Svg">
                        <Path d="M8.49834 11.7769C6.56808 11.7769 4.99127 10.1999 4.99127 8.24925C4.99127 6.29861 6.56808 4.73077 8.49834 4.73077C10.4286 4.73077 12.0054 6.30773 12.0054 8.25837C12.0054 10.209 10.4286 11.7769 8.49834 11.7769ZM8.49834 6.09807C7.32027 6.09807 6.35059 7.0643 6.35059 8.25837C6.35059 9.45248 7.3112 10.4187 8.49834 10.4187C9.68547 10.4187 10.6461 9.45248 10.6461 8.25837C10.6461 7.0643 9.67641 6.09807 8.49834 6.09807Z" fill="#0000004d" fill-opacity="0.3"/>
                        <Path d="M8.49721 19.6071C7.15602 19.6071 5.80576 19.0966 4.75455 18.0848C2.08124 15.4961 -0.873005 11.3668 0.241633 6.45365C1.24752 1.99626 5.11704 0 8.49721 0H8.50627C11.8864 0 15.7559 1.99626 16.7618 6.46277C17.8674 11.3759 14.9132 15.4961 12.2398 18.0848C11.1886 19.0966 9.83839 19.6071 8.49721 19.6071ZM8.49721 1.3673C5.86013 1.3673 2.47091 2.78017 1.57376 6.75446C0.595054 11.0478 3.27743 14.7486 5.70607 17.0912C7.27382 18.6135 9.72965 18.6135 11.2974 17.0912C13.717 14.7486 16.3993 11.0478 15.4388 6.75446C14.5326 2.78017 11.1343 1.3673 8.49721 1.3673Z" fill="#0000004d" fill-opacity="0.3"/>
                    </Svg>
                        <Text style = {styles.adresstxt}>Address</Text>
                    </View>
                    <TouchableOpacity style = {styles.addnewbutton} onPress={this.showModal}>
                        <Image source={require("../../../../assets/add_icon.png")} resizeMode="cover" style = {styles.icon}/>
                        <Text style = {styles.addnewtxt}>Add new</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.alladress}>
                    {this.props.alladdress.map((item, index) => {
                        return (
                            <View key={index} style = {styles.adress}>
                                <View style = {styles.topadress}>
                                    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/Svg">
                                        <Path d="M13.8116 13.4759H13.146V5.3619C13.146 4.91552 12.9596 4.49795 12.6335 4.22436L11.8147 3.5332L11.8014 1.7693C11.8014 1.37332 11.5019 1.05654 11.1358 1.05654H8.86605L7.97412 0.307783C7.49487 -0.102594 6.81594 -0.102594 6.3367 0.307783L1.67736 4.22436C1.35121 4.49795 1.16483 4.91552 1.16483 5.3547L1.13155 13.4759H0.499214C0.226311 13.4759 0 13.7207 0 14.0159C0 14.311 0.226311 14.5558 0.499214 14.5558H13.8116C14.0845 14.5558 14.3108 14.311 14.3108 14.0159C14.3108 13.7207 14.0845 13.4759 13.8116 13.4759ZM3.4945 7.35615V6.27621C3.4945 5.88023 3.79403 5.55625 4.16012 5.55625H5.49136C5.85745 5.55625 6.15698 5.88023 6.15698 6.27621V7.35615C6.15698 7.75213 5.85745 8.07611 5.49136 8.07611H4.16012C3.79403 8.07611 3.4945 7.75213 3.4945 7.35615ZM8.81946 13.4759H5.49136V11.4959C5.49136 10.8984 5.93732 10.416 6.48979 10.416H7.82103C8.37349 10.416 8.81946 10.8984 8.81946 11.4959V13.4759ZM10.8163 7.35615C10.8163 7.75213 10.5168 8.07611 10.1507 8.07611H8.81946C8.45336 8.07611 8.15384 7.75213 8.15384 7.35615V6.27621C8.15384 5.88023 8.45336 5.55625 8.81946 5.55625H10.1507C10.5168 5.55625 10.8163 5.88023 10.8163 6.27621V7.35615Z" fill="black"/>
                                    </Svg>
                                    {item.main ? <Text style = {styles.maintxt}>{item.main}</Text> : <Text style = {styles.maintxt}>Main</Text>}
                                </View>
                                <View style = {styles.bottomadress}>
                                    <Text style = {styles.adresstxtsecond}>{item.sub}</Text>
                                </View>
                            </View>
                        )})}
                </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={this.hideModal}
            >
                <BlurView
                    intensity={20}
                    tint="dark"
                    style={styles.modal}
                >
                    <View style = {styles.card}>
                        <Text style = {styles.cardtitle}>New Address</Text>
                        <Text style = {styles.citytitle}>City and Country</Text>
                        <TextInput
                            placeholder="City, Country"
                            onChangeText={this.handleAddressInput}
                            value={this.state.userAddress}
                            style = {styles.addressform}
                            placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                        />
                        <Text style = {styles.citytitle}>Street Information</Text>
                        <TextInput
                            placeholder="Enter Information"
                            onChangeText={this.handleSubAddressInput}
                            value={this.state.subAddress}
                            style = {styles.addressform}
                            placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                        />
                        <View style = {styles.buttoncontainer}>
                            <TouchableOpacity style = {styles.cancelbutton} title="Cancel" onPress={this.hideModal} >
                                <Text style = {{color: "#000000"}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.savebutton} title="Save" onPress={this.saveAddress} >
                                <Text style = {{color: "#fff", fontWeight: "400"}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
            </View>
    );
}
}


const styles = StyleSheet.create({
    adressblock: {
        marginTop: '2%',
        width: '84%',
        height: 'auto',
        borderRadius: 20,
        backgroundColor: '#E7E7E7',
        alignItems: 'center',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    addnew: {
        width: '100%',
        height: 'auto',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '19%',
    },
    txt: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '17%',
    },
    adresstxt: {
        fontSize: 18,
        marginLeft: '5%',
        fontWeight: 'bold',
        color: '#000000',
        opacity: 0.3,
    },
    addnewbutton: {
        marginLeft: '7%',
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addnewtxt: {
        marginLeft: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#639DE4',
    },
    alladress: {
        marginTop: 10,
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    adress: {
        marginBottom: 10,
        marginTop: 10,
        width: '80%',
        height: "auto",
        marginLeft: '10%',
    },
    topadress: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    maintxt: {
        marginLeft: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    bottomadress: {
        width: '100%',
        height: "auto",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    adresstxtsecond: {
        marginLeft: '10%',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        opacity: 0.3,
    },
    icon: {
        width: 16,
        height: 16,
    },
    modal: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressform: {
        width: "80%",
        borderRadius: 5,
        padding: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        marginBottom: 20,
    },
    card: {
        width: "80%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#EAEAEA",
        borderRadius: 15,
        paddingVertical: 20,
    },
    buttoncontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
    },
    savebutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#2FDB73",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
    },
    cancelbutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#EAEAEA",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
    },
    cardtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: "80%",
        marginBottom: 30,
    },
    citytitle: {
        fontSize: 14,
        color: "#636363",
        fontWeight: '400',
        width: "80%",
        marginBottom: 10,
    },

})