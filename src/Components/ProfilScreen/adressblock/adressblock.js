import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';

export default class adressblock extends Component {
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
                    <View style = {styles.addnewbutton}>
                    <Svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/Svg">
                        <Path d="M7.8219 12.2837V5.83588" stroke="#639DE4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M9.86182 9.05981H10.5508" stroke="#639DE4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M5.09314 9.05981H7.69229" stroke="#639DE4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M7.8219 12.2837V5.83588" stroke="#639DE4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <Path d="M2.36439 4.22394C1.51164 5.56993 1 7.24638 1 9.05984C1 13.5089 4.05622 17.1197 7.82193 17.1197C11.5876 17.1197 14.6439 13.5089 14.6439 9.05984C14.6439 4.61081 11.5876 1 7.82193 1C6.84639 1 5.91179 1.2418 5.07269 1.68509" stroke="#639DE4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                    <Text style = {styles.addnewtxt}>Add new</Text>
                    </View>
                </View>
                <View style = {styles.alladress}>
                    <View style = {styles.adress}>
                        <View style = {styles.topadress}>
                            <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/Svg">
                                <Path d="M13.8116 13.4759H13.146V5.3619C13.146 4.91552 12.9596 4.49795 12.6335 4.22436L11.8147 3.5332L11.8014 1.7693C11.8014 1.37332 11.5019 1.05654 11.1358 1.05654H8.86605L7.97412 0.307783C7.49487 -0.102594 6.81594 -0.102594 6.3367 0.307783L1.67736 4.22436C1.35121 4.49795 1.16483 4.91552 1.16483 5.3547L1.13155 13.4759H0.499214C0.226311 13.4759 0 13.7207 0 14.0159C0 14.311 0.226311 14.5558 0.499214 14.5558H13.8116C14.0845 14.5558 14.3108 14.311 14.3108 14.0159C14.3108 13.7207 14.0845 13.4759 13.8116 13.4759ZM3.4945 7.35615V6.27621C3.4945 5.88023 3.79403 5.55625 4.16012 5.55625H5.49136C5.85745 5.55625 6.15698 5.88023 6.15698 6.27621V7.35615C6.15698 7.75213 5.85745 8.07611 5.49136 8.07611H4.16012C3.79403 8.07611 3.4945 7.75213 3.4945 7.35615ZM8.81946 13.4759H5.49136V11.4959C5.49136 10.8984 5.93732 10.416 6.48979 10.416H7.82103C8.37349 10.416 8.81946 10.8984 8.81946 11.4959V13.4759ZM10.8163 7.35615C10.8163 7.75213 10.5168 8.07611 10.1507 8.07611H8.81946C8.45336 8.07611 8.15384 7.75213 8.15384 7.35615V6.27621C8.15384 5.88023 8.45336 5.55625 8.81946 5.55625H10.1507C10.5168 5.55625 10.8163 5.88023 10.8163 6.27621V7.35615Z" fill="black"/>
                            </Svg>
                            <Text style = {styles.maintxt}>Attico Urquinaona</Text>
                        </View>
                        <View style = {styles.bottomadress}>
                            <Text style = {styles.adresstxtsecond}>Rda. de Sant Pere, 52, 08010 Barcelona</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
}
}


const styles = StyleSheet.create({
    adressblock: {
        marginTop: '8%',
        width: '84%',
        height: '30%',
        borderRadius: 20,
        backgroundColor: '#E7E7E7',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    addnew: {
        width: '100%',
        height: 'auto',
        marginTop: '2%',
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
        marginTop: '4%',
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    adress: {
        width: '80%',
        height: '30%',
        marginLeft: '10%',
    },
    topadress: {
        width: '100%',
        height: "160%",
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
        height: "100%",
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

})