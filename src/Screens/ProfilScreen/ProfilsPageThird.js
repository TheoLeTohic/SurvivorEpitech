import {
    StyleSheet,
    ScrollView,
    View,
    ImageBackground,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavBar, ProfilHead, TeamMember, ExtraBlock } from '../../Components/index';
import req from '../../data/Req.js'
import {BlurView} from "expo-blur";
import {fetchDataFromDatabase, setDataToDatabase} from "../../data/FirebaseUtils";

export default function App( { navigation, route }) {
    const [myinformation, setMyinformation] = useState();
    const [pp, setPp] = useState(null);
    const [infoTitle, setInfoTitle] = useState("");
    const [valueInput, setValueInput] = useState("");
    const [descInput, setDescInput] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1ODI3MjQzfQ.-tSPtN90QZpMxWzO2e-VpQdIZmLwZoOa2i6zwTXNR5E"
    const [extraBlocks, setExtraBlocks] = useState([])

    const addNewBlock = () => {
        const newBlock = {
            title: infoTitle,
            value: valueInput,
            desc: descInput,
            icon: require("../../../assets/bulb.png"),
        }

        const success = setDataToDatabase("users/" + route.params.id + `/extra/${newBlock.title}`, newBlock)

        if (success)
            setExtraBlocks(prevBlocks => [...prevBlocks, newBlock])
        setModalVisible(false)
    }

    async function getEmployee() {
        fetchDataFromDatabase("users/" + route.params.id).then((res) => {
            setMyinformation(res)
        })
    }
    async function transformPicture(picture) {
        const arrayBuffer = await picture.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return Promise.resolve('data:image/png;base64,' + base64);
    }

    useEffect(() => {async function getPp() {
        const image = await req.doReq(bearer_token, "https://masurao.fr/api/employees/" + myinformation.id +"/image")
        const image64 = await transformPicture(image)
        setPp(image64)
    }
    if (myinformation != null) {
        getPp()
    }
    }, [myinformation])

    useEffect(() => {
        async function fetchBlocks() {
            const blocks = await fetchDataFromDatabase("users/" + route.params.id + "/extra")
            blocks.map(block => block.icon = require("../../../assets/bulb.png"))
            if (blocks == null) {
                setExtraBlocks([])
                return;
            }
            setExtraBlocks(blocks)
        }
        fetchBlocks().then(r => r)
        getEmployee().then(r => r)
    }, []);
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.png')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                {pp == null && <View style = {styles.photo}></View>}
                {pp != null && <Image source={{ uri: pp }} style={styles.photo} />}
                <ProfilHead index = {3} navigation = { navigation } my = {myinformation} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
                <View style = {styles.pagecontainer}>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
                        <View style = {styles.body}>
                            {extraBlocks.map((block, index) => (
                                <ExtraBlock key={index} title={block.title} value={block.value} desc={block.desc} icon={block.icon} />
                            ))}
                        </View>
                        <View style = {{height: 100}}/>
                    </ScrollView>
                </View>
                <TouchableOpacity style = {styles.modifybutton} onPress={() => setModalVisible(true)}>
                    <Image source={require('../../../assets/add.png')} style={styles.modifybuttonimage}/>
                </TouchableOpacity>
                <NavBar navigation={navigation} index = {5} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
            </ImageBackground>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <BlurView
                    intensity={20}
                    tint="dark"
                    style={styles.modal}
                >
                    <View style = {styles.card}>
                        <Text style = {styles.cardtitle}>New Information</Text>
                        <Text style = {styles.citytitle}>Information Title</Text>
                        <TextInput
                            placeholder="Enter new information title..."
                            value={infoTitle}
                            onChangeText={(text) => setInfoTitle(text)}
                            style = {styles.addressform}
                            placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                        />
                        <Text style = {styles.citytitle}>Information Value</Text>
                        <View style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "80%"}}>
                            <TextInput
                                placeholder="Enter value..."
                                value={valueInput}
                                onChangeText={(text) => setValueInput(text)}
                                style = {styles.dateform}
                                placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                            />
                            <TextInput
                                placeholder="Enter description..."
                                value={descInput}
                                onChangeText={(text) => setDescInput(text)}
                                style = {styles.dateform}
                                placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                            />
                        </View>
                        <View style = {styles.buttoncontainer}>
                            <TouchableOpacity style = {styles.cancelbutton} title="Cancel" onPress={() => setModalVisible(false)}>
                                <Text style = {{color: "#000000"}}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.savebutton} title="Save" onPress={addNewBlock} >
                                <Text style = {{color: "#fff", fontWeight: "400"}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '60%',
        paddingHorizontal: '8%',
        marginTop: '27%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
    },
    pagecontainer: {
        marginTop: '70%',
        borderRadius: 25,
        width: '100%',
        height: '70%',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
    },
    photo: {
        zIndex: 2,
        width: "23%",
        height: "11%",
        backgroundColor: "red",
        position: "absolute",
        top: "14%",
        left: "39%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 1000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollview: {
        width: '100%',
    },
    modifybutton: {
        display: "flex",
        backgroundColor: "#dcdcdc",
        borderRadius: 1000,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: "10%",
        left: "80%",
    },
    modifybuttonimage: {
        width: 25,
        height: 25,
        tintColor: "#56AF8DFF",
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
    dateform: {
        width: "48%",
        borderRadius: 5,
        padding: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        marginBottom: 20,
    },
    card: {
        width: "80%",
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
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


});