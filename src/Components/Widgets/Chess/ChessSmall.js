import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class ChessSmall extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    handleClick = () => {
        console.log("ChessSmall")
        this.props.navigation.navigate('Chess')
    }

    render() {
        const imageUrl = "../../../../assets/chess.png"
        return (
            <TouchableOpacity style={styles.container} onPress={() =>  this.handleClick()} onLongPress={ () => this.props.callback()}>
                <LinearGradient
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    colors={['rgba(255,202,0,1)', 'rgba(255,80,0,1)']}
                    style = {this.props.click === false ? styles.background : styles.backgroundclick}
                    />
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
    backgroundclick: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 0,
        width: "100%",
        borderRadius: 20,
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