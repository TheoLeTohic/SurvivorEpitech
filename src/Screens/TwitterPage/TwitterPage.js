import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, Button, Image } from "react-native";
import React from "react";
import Navbar from '../../Components/NavBar/Navbar';
import { firebase } from "../../firebase/config";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TwitterPage({ navinavigationgation, route }) {
    const teamId = "2332";
    const userId = "1234";
    const dbRef = ref(getDatabase(firebase));
    const [messages, setMessages] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("");

    async function fetchMessages() {
        try {
            const snapshot = await get(child(dbRef, `factory/${teamId}/messages`));
            const data = snapshot.val();
            if (data) {
                const messagesArray = Object.values(data);
                setMessages(messagesArray);
            }
        } catch (e) {
            console.log(e);
        }
    }

    React.useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const updatedMessages = [...messages, { content: newMessage, user: userId }];
            setMessages(updatedMessages);
            set(ref(getDatabase(firebase), `factory/${teamId}/messages/${updatedMessages.length}`), {
                content: newMessage,
                user: userId,
            });
            setNewMessage("");
        }
    };

    const [isModalVisible, setModalVisible] = React.useState(false);

    const handleSaveMessage = () => {
        handleSendMessage();
        setModalVisible(false);
    };

    const [modalMessage, setModalMessage] = React.useState("");

    const handleSaveModalMessage = () => {
        if (modalMessage.trim()) {
            const updatedMessages = [...messages, { content: modalMessage, user: userId }];
            setMessages(updatedMessages);
            set(ref(getDatabase(firebase), `factory/${teamId}/messages/${updatedMessages.length}`), {
                content: modalMessage,
                user: userId,
            });
            setModalMessage("");
            setModalVisible(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={ styles.circle1 } />
            <View style={ styles.circle2 } />
            <Text style={styles.textTitle}>Welcome back</Text>
            <Text style={styles.textUsername}>Aymeric</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {messages.map((item, index) => (
                    <View style={styles.messageContainer} key={index}>
                        <Text style={styles.textName}>{item.user}</Text>
                        <Text style={styles.textJob}>Front-end Developer</Text>
                        <Text style={styles.messageText}>{item.content}</Text>
                        <TouchableOpacity style={styles.rowLikeAndComment}>
                            <Image source={require('../../../assets/twitterL.png')} style = {styles.icon}></Image>
                            <Text style={styles.likeAndComment}>Like</Text>
                            <Image source={require('../../../assets/comment.png')} style = {styles.icon}></Image>
                            <Text style={styles.likeAndComment}>Comment</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message..."
                style={styles.input}
            />
            <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Text>Send</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.ellipse}></View>
            </TouchableWithoutFeedback>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>WRITE YOUR MESSAGE:</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={modalMessage}
                            onChangeText={setModalMessage}
                            placeholder="Type here..."
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={handleSaveModalMessage} style={styles.saveButton}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </View>
                </View>
            </Modal>


            <Navbar navigation={navigation} index={4} />
        </SafeAreaView>
    );}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
    },

    scrollViewContent: {
      //  flex: 1, // Allow the ScrollView content to expand to fill the available space
        //width: "100%",
      },

    textTitle: {
        width: "100%",
        left: "10%",
        fontWeight: "600",
        fontSize: 32,
        color: "#FFFFFF",
      },

    textUsername: {
        width: "100%",
        left: "10%",
        fontWeight: "400",
        fontSize: 25,
        color: "#FFFFFF",
        marginBottom: "3%",
    },

    messageContainer: {
        width: "90%",
        marginVertical: "4%", // Add some vertical margin for spacing between boxes
        alignSelf: 'center', // Center the box horizontally
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 1,
        borderColor: "#FFFFFF",
        borderRadius: 20,
        padding: "5%", // Add some padding inside the box
    },

    icon: {
        width: 30,
        height: 30,
        borderRadius: 50,
        // marginTop: "%",
    },

    rowLikeAndComment: {
        flexDirection: 'row',
        // justifyContent: 'space-between',

        width: '100%',
    },

    likeAndComment: {
        margin: "2%",
        fontWeight: '600',
        fontSize: 12,
    },

    ellipse: {
        position: 'absolute',
        width: 50,
        height: 50,
        left: 310,
        top: 649,
        backgroundColor: '#2587F9',
        borderRadius: 25, // To create a circle, set borderRadius to half of the width/height
    },

    textName: {
    width:  "100%",
    left: "20%",
    top: "10%",
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    },

    textJob: {
        width:  "100%",
        left: "20%",
        top: "10%",
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16,
        paddingBottom: "15%",
        color: '#000000',
    },

    messageText: {
        width:  "100%",
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16,
        paddingBottom: "5%",
        color: '#000000',
    },

      loremText: {
        width: "100%",
        left: "2.5%",
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 20,
        color: '#303030',
      },

      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        // alignItems: 'center',
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: "10%",
        marginBottom: "10%",
    },

    modalInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 50,
        marginBottom: "10%",
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        display: 'flex',
        alignItems: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#2FDB73",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 50,
    },
    cancelButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#EAEAEA",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 50,
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    circle1: {
        position: 'absolute',
        width: '186.666666667%',
        height: '86.2068965517%',
        borderRadius: 700 / 2,
        backgroundColor: '#74D294',
        top: -414,
        left: -284,
    },

    circle2: {
        backgroundColor: '#74D294',
        position: 'absolute',
        width: '122.4%',
        height: '49.01477%',
        borderRadius: 459 / 2,
        top: 579,
        left: 154,
    },
    
  
      
    });

