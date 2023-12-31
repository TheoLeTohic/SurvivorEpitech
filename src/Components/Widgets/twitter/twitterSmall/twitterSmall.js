import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class ChessSmall extends Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        console.log("Twitter")
        // this.props.navigation.navigate('Twitter')
    }


    render() {
        const imageUrl = "../../../../../assets/twitter.png"
        return (
            <TouchableOpacity style={styles.container} onPress={() =>  this.handleClick() }>
                {this.props.click === true ? <TouchableOpacity style = {styles.remover} onPress={() => this.props.remove(this.props.id)}></TouchableOpacity> : null}
                <ImageBackground imageStyle={{borderRadius: 20}} style={styles.backgroundimage} source={require(imageUrl)}>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: "0.7%",
        height: 168,
        width: "44.8%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
    },
    backgroundimage: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: "8%",
    },
    origin: {
        color: "#c5c5c5",
        marginHorizontal: "8%",
        marginBottom: "5%",
        fontWeight: "bold",
    },
});