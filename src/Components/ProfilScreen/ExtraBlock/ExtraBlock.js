import { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default class ExtraBlock extends Component {
    render() {
        return (
            <View style = {styles.card}>
                <View style = {styles.top}>
                    <View style = {styles.backicon}>
                        <Image source={this.props.icon} resizeMode="cover" style = {styles.icon}/>
                    </View>
                    <Text style = {styles.title}>{this.props.title}</Text>
                </View>
                <View style = {styles.bottom}>
                    <Text style = {styles.value}>{this.props.value}</Text>
                    <Text style = {styles.description}>{this.props.desc}</Text>
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
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 25,
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
        marginBottom: "5%",
        paddingVertical: "2%",
    },
    top: {
        width: '86%',
        marginTop: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        width: '86%',
        marginBottom: '3%',
        marginTop: '7%',
        alignItems: 'center',
        paddingVertical: '7%'
    },
    title: {
        width: '80%',
        marginLeft: '5%',
        fontSize: 18,
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        color: '#000000',
        fontWeight: 'bold',
    },
    icon: {
        width: "60%",
        height: "60%",
        tintColor: '#e74a4a',
    },
    backicon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: 'rgba(238,60,60,0.3)',
        borderRadius: 5,
    },
    description: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        marginLeft: '3%',
    }
})