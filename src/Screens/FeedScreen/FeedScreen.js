import {StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebase } from '../../firebase/config'
import Navbar from '../../Components/NavBar/Navbar';

export default function App({ navigation, route }) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [datas, setDatas] = useState([]);
    const [all, setAll] = useState([]);
    const[opens, setOpens] = useState(false);

    async function getData() {
        const dbRef = ref(getDatabase());
        try {
            let snapshot = await get(child(dbRef, `users/${route.params.id}/feed`));
            snapshot = snapshot.val();
            setData(Object.values(snapshot));
          } catch(e) {
              console.log(e)
          }
    }

    async function getuser() {
        const dbRef = ref(getDatabase());
        try {
            let snapshot = await get(child(dbRef, `users`));
            snapshot = snapshot.val();
            const employees = Object.values(snapshot);
            for (let i = 0; i < employees.length; i++) {
              employees[i].isopen = false;
            }
              setDatas(employees.filter((item) => item.cmp.compagny === route.params.code));
              setAll(employees.filter((item) => item.cmp.compagny === route.params.code));
          } catch(e) {
              console.log(e)
          }
    }

    function funcsearch() {
        if (search !== "") {
          let newdata = []
          for (let i = 0; i < datas.length; i++) {
            if (datas[i].name.toLowerCase().includes(search.toLowerCase()) || datas[i].surname.toLowerCase().includes(search.toLowerCase())) {
              newdata.push(datas[i])
            }
          }
          setDatas(newdata)
        } else {
          setDatas(all)
        }
      }

    useEffect(() => {
        getData();
        getuser();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        console.log("datas", datas);
    }, [datas]);

    useEffect(() => {
        funcsearch();
    }, [search]);


    return (
        <View style={styles.container}>
            <View style={styles.topcontainer}>
                <TextInput onFocus={() => setOpens(!opens)} placeholder='Search' style={styles.searchbar} onChangeText={(text) => setSearch(text)} />
                <ScrollView style = {opens ? styles.viewusers : {display: "none"}}>
                    {datas.map((item, index) => {
                        return (
                            <TouchableOpacity style={styles.profilebutton} key={index} onPress={() => navigation.navigate('Conv', { id: route.params.id, code: route.params.code, me: route.params.me, other: item })}>
                                <View style={styles.profilecontainer}>
                                    <View style={styles.circle}>
                                        <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#fff' }}>{item.name[0].toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.rightcontainer}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: '3%' }}>{item.surname}</Text>
                                        </View>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: "grey" }}>{item.job}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            {data == [] ? <Text>Nothing to see here</Text>
                : <ScrollView>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Conv', { id: route.params.id, code: route.params.code, me: route.params.me, other: item })}>
                            <View style={styles.chatcontainer}>
                                <Image source={require("../../../assets/chat.png")} style={{width: 30, height: 30}}/>
                                <View style={styles.righttextcontainer}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name} {item.surname}</Text>
                                    {item.read ? <Text style={{ fontSize: 15 }}>{item.lastmessage}</Text> : <Text style={{ fontSize: 15, fontWeight: "400" }}>{item.lastmessage}</Text>}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>}
        <Navbar navigation={navigation} index = {2} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topcontainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "10%",
    },
    searchbar: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 10,
        padding: "3%",
    },
    viewusers: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
    },
    profilebutton: {
        width: '100%',
    },
    profilecontainer: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50/2,
        backgroundColor: 'blue',
        marginRight: 15,
    },
    rightcontainer: {
        display: 'flex',
        width: '75%',
    },
    chatcontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    righttextcontainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
    }
});