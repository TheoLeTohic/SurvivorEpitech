
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { data } from "../../data/peapool"
import { Svg, Path, Use } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export default function App( { navigation }) {
  const [datas, setDatas] = useState(data)
  const [search, setSearch] = useState("")
  const [employe, setEmploye] = useState("")

  const screenWidth = Math.round(Dimensions.get('window').width);
  const screenHeight = Math.round(Dimensions.get('window').height);



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
      })
  }


  useEffect(() => {
    getemploye()
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
    if (search != "") {
      let newdata = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase().includes(search.toLowerCase())) {
          newdata.push(data[i])
        }
      }
      setDatas(newdata)
    } else {
      setDatas(data)
    }
  }


  return (
    <View style={styles.container}>
      <View style = {styles.hellocontainer}>
        <View style = {styles.picture}></View>
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
          <ScrollView style = {styles.filtercat} horizontal= {true}>
            <TouchableOpacity style = {styles.filteritem}>
              <View style= {styles.icon}></View>
              <Text style = {styles.txtfilteritem}>Marketing</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.filteritem}>
              <View style= {styles.icon}></View>
              <Text style = {styles.txtfilteritem}>Marketing</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <View style = {{flex: 1}}>
      <ScrollView style = {styles.allcard}>
      {datas.map((goal, index) => (
        index % 2 == 0 ? (
          (goal.isopen == false ? (
          <TouchableOpacity key={index} onPress={() => toggleOpen(index)} style = {styles.card}>
        <View style = {styles.leftcard}></View>
        <View style = {styles.rightcard}>
          <Text style = {styles.nametxt}>{goal.name} {goal.surname}</Text>
          <Text style = {styles.jobtxt}>{goal.job}</Text>
        </View>
      </TouchableOpacity>
          ) : (
            <TouchableOpacity key={index} onPress={() => toggleOpen(index)} style = {styles.carddev}>
        <View style= {styles.topcard}>
          <View style = {styles.leftcarddev}></View>
          <View style = {styles.rightcarddev}>
          <Text style = {styles.nametxt}>{goal.name} {goal.surname}</Text>
          <Text style = {styles.jobtxt}>undefine</Text>
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
            <TouchableOpacity style = {styles.cardopo} onPress = {() => toggleOpen(index)}>
            <View style = {styles.rightcardopo}>
            <Text style = {styles.nametxtopo}>{goal.name} {goal.surname}</Text>
          <Text style = {styles.jobtxtopo}>undefine</Text>
            </View>
            <View style = {styles.leftcardopo}></View>
          </TouchableOpacity>
            ) : (
              <TouchableOpacity key={index} onPress={() => toggleOpen(index)} style = {styles.carddev}>
          <View style= {styles.topcard}>
            <View style = {styles.leftcarddev}></View>
            <View style = {styles.rightcarddev}>
            <Text style = {styles.nametxt}>{goal.name} {goal.surname}</Text>
            <Text style = {styles.jobtxt}>undefine</Text>
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
      <View style = {styles.navbar}>
        <View style = {styles.navbaritem}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M12.2861 1.21065C12.6472 0.929784 13.1529 0.929784 13.514 1.21065L22.514 8.21065C22.7576 8.4001 22.9 8.69141 22.9 9V20C22.9 20.7957 22.584 21.5587 22.0213 22.1213C21.4587 22.6839 20.6957 23 19.9 23H5.90002C5.10437 23 4.34131 22.6839 3.7787 22.1213C3.21609 21.5587 2.90002 20.7957 2.90002 20V9C2.90002 8.69141 3.0425 8.4001 3.28608 8.21065L12.2861 1.21065ZM4.90002 9.48908V20C4.90002 20.2652 5.00538 20.5196 5.19292 20.7071C5.38045 20.8946 5.63481 21 5.90002 21H19.9C20.1652 21 20.4196 20.8946 20.6071 20.7071C20.7947 20.5196 20.9 20.2652 20.9 20V9.48908L12.9 3.26686L4.90002 9.48908Z" fill="#484C52"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M8.90002 12C8.90002 11.4477 9.34774 11 9.90002 11H15.9C16.4523 11 16.9 11.4477 16.9 12V22C16.9 22.5523 16.4523 23 15.9 23C15.3477 23 14.9 22.5523 14.9 22V13H10.9V22C10.9 22.5523 10.4523 23 9.90002 23C9.34774 23 8.90002 22.5523 8.90002 22V12Z" fill="#484C52"/></Svg>
        </View>
        <View style = {styles.navbaritem}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M11.7 4C7.83402 4 4.70001 7.13401 4.70001 11C4.70001 14.866 7.83402 18 11.7 18C15.566 18 18.7 14.866 18.7 11C18.7 7.13401 15.566 4 11.7 4ZM2.70001 11C2.70001 6.02944 6.72945 2 11.7 2C16.6706 2 20.7 6.02944 20.7 11C20.7 15.9706 16.6706 20 11.7 20C6.72945 20 2.70001 15.9706 2.70001 11Z" fill="#484C52"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M16.6429 15.9429C17.0335 15.5524 17.6666 15.5524 18.0571 15.9429L22.4071 20.2929C22.7977 20.6834 22.7977 21.3166 22.4071 21.7071C22.0166 22.0977 21.3835 22.0977 20.9929 21.7071L16.6429 17.3571C16.2524 16.9666 16.2524 16.3334 16.6429 15.9429Z" fill="#484C52"/>
</Svg>
        </View>
        <View style = {[styles.navbaritem ,styles.selected]}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M9.41651 2.43001C9.6374 2.93619 9.40612 3.52561 8.89994 3.7465C7.55253 4.33448 6.36967 5.24359 5.45478 6.39432C4.53988 7.54506 3.92081 8.9024 3.65167 10.3477C3.38254 11.7929 3.47155 13.2821 3.91091 14.6851C4.35027 16.088 5.12661 17.3619 6.17205 18.3955C7.2175 19.4291 8.50022 20.1908 9.90807 20.6141C11.3159 21.0374 12.806 21.1094 14.2481 20.8238C15.6902 20.5382 17.0404 19.9036 18.1806 18.9757C19.3208 18.0477 20.2164 16.8545 20.7889 15.5005C21.004 14.9918 21.5908 14.7538 22.0994 14.9689C22.6081 15.184 22.8461 15.7708 22.631 16.2794C21.9312 17.9344 20.8367 19.3927 19.4431 20.5269C18.0495 21.6611 16.3993 22.4366 14.6367 22.7857C12.8741 23.1348 11.0529 23.0468 9.33218 22.5294C7.61147 22.012 6.0437 21.081 4.76594 19.8178C3.48817 18.5545 2.53931 16.9975 2.00231 15.2828C1.46532 13.5681 1.35653 11.748 1.68547 9.98153C2.01441 8.21509 2.77106 6.55612 3.88927 5.14966C5.00747 3.74321 6.45319 2.63208 8.10002 1.91343C8.6062 1.69254 9.19562 1.92382 9.41651 2.43001Z" fill="#539DF3"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M11.7929 1.29289C11.9804 1.10536 12.2348 1 12.5 1C13.9445 1 15.3749 1.28452 16.7095 1.83733C18.0441 2.39013 19.2567 3.20038 20.2782 4.22183C21.2996 5.24327 22.1099 6.4559 22.6627 7.79048C23.2155 9.12506 23.5 10.5555 23.5 12C23.5 12.5523 23.0523 13 22.5 13H12.5C11.9477 13 11.5 12.5523 11.5 12V2C11.5 1.73478 11.6054 1.48043 11.7929 1.29289ZM13.5 3.05573V11H21.4443C21.3505 10.1614 21.1391 9.33849 20.8149 8.55585C20.3626 7.46392 19.6997 6.47177 18.864 5.63604C18.0282 4.80031 17.0361 4.13738 15.9442 3.68508C15.1615 3.3609 14.3386 3.14949 13.5 3.05573Z" fill="#539DF3"/>
</Svg>
          <Text style={styles.txtnavbar}>Analytics</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Widjet")} style = {styles.navbaritem}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M5.08714 9.99592H7.14796C9.20878 9.99592 10.2392 8.99384 10.2392 6.98967V4.9855C10.2392 2.98133 9.20878 1.97925 7.14796 1.97925H5.08714C3.02632 1.97925 1.99591 2.98133 1.99591 4.9855V6.98967C1.99591 8.99384 3.02632 9.99592 5.08714 9.99592Z" stroke="black" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.4521 9.99592H19.5129C21.5737 9.99592 22.6041 8.99384 22.6041 6.98967V4.9855C22.6041 2.98133 21.5737 1.97925 19.5129 1.97925H17.4521C15.3913 1.97925 14.3608 2.98133 14.3608 4.9855V6.98967C14.3608 8.99384 15.3913 9.99592 17.4521 9.99592Z" stroke="black" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.4521 22.0208H19.5129C21.5737 22.0208 22.6041 21.0187 22.6041 19.0146V17.0104C22.6041 15.0062 21.5737 14.0042 19.5129 14.0042H17.4521C15.3913 14.0042 14.3608 15.0062 14.3608 17.0104V19.0146C14.3608 21.0187 15.3913 22.0208 17.4521 22.0208Z" stroke="black" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M5.08714 22.0208H7.14796C9.20878 22.0208 10.2392 21.0187 10.2392 19.0146V17.0104C10.2392 15.0062 9.20878 14.0042 7.14796 14.0042H5.08714C3.02632 14.0042 1.99591 15.0062 1.99591 17.0104V19.0146C1.99591 21.0187 3.02632 22.0208 5.08714 22.0208Z" stroke="black" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
        </TouchableOpacity>
        <View style = {styles.navbaritem}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M4.5645 15.4645C5.50218 14.5268 6.77395 14 8.10004 14H16.1C17.4261 14 18.6979 14.5268 19.6356 15.4645C20.5733 16.4021 21.1 17.6739 21.1 19V21C21.1 21.5523 20.6523 22 20.1 22C19.5478 22 19.1 21.5523 19.1 21V19C19.1 18.2044 18.784 17.4413 18.2214 16.8787C17.6587 16.3161 16.8957 16 16.1 16H8.10004C7.30439 16 6.54133 16.3161 5.97872 16.8787C5.41611 17.4413 5.10004 18.2044 5.10004 19V21C5.10004 21.5523 4.65232 22 4.10004 22C3.54775 22 3.10004 21.5523 3.10004 21V19C3.10004 17.6739 3.62682 16.4021 4.5645 15.4645Z" fill="#484C52"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M12.1 4C10.4432 4 9.10004 5.34315 9.10004 7C9.10004 8.65685 10.4432 10 12.1 10C13.7569 10 15.1 8.65685 15.1 7C15.1 5.34315 13.7569 4 12.1 4ZM7.10004 7C7.10004 4.23858 9.33861 2 12.1 2C14.8615 2 17.1 4.23858 17.1 7C17.1 9.76142 14.8615 12 12.1 12C9.33861 12 7.10004 9.76142 7.10004 7Z" fill="#484C52"/>
</Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: "8%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  navbaritem: {
    width: 60,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  selected: {
    marginBottom: 10,
  },
  txtnavbar: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    color: "#539DF3"
  },
  msg: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#171717",
    marginLeft: "5%",
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
    marginLeft: "4%",
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
    width: "90%",
    marginLeft: "-2%",
    height: 100,
    display: "flex",
    flexDirection: "row",

  },
  filteritem: {
    width: 200,
    height: "74%",
    borderRadius: 15,

    backgroundColor: "#F1F5F9",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    display: "flex",
    flexDirection: "row",
    borderColor: "#E5E7EB",
    borderWidth: 1,
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
    backgroundColor: "red",
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
    borderRadius: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftcard: {
    width: "21%",
    borderRadius: 20,
    paddingVertical: "10%",
    height: "80%",
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: "red"
  },
  nametxt: {
    marginLeft: "16%",
    fontSize: 26,
    fontWeight: "600"
  },
  jobtxt: {
    fontSize: 20,
    color : "#78858F",
    marginLeft: "16%"
  },







  carddev: {
    marginVertical: "3%",
    borderRadius: 20,
    flexDirection: "colum",
    display: "flex",
    alignItems: "center",
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
    borderRadius: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  leftcardopo: {
    width: "21%",
    borderRadius: 20,
    paddingVertical: "10%",
    height: "80%",
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: "red"
  },
  nametxtopo: {
    marginRight: "16%",
    fontSize: 26,
    fontWeight: "600"
  },
  jobtxtopo: {
    fontSize: 20,
    color : "#78858F",
    marginRight: "16%"
  },
  rightcardopo: {
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "flex-end"
  }
});
