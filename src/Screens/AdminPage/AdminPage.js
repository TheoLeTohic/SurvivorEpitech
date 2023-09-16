import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity , Image} from 'react-native';
import { useState, useEffect } from 'react';
import { NavBar, NewEmployeesBlock, TotalEmployees, CompagnyCode, EmployeesList } from '../../Components/index';
import Svg, { Path } from "react-native-svg";
import { getDatabase, ref, child, get, set } from "firebase/database";
import firebase from '../../firebase/config';

export default function App( { navigation, route }) {
    const companycode = route.params.code;
    const [autorizewidgets, setAutorizewidgets] = useState([]);
    const [allwidgets, setAllwidgets] = useState(["Calendar", "Meteo", "Task", "Maps"]);
    const [memberlist, setMemberlist] = useState([]);
    const dbRef = ref(getDatabase());
    const [data, setData] = useState([]);
    const [datas, setDatas] = useState([]);

    async function getcompagnyWidgets() {
        try {
          let snapshot = await get(child(dbRef, `factory/${companycode}`));
          snapshot = snapshot.val();
          setData(snapshot);
          snapshot = snapshot.autorizewidgets;
          const tmp = Object.keys(snapshot);
          let objectlist = [];
          for (const obj of tmp) {
            objectlist.push(snapshot[obj]);
          }
          objectlist = objectlist[0].split(",");
          setAutorizewidgets(objectlist);
          if (objectlist.length > 0) {
            const tmp2 = [];
            for (const widget of allwidgets) {
                if (!objectlist.includes(widget)) {
                    tmp2.push(widget);
                }
            }
            setAllwidgets(tmp2);
        }
        console.log(autorizewidgets)
        } catch(e) {
            console.log(e)
          setAutorizewidgets("error");
        }
    }

    async function getemploye() {
        try {
          let snapshot = await get(child(dbRef, `users`));
          snapshot = snapshot.val();
          const employees = Object.values(snapshot);
          for (let i = 0; i < employees.length; i++) {
            employees[i].isopen = false;
          }
            setDatas(employees)
        } catch(e) {
            console.log(e)
        }
      }

    async function setAllwidgetsdb() {
        if (autorizewidgets.length == 0) {
            return;
        }
        try {
            await set(ref(getDatabase(firebase), `factory/${companycode}/autorizewidgets`), {
                autorizewidgets: autorizewidgets.toString(),
                });
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(memberlist)
    }, [memberlist])

    useEffect(() => {
        setAllwidgetsdb()
    }, [allwidgets])

    useEffect(() => {
        if (datas == undefined)
          setDatas([])
        if (datas.length > 0) {
          console.log(datas.length)
          console.log(datas.filter((data) => data.cmp.compagny == route.params.code).length)
        } 
      }, [datas]);

    function autorize(name) {
        const tmp2 = [...allwidgets];
        const index = tmp2.indexOf(name);
        if (index > -1) {
            tmp2.splice(index, 1);
            setAllwidgets(tmp2);
        }
        const tmp = [...autorizewidgets];
        tmp.push(name);
        setAutorizewidgets(tmp);
    }
    
    function unautorize(name) {
            const tmp = [...autorizewidgets];
            const index = tmp.indexOf(name);
            if (index > -1) {
                tmp.splice(index, 1);
            }
            setAutorizewidgets(tmp);
            const tmp2 = [...allwidgets];
            tmp2.push(name);
            setAllwidgets(tmp2);
    }

    useEffect(() => {
        getemploye()
        getcompagnyWidgets()
    }, [])

    console.log("test", route.params.code)
  return (
    <View style={styles.container}>
        <View style = {styles.hellocontainer}>
        <Image source={require('../../../assets/avatar.png')} style = {styles.picture}></Image>
        <Text style = {styles.msg}>Welcome, {route.params.me.name}</Text>
        <View style = {{marginLeft: "40%"}}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none">
<Path d="M21.0233 14.75V11.1375C21.0233 7.01245 17.8733 3.63745 14.0233 3.63745C10.1617 3.63745 7.02334 6.99995 7.02334 11.1375V14.75C7.02334 15.5125 6.72001 16.675 6.35834 17.325L5.01668 19.7125C4.18834 21.1875 4.76001 22.825 6.27668 23.375C11.305 25.175 16.73 25.175 21.7583 23.375C23.17 22.875 23.7883 21.0875 23.0183 19.7125" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<Path d="M16.1817 3.9998C15.82 3.8873 15.4467 3.7998 15.0617 3.7498C13.9417 3.5998 12.8683 3.6873 11.865 3.9998C12.2033 3.0748 13.0433 2.4248 14.0233 2.4248C15.0033 2.4248 15.8433 3.0748 16.1817 3.9998Z" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.5233 23.8252C17.5233 25.8877 15.9483 27.5752 14.0233 27.5752C13.0667 27.5752 12.18 27.1502 11.55 26.4752C10.92 25.8002 10.5233 24.8502 10.5233 23.8252" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10"/>
</Svg>
    </View>
        
        </View>
        <View style = {{width: "100%", height: "19.9%", display: "flex", flexDirection: "row", alignItems: "center",}}>
        <NewEmployeesBlock data = {datas.filter((data) => data.cmp.compagny == route.params.code).length}/>
        <TotalEmployees data = {datas.filter((data) => data.cmp.compagny == route.params.code).length} max = {50}/>
        </View>
        <CompagnyCode code = {route.params.code}/>
        <EmployeesList member = {datas} code = {route.params.code}/>
        <View style = {styles.containere}>
                <View style = {styles.topcontainer}>
                    <Text style = {styles.title}>Widgets</Text>
                    <TextInput style = {styles.searchbar} placeholder = "Search user..."/>
                </View>
                {autorizewidgets.map((item, index) => (
                    item == "duo" ? null : (
                    index == autorizewidgets.length - 1 ?
                        <View style = {styles.cardlast}>
                        <View style = {styles.picture}><Image source={require('../../../assets/' + "Calendar" + '.png')} resizeMode='cover' style = {styles.imglittle}></Image></View>
                        <Text style = {styles.name}>{item}</Text>
                        <Text style = {styles.date}></Text>
                        <TouchableOpacity onPress={() => unautorize(item)} style = {styles.jobcontainergreen}>
                            <Text style = {styles.jobgreen}>Add</Text>
                        </TouchableOpacity>
                    </View> 
                    :
                    <View style = {styles.cardlast}>
                    <View style = {styles.picture}><Image source={require('../../../assets/' + "Calendar" + '.png')} resizeMode='cover' style = {styles.imglittle}></Image></View>
                    <Text style = {styles.name}>{item}</Text>
                    <Text style = {styles.date}></Text>
                    <TouchableOpacity onPress={() => unautorize(item)} style = {styles.jobcontainergreen}>
                        <Text style = {styles.jobgreen}>Add</Text>
                    </TouchableOpacity>
                </View>
                )
                ))}
                {allwidgets.map((item, index) => (
                    index == allwidgets.length - 1 ?
                    <View style = {styles.cardlast}>
                    <View style = {styles.picture}><Image source={require('../../../assets/' + "Calendar" + '.png')} resizeMode='cover' style = {styles.imglittle}></Image></View>
                    <Text style = {styles.name}>{item}</Text>
                    <Text style = {styles.date}></Text>
                    <TouchableOpacity onPress={() => autorize(item)} style = {styles.jobcontainerred}>
                        <Text style = {styles.jobred}>Remove</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style = {styles.card}>
                <View style = {styles.picture}><Image source={require('../../../assets/' + "Calendar" + '.png')} resizeMode='cover' style = {styles.imglittle}></Image></View>
                <Text style = {styles.name}>{item}</Text>
                <Text style = {styles.date}></Text>
                <TouchableOpacity onPress={() => autorize(item)} style = {styles.jobcontainerred}>
                    <Text style = {styles.jobred}>Remove</Text>
                </TouchableOpacity>
            </View>
                ))}                
            </View>
        <NavBar navigation={navigation} index = {3} id = {route.params.id} code = {route.params.code} me = {route.params.me}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  hellocontainer: {
    marginLeft: "4.8%",
    width: "60%",
    height: "12%",
    marginTop: "5%",
    marginBottom: "7%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  picture: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "red",
    marginLeft: "4%",
  },
  msg: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#171717",
    marginLeft: "5%",
  },
  picture: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: "5.8%",
},
  img: {
    borderRadius: 50,
  },
  containere: {
    marginTop: "4.44%",
    marginLeft: "5.8%",
    width: "88.4%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#D3D3D3",
    borderRadius: 20,
},
topcontainer: {
    width: "100%",
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderBottomWidth: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
},
title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#171717",
    marginLeft: "12%",
},
searchbar: {
    width: "48%",
    height: "60%",
    marginLeft: "auto",
    marginRight: "5.8%",
    backgroundColor: "#FFFF",
    borderRadius: 5,
    paddingLeft: "2.8%",
    borderColor: "#D3D3D3",
    borderWidth: 1,
},
card: {
    width: "100%",
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderBottomWidth: 1,
},
cardlast: {
    width: "100%",
    height: 35,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
},
imglittle: {
    marginTop: "10%",
    width: 25,
    height: 25,
    marginLeft: "5.8%",
},
name: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#171717",
    marginLeft: "5.8%",
},
date: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#171717",
    marginLeft: "auto",
},
jobcontainerred: {
    width: 50,
    height: 20,
    backgroundColor: "#FFCBCB",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "5.8%",
},
jobred: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#F55",
},
jobcontaineryellow: {
    width: 50,
    height: 20,
    backgroundColor: "#FEFFCB",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "5.8%",
},
jobyellow: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFC700",
},
jobcontainerblue: {
    width: 50,
    height: 20,
    backgroundColor: "#CBD6FF",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "5.8%",
},
jobblue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#5585FF",
},
jobcontainergreen: {
    width: 50,
    height: 20,
    backgroundColor: "#D8FFCB",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "5.8%",
},
jobgreen: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#00B412",
},
});