import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebase } from '../../firebase/config'
import { Icon } from 'react-native-elements';

export default function App({ navigation, route }) {
  function strSort(a)
  {
    return a.sort(function(x,y) {
      return x.toString().localeCompare(y.toString());
    });
  }
    const [object, setObject] = useState([]);
    const [send, setSend] = useState('');
    const dbRef = ref(getDatabase(firebase));
    const user = route.params.other;
    const me = route.params.id;
    const name = strSort([user.idConnect, me]);
    console.log(user);
    const namea = name[0] + name[1];

    async function getinfoindatabase()
    {
      try {
        let snapshot = await get(child(dbRef, `conversation/${namea}`));
        snapshot = snapshot.val();
        if (snapshot == null) {
          createConversation();
          setObject([]);
            return;
        }
        const tmp = Object.keys(snapshot);
        let objectlist = [];
        for (const obj of tmp) {
          objectlist.push(snapshot[obj]);
        }
        const tmp2 = [...objectlist];
        tmp.sort((a, b) => a.date - b.date);
        setObject(tmp);
      } catch(e) {
        setObject([]);
      }
    }
    
    function createConversation()
    {
      const db = getDatabase(firebase);
        const dbname = user.id + me.id;
        set(ref(db, 'conversation/' + namea), {
            user1: id,
            user2: other,
            messages: []
        });
    }

    function sendMessage()
    {
        if (send == '')
            return
        const db = getDatabase(firebase);
        const newMessage = {
            sender: me,
            message: send,
            date: Date.now()
        }
        const lastname = newMessage.sender + newMessage.date;
        set(ref(db, 'conversation/' + namea + '/' + lastname), {
            sender: newMessage.sender,
            message: newMessage.message,
            date: newMessage.date
        });

        //put in feed

        set(ref(db, 'users/' + me + '/feed/' + user.idConnect ), {
            idConnect: user.idConnect,
            lastmessage: newMessage.message,
            read: true,
            name: route.params.other.name + " " + route.params.other.surname,
        });

        set(ref(db, 'users/' + user.idConnect + '/feed/' + me ), {
            idConnect: me,
            lastmessage: newMessage.message,
            read: false,
            name: user.name + " " + user.surname,
        });
        setSend('');
        const tmp = [...object]      
        tmp.push(newMessage);
        setObject(tmp);
    }

    useEffect(() => {
        getinfoindatabase()
    }, []);
 
    useEffect(() => {
        if (object != null) {
            // order by date
        }
    }, [object]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{marginLeft: 10, marginTop: 10}}
                    onPress={() => navigation.navigate('Feed', { id: route.params.id, code: route.params.code, me: route.params.me })}>
                    <Icon
                        name='arrow-left'
                        type='font-awesome'
                        color='#000'
                    />
                </TouchableOpacity>
                <View style = {styles.avatar}></View>
                <View style = {styles.nameandStatus}>
                  <Text style = {styles.name}>{user.name}</Text>
                </View>
            </View>
            <ScrollView style = {{height: "70%", marginTop: 20}}>
                {object.map((item, index) => (
                    item.sender == me ?
                    <View key={index}>
                        <View style = {styles.mt}>
                            <Text style = {styles.mymessage}>{item.message}</Text>
                        </View>
                    </View>
                    :
                    <View key={index}>
                        <View style = {styles.ht}>
                            <Text style = {styles.himmessage}>{item.message}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style = {styles.sender}>
              <TextInput
                  style={{ height: 40, width: "80%", backgroundColor: "#F3F6F6", marginRight: 10, marginLeft: 10, borderRadius: 10}}
                  placeholder="  Send Message"
                  onChangeText={text => setSend(text)}
                  defaultValue={send}>
                </TextInput>
                <TouchableOpacity style={{marginLeft: 8, marginTop: 4, width: 40, height: 40, backgroundColor: '#69DCB0', borderRadius: 50}}
                    onPress={() => sendMessage()}>
                    <Icon style={{marginLeft: 2, marginTop: 6}}
                        name='arrow-up'
                        type='font-awesome'
                        color='white'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    messinfo: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#fff',
        padding: 10
    },
    nameandStatus: {
        marginLeft: 15
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    status: {
        fontSize: 15,
        color: 'grey'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'grey',
        marginLeft: 28
    },
    header: {
        marginTop: 30,
        marginLeft: -5,
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        padding: 10
    },
    //here
    mt: {
        marginTop: 10,
        backgroundColor: '#69DCB0',
        width: '55%',
        marginLeft: "42%",
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 5,
    },
    ht: {
        marginTop: 10,
        backgroundColor: '#E4E4E4',
        width: '55%',
        marginRight: "42%",
        marginLeft: "3%",
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 5,
        borderTopStartRadius: 25,
    },
    mymessage: {
        color: 'white',
        padding: 6,
        margin: 10,
        textAlign: 'right'
    },
    himmessage: {
        color: 'black',
        padding: 10,
        margin: 10,
        textAlign: 'left'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sender: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10
    },
});