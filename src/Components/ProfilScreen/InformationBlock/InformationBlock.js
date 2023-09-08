import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Svg, Path, Use } from 'react-native-svg';

export default class adressblock extends Component {
    render() {
        return (
            <View style = {styles.adressblock}>
                <View style = {styles.top}>
                    {this.props.icon == 1 ? 
                    <Svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/Svg">
                    <Path d="M13 6.48113V17.4434C13 21.8283 12.25 22.9245 9.25 22.9245H4.75C1.75 22.9245 1 21.8283 1 17.4434V6.48113C1 2.09623 1.75 1 4.75 1H9.25C12.25 1 13 2.09623 13 6.48113Z" stroke="#0000004d" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M8.5 4.83679H5.5" stroke="#0000004d" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <Path d="M6.99996 19.7455C7.64199 19.7455 8.1625 18.9847 8.1625 18.0463C8.1625 17.1079 7.64199 16.3472 6.99996 16.3472C6.35793 16.3472 5.83746 17.1079 5.83746 18.0463C5.83746 18.9847 6.35793 19.7455 6.99996 19.7455Z" stroke="#0000004d" stroke-opacity="0.2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                    :
                    <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Path d="M14.5047 16.372H6.16823C3.66729 16.372 2 15.1039 2 12.1449V6.22705C2 3.26811 3.66729 2 6.16823 2H14.5047C17.0056 2 18.6729 3.26811 18.6729 6.22705V12.1449C18.6729 15.1039 17.0056 16.372 14.5047 16.372Z" stroke="#0000004d" stroke-opacity="0.2" stroke-width="2.15047" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M14.5047 6.64978L11.8954 8.76331C11.0367 9.45654 9.62784 9.45654 8.76919 8.76331L6.16821 6.64978" stroke="#0000004d" stroke-opacity="0.2" stroke-width="2.15047" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
                    }
                    <Text style = {styles.txt}>{this.props.txt}</Text>                 
                </View>
                <View style = {styles.bottom}>
                    <Text style = {styles.value}>{this.props.value}</Text>
                </View>
            </View>
        );
}
}


const styles = StyleSheet.create({
    adressblock: {
        marginTop: '8%',
        width: '84%',
        height: '20%',
        borderRadius: 20,
        backgroundColor: '#E7E7E7',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    top: {
        width: '86%',
        height: '38%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        width: '70%',
        height: '50%',
        justifyContent: 'center',
    },
    txt: {
        marginLeft: '3%',
        fontSize: 18,
        color: '#0000004d',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
})