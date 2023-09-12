import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { data } from "../../data/peapool"
import { Svg, Path, Use } from 'react-native-svg';
import { getDatabase, ref, child, get } from "firebase/database";
import Navbar from '../../Components/NavBar/Navbar';
import firebase from '../../firebase/config';


export default function App({ navigation, route }) {
  const dbRef = ref(getDatabase(firebase));
  const [datas, setDatas] = useState([])
  const [all, setAll] = useState([])
  const [search, setSearch] = useState("")

  async function getemploye() {
    await fetch("https://masurao.fr/api/employees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Group-Authorization": "UkPEzS4kSZu07iSS2d2l4OjA4PDfNiGy",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImVtYWlsIjoib2xpdmVyLmxld2lzQG1hc3VyYW8uanAiLCJuYW1lIjoiT2xpdmVyIiwic3VybmFtZSI6Ikxld2lzIiwiZXhwIjoxNjk1ODI3MjQzfQ.-tSPtN90QZpMxWzO2e-VpQdIZmLwZoOa2i6zwTXNR5E"
      },
      })
      .then((response) => response.json())
      .then((responseData) => {
        for (let i = 0; i < responseData.length; i++) {
          responseData[i].isopen = false
        }
        setDatas(responseData)
        setAll(responseData)
      })
  }

  async function checkCompagny() {
    try {
      let snapshot = await get(child(dbRef, `users/${route.params.id}/cmp`));
      snapshot = snapshot.val();
      console.log(snapshot)
      if (snapshot != null) {
        getemploye()
      }
      else {
        console.log("here")
        navigation.navigate('Code', { id: route.params.id});
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    checkCompagny()
  }, []);

  useEffect(() => {
  }, [datas]);

  function toggleOpen(index) {
    if (datas[index].isopen != true) {
      for (let i = 0; i < datas.length; i++) {
        datas[i].isopen = false;
      }
    }
    setDatas((prevDatas) => {
      const newDatas = [...prevDatas];
      newDatas[index].isopen = !newDatas[index].isopen;
      return newDatas;
    });
  }

  useEffect(() => {
  }, [datas]);
  
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
    funcsearch()
  }, [search]);


  return (
    <View style={styles.container}>
      <View style = {styles.hellocontainer}>
        <Image source={require('../../../assets/avatar.png')} style = {styles.picture}></Image>
        <Text style = {styles.msg}>Hello, Julia</Text>
        <View style = {{marginLeft: "40%"}}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none">
<Path d="M21.0233 14.75V11.1375C21.0233 7.01245 17.8733 3.63745 14.0233 3.63745C10.1617 3.63745 7.02334 6.99995 7.02334 11.1375V14.75C7.02334 15.5125 6.72001 16.675 6.35834 17.325L5.01668 19.7125C4.18834 21.1875 4.76001 22.825 6.27668 23.375C11.305 25.175 16.73 25.175 21.7583 23.375C23.17 22.875 23.7883 21.0875 23.0183 19.7125" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
<Path d="M16.1817 3.9998C15.82 3.8873 15.4467 3.7998 15.0617 3.7498C13.9417 3.5998 12.8683 3.6873 11.865 3.9998C12.2033 3.0748 13.0433 2.4248 14.0233 2.4248C15.0033 2.4248 15.8433 3.0748 16.1817 3.9998Z" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.5233 23.8252C17.5233 25.8877 15.9483 27.5752 14.0233 27.5752C13.0667 27.5752 12.18 27.1502 11.55 26.4752C10.92 25.8002 10.5233 24.8502 10.5233 23.8252" stroke="#171717" stroke-width="1.5" stroke-miterlimit="10"/>
</Svg>
    </View>
        
      </View>
      <View style = {styles.welcomemessage}>
        <Text style = {styles.titlemessage}>Who are you looking for ?</Text>
      </View>
      <View style = {styles.filtercontainer}>
        <View style = {styles.searchbarcontainer}>
          <TextInput style = {styles.searchbar} onSubmitEditing={() => funcsearch()} placeholder = "Search" onChangeText = {(text) => setSearch(text)}></TextInput>
        </View>
        <View style = {styles.filterchoose}>
          <View style = {styles.txtcontainer}>
            <Text style = {styles.txtfilter}>Choose Category</Text>
            <TouchableOpacity style = {styles.seaallbutton}>
              <Text style = {styles.txtseaall}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style = {styles.filtercat} horizontal= {true} showsHorizontalScrollIndicator={ false }>
            <TouchableOpacity style = {styles.filteritem}>
              <Image source={require('../../../assets/marketing-icon.png')} style = {styles.icon}></Image>
              <Text style = {styles.txtfilteritem}>Marketing</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.filteritem}>
              <Image source={require('../../../assets/engineering-icon.png')} style = {styles.icon}></Image>
              <Text style = {styles.txtfilteritem}>Engineering</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.filteritem}>
              <Image source={require('../../../assets/accounting-icon.png')} style = {styles.icon}></Image>
              <Text style = {styles.txtfilteritem}>Accounting</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <View style = {{flex: 1}}>
      <ScrollView style = {styles.allcard} showsVerticalScrollIndicator={ false }>
      {datas.map((goal, index) => (
        index % 2 == 0 ? (
          (goal.isopen == false ? (
          <TouchableOpacity key={index} onPress={() => toggleOpen(index)} style = {styles.card}>
        <View style = {styles.leftcard}></View>
        <View style = {styles.rightcard}>
          <Text style = {styles.nametxt}>{goal.name} {goal.surname}</Text>
          <Text style = {styles.jobtxt}>{"Frontend Developer"}</Text>
        </View>
      </TouchableOpacity>
          ) : (
            <TouchableOpacity key={index} onPress={() => toggleOpen(index)} style = {styles.carddev}>
        <View style= {styles.topcard}>
          <View style = {styles.leftcarddev}></View>
          <View style = {styles.rightcarddev}>
          <Text style = {styles.nametxt}>{goal.name} {goal.surname}</Text>
          <Text style = {styles.jobtxt}>{"Frontend Developer"}</Text>
          </View>
        </View>
        <View style= {styles.bottomcard}>
          <Text style = {styles.descriptiontitle}>Minim dolor in amet nulla laboris</Text>
          <Text style = {styles.descriptioncontent}>Lorem ipsum dolor sit amet, erat consequat orci, sit amet dignissim leo eros eleifend mi. Pellentesque ultrices libero nibh, ac posuere purus luctus at.</Text>
          <Text style = {styles.descriptiondate}>3 September 2019</Text>
          </View>
      </TouchableOpacity>
          ))
        ) : (
          (goal.isopen == false ? (
            <TouchableOpacity key={index} style = {styles.cardopo} onPress = {() => toggleOpen(index)}>
            <View style = {styles.rightcardopo}>
            <Text style = {styles.nametxtopo}>{goal.name} {goal.surname}</Text>
          <Text style = {styles.jobtxtopo}>{"Frontend Developer"}</Text>
            </View>
            <View style = {styles.leftcardopo}></View>
          </TouchableOpacity>
            ) : (
              <TouchableOpacity key={index} onPress={() => toggleOpen(index)} style = {styles.carddev}>
          <View style= {styles.topcard}>
            <View style = {styles.leftcarddev}></View>
            <View style = {styles.rightcarddev}>
            <Text style = {styles.nametxt}>{goal.name} {goal.surname}</Text>
            <Text style = {styles.jobtxt}>{"Frontend Developer"}</Text>
            </View>
          </View>
          <View style= {styles.bottomcard}>
            <Text style = {styles.descriptiontitle}>Minim dolor in amet nulla laboris</Text>
            <Text style = {styles.descriptioncontent}>Lorem ipsum dolor sit amet, erat consequat orci, sit amet dignissim leo eros eleifend mi. Pellentesque ultrices libero nibh, ac posuere purus luctus at.</Text>
            <Text style = {styles.descriptiondate}>3 September 2019</Text>
            </View>
        </TouchableOpacity>
            ))
        )
        ))}
        <View style = {{height: 100}}></View>
      </ScrollView>
      </View>
      <Navbar navigation={navigation} index = {1}/>
    </View>
  );
}

