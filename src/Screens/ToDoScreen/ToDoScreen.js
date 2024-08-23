import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get, set, del } from "firebase/database";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


export default function App( { navigation, route }) {
    const [task, setTask] = useState(route.params.list)
    const [newtask, setNewtask] = useState("")
    console.log(task)


    useEffect(() => {
        const db = getDatabase();
        set(ref(db, 'users/' + route.params.id + '/todo'), null);
        for (let i = 0; i < task.length; i++) {
            set(ref(db, 'users/' + route.params.id + '/todo/' + i), {
                name: task[i].name,
                done: task[i].done,
            });
        }
    }
    , [task])

    function onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (gestureName) {  
          case SWIPE_UP:
            console.log("up");
            break;
          case SWIPE_DOWN:
            console.log("down");
            break;
          case SWIPE_LEFT:
            break;
          case SWIPE_RIGHT:
            navigation.goBack();
            break;
        }
      }

      const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
    return (
        <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        config={config}
        style={{
          flex: 1,
        }}
        >
        <View style={styles.container}>
            <Text style = {styles.title}>To Do List</Text>
            <ScrollView style={styles.alltask}>
                {task.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.task} onPress={() => {
                        const tmp = [...task];
                        tmp[index].done = !tmp[index].done;
                        setTask(tmp);
                    }}>
                        <View style={styles.leftside}>
                            {item.done === true ? <View style = {styles.selectedcircle}></View> : <View style = {styles.circle}></View>}
                            {item.done === true ? <Text style = {styles.txtdone}>{item.name}</Text> : <Text style = {styles.tasktxt}>{item.name}</Text>}
                        </View>
                        {item.done === true ?
                        <TouchableOpacity style={styles.remove} onPress={() => {
                            const tmp = [...task];
                            tmp.splice(index, 1);
                            setTask(tmp);
                        }
                        }><Text style={styles.removetext}>Remove</Text></TouchableOpacity>
                        : <Text></Text>}
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
            <TextInput style={styles.searchbar} onSubmitEditing={() => {
                const tmp = [...task];
                tmp.push({name: newtask, done: false});
                setTask(tmp);
                setNewtask("");
            }
            } onChangeText={text => setNewtask(text)} value={newtask}/>
        </View>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fff',
    },
    title: {
        width: "103%",
        paddingBottom: "3%",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: "10%",
        borderWidth: 2,
        borderBottomColor: "#000000",
        borderRadius: 20,
    },
    leftside: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    alltask: {
        width: "90%",
        height: "60%",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
    },
    selectedcircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: "black",
    },
    task: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#ffffff7d",
        marginTop: 20,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#676767",
    },
    tasktxt: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "15%",
    },
    txtdone: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: "15%",
        textDecorationLine: "line-through",
    },
    remove: {
        backgroundColor: "black",
        borderRadius: 5,
    },
    removetext: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchbar: {
        width: "90%",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: "5%",
        marginBottom: "5%",
        paddingVertical: "2%",
        fontSize: 18,
    },
});