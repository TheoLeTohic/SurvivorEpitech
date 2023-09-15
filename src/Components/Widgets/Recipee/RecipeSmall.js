import React, { Component, useState, useEffect } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Linking} from 'react-native';
import {RequestUtil} from "../../../data/RequestUtil";

export default class RecipeSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        RequestUtil.fetchData("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => {
            this.setState({data: res.meals[0]});
        })
    }

    handleClick = () => {
        if (this.state.data?.strSource) {
            Linking.openURL(this.state.data.strSource).then(r => console.log(r));
        } else {
            alert("No source available");
        }
    }

    render() {
        const imageUrl = this.state.data?.strMealThumb;
        const recipeName = this.state.data?.strMeal;
        const recipeOrigin = this.state.data?.strArea;

        return (
            <TouchableOpacity style={styles.container} onPress={() =>  this.handleClick() }>
                <ImageBackground imageStyle={{borderRadius: 20}} style={styles.backgroundimage} source={{uri: imageUrl}}>
                    <Text style={styles.title}>{recipeName}</Text>
                    <Text style={styles.origin}>{recipeOrigin}</Text>
                </ImageBackground>
            </TouchableOpacity>
        );
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
        backgroundColor: "red",
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