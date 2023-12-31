import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class Navbar extends Component {
    render() {
        return (
            <View style = {styles.block}>
                <View style = {styles.nameandtitle}>
                    {this.props.my && this.props.my.name && this.props.my.surname ? <Text style = {styles.name}>{this.props.my.name} {this.props.my.surname}</Text> : null }
                    {this.props.my && this.props.my.job ? <Text style = {styles.title}>{this.props.my.job}</Text> : null }
                </View>
                <View style = {styles.navbar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile", {id: this.props.id, code: this.props.code, me :this.props.me})} style = {styles.navbaritemother}>
                        {this.props.index === 1 ? <Text style ={styles.selected}>Personal info</Text> : <Text style ={styles.unselected}>Personal info</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Profilsecond", {id: this.props.id, code: this.props.code, me :this.props.me})} style = {styles.navbaritem}>
                    {this.props.index === 2 ? <Text style ={styles.selected}>Team</Text> : <Text style ={styles.unselected}>Team</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.navbaritemwithou} onPress={() => this.props.navigation.navigate("ProfilThird", {id: this.props.id, code: this.props.code, me :this.props.me})}>
                    {this.props.index === 3 ? <Text style ={styles.selected}>Extra</Text> : <Text style ={styles.unselected}>Extra</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        );
}
}


const styles = StyleSheet.create({
    block: {
        zIndex: 1,
        width: "84%",
        height: "25%",
        backgroundColor: "#EAEAEA",
        position: "absolute",
        top: "20%",
        left: "8%",
        display: "flex",
        flexDirection: "colum",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nameandtitle: {
        width: "100%",
        marginTop: "17%",
        height: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
    },
    title: {
        fontSize: 15,
        color: "#6B6B6B",
        marginTop: "5%",
    },
    navbar: {
        marginTop: "12%",
        width: "100%",
        height: "35%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    navbaritem: {
        width: "33%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAEAEA",
        borderColor: "#DBDBDB",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 1,
        borderTopWidth: 1,
    },
    navbaritemwithou: {
        width: "33%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAEAEA",
        borderColor: "#DBDBDB",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 1,
        borderBottomRightRadius: 20,
    },
    navbaritemother: {
        width: "33%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAEAEA",
        borderColor: "#DBDBDB",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomLeftRadius: 20,
    },
    selected: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 15,
    },
    unselected: {
        color: "#6B6B6B",
        fontWeight: "bold",
        fontSize: 13,
    },

})