const styles = StyleSheet.create({
  msg: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#171717",
    marginLeft: "5%",
  },
  img: {
    borderRadius: 50,
  },



  hellocontainer: {
    width: "100%",
    height: "20%",
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






  searchbarcontainer: {
    width: "90%",
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginLeft: "-1%",
    marginTop: "30%",
  },
  searchbar: {
    width: "90%",
    height: "100%",
    marginLeft: "5%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B6B6B"
  },
  filtercontainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  filterchoose: {
    width: "90%",
    marginTop: "3.5%",
    height: "auto",
    display: "flex",
    marginLeft: "2%",
    flexDirection: "column",
    justifyContent: "center",
  },
  txtcontainer: {
    width: "100%",
    marginLeft: "0%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2%",
  },
  txtfilter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B6B6B"
  },
  seaallbutton: {
    width: 70,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  }, 
  txtseaall: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B6B6B",
    opacity: 0.5
  },
  filtercat: {
    width: "100%",
    marginLeft: "-1%",
    height: 100,
    display: "flex",
    flexDirection: "row",

  },
  filteritem: {
    width: 170,
    height: "74%",
    borderRadius: 15,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "left",
    display: "flex",
    flexDirection: "row",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    marginRight: 10,
  },
  txtfilteritem: {
    marginLeft: "5%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B6B6B",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginLeft: "5%",
  },




  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    display: "flex",
    flexDirection: "column",
  },
  welcomemessage: {
    marginTop: "-8%",
    marginLeft: "5%",
  },
  titlemessage: {
    fontSize: 32,
    fontWeight: "bold",
  },
  namemessage: {
    fontSize: 24,
    color: "#6B6B6B",
    fontWeight: "bold",
  },
  allcard: {
    marginTop: "25%",
    width: "96%",
    marginLeft: "2%",
    paddingHorizontal: "3%",
    height: "200%",
  },
  card: {
    marginVertical: "3%",
    height: 105,
    borderRadius: 10,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftcard: {
    width: "21%",
    borderRadius: 10,
    paddingVertical: "10%",
    height: "80%",
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: "red"
  },
  rightcard: {
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "flex-end",
    marginRight: "5%"
  },
  nametxt: {
    marginLeft: "16%",
    fontSize: 20,
    fontWeight: "600"
  },
  jobtxt: {
    fontSize: 16,
    color : "#78858F",
    marginLeft: "16%"
  },







  carddev: {
    marginVertical: "3%",
    borderRadius: 20,
    flexDirection: "colum",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftcarddev: {
    width: 70,
    borderRadius: 1990,
    height: 70,
    backgroundColor: "red"
  },
  nametxtdev: {
    marginLeft: "5%",
    fontSize: 26,
    fontWeight: "600"
  },
  jobtxtdev: {
    marginTop: 7,
    fontSize: 20,
    color : "#78858F",
    marginLeft: "5%"
  },
  topcard: {
    marginLeft: "-25%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%",
  },
  bottomcard: {
    marginTop: "7%",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    width: "90%",
    height: "auto",
    paddingBottom: 20,
    marginBottom: "2%",
  },
  descriptiontitle: {
    fontSize: 30,
    fontWeight: "bold"
  },
  descriptioncontent: {
    fontSize: 20,
    marginTop: "6%",
    fontWeight: "bold",
    color: "#676767"
  },
  descriptiondate: {
    fontSize: 20,
    marginTop: "4%",
    color: "#78858F"
  },









  cardopo: {
    marginVertical: "3%",
    height: 105,
    borderRadius: 10,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftcardopo: {
    width: "21%",
    borderRadius: 10,
    paddingVertical: "10%",
    height: "80%",
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: "red"
  },
  nametxtopo: {
    marginRight: "16%",
    fontSize: 20,
    fontWeight: "600"
  },
  jobtxtopo: {
    fontSize: 16,
    color : "#78858F",
    marginRight: "16%"
  },
  rightcardopo: {
    marginLeft: "5%",
  }
});
