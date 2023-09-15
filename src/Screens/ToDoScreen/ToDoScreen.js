import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { WeatherApi } from '../../data/WeatherApi';
import Swiper from "react-native-swiper"
import { getDatabase, ref, child, get, set, del } from "firebase/database";
import firebase from '../../firebase/config';

export default function App( { navigation, route }) {
    const [task, setTask] = useState(route.params.list)
    const [newtask, setNewtask] = useState("")
    console.log(task)


    useEffect(() => {
        console.log(task)
        if (task != [])
        {
            const db = getDatabase();
            set(ref(db, 'users/' + route.params.id + '/todo'), null);
            for (let i = 0; i < task.length; i++)
            {
                set(ref(db, 'users/' + route.params.id + '/todo/' + i), {
                    name: task[i].name,
                    done: task[i].done,
                });
            }
        }
    }
    , [task])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.alltask}>
                {task.map((item, index) => (
                    <View key={index} style={styles.task}>
                        {item.done == true ? <Text style = {styles.txtdone}>{item.name}</Text> : <Text style = {styles.tasktxt}>{item.name}</Text>}
                        <TouchableOpacity onPress={() => {
                            const tmp = [...task];
                            tmp[index].done = !tmp[index].done;
                            setTask(tmp);
                        }
                        }><Text>Done</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const tmp = [...task];
                            tmp.splice(index, 1);
                            setTask(tmp);
                        }
                        }><Text>Remove</Text></TouchableOpacity>
                    </View>
                ))
                }
            </ScrollView>
            <TextInput style = {{height: 40, borderColor: 'gray', borderWidth: 1}} onSubmitEditing={() => {
                const tmp = [...task];
                tmp.push({name: newtask, done: false});
                setTask(tmp);                
            }
            } onChangeText={text => setNewtask(text)} value={newtask}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    alltask: {
        marginTop: "10%",
        marginLeft: "10%",
        width: "80%",
        height: "60%",
    },
    task: {
        height: 50,
        width: "100%",
        backgroundColor: "#ffffff7d",
        borderRadius: 20,
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        shadowColor: "#000000",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    tasktxt: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "5%",
    },
    txtdone: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "5%",
        textDecorationLine: "line-through",
    },
});