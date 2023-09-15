import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
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
              setDatas(employees.filter((item) => item.cmp.compagny == route.params.code));
              setAll(employees.filter((item) => item.cmp.compagny == route.params.code));
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
    }
    , [search]);

    useEffect(() => {
    }, [opens]);


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <TextInput onFocus={() => setOpens(!opens)} placeholder='Search' style={{ borderWidth: 1, borderColor: '#000', borderRadius: 10, padding: 10, width: '80%' , marginTop: 100}} onChangeText={(text) => setSearch(text)} />
                <ScrollView style = {opens ? styles.searchuser : {display: "none"}}>
                    {datas.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('Conv', { id: route.params.id, code: route.params.code, me: route.params.me, other: item })}>
                                <View style={{ backgroundColor: '#fff', padding: 10, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: '#000' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
            {data == [] ? <Text>Nothing to see here</Text> : <ScrollView>
                {data.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate('Conv', { id: route.params.id, code: route.params.code, me: route.params.me, other: item })}>
                            <View style={{ backgroundColor: '#fff', padding: 10, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: '#000' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name} {item.surname}</Text>
                                {item.read ? <Text style={{ fontSize: 15 }}>{item.lastmessage}</Text> : <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.lastmessage}</Text>}
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
        backgroundColor: '#fff',
    },
});