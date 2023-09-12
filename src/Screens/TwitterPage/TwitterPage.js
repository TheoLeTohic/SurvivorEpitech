import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { firebase } from "../../firebase/config";
import { getDatabase, ref, child, get, set } from "firebase/database";

export default function TwitterPage({ navigation, route }) {
    const teamId = "2332"
    const userId = "1234";
    const dbRef = ref(getDatabase(firebase));
    const [message, setMessage] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState("new message from react");

    async function getallMessage() {
        try {
            let snapshot = await get(child(dbRef, `factory/${teamId}/messages`));
            snapshot = snapshot.val();
            const tmp = Object.keys(snapshot);
            let objectlist = [];
            for (const obj of tmp) {
                objectlist.push(snapshot[obj]);
            }
            setMessage(objectlist);
          } catch(e) {
            console.log(e)
          }
    }

    React.useEffect(() => {
        getallMessage();
    }, []);

    React.useEffect(() => {
    }, [message]);

    return (
        <View style={styles.container}>
        <Text>Message:</Text>
        {message.map((item, index) => (
            <Text key={index}>{item.content}</Text>
        ))}
        <TextInput value={newMessage} onChangeText={Text => setNewMessage(Text)} />
        <TouchableOpacity onPress={() => {
            setNewMessage("");
            setMessage([...message, newMessage]);
            set(ref(getDatabase(firebase), `factory/${teamId}/messages/${message.length}`), {
                content: newMessage,
                user: userId,
            });}}>
            <Text>Send</Text>
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    });