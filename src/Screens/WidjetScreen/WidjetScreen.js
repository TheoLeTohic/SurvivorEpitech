import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';


export default function App( { navigation }) {
  const api = "5e5ba64ce2bba79dba8420c77f1ced3c"

  const [city, setCity] = useState("Barcelona")
  const [weather, setWeather] = useState({})

  //make a call to the api

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=97738c75467adb40204f72417c447761&units=metric&lang=fr`)
    .then((response) => response.json())
    .then((json) => {
      setWeather(json)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  useEffect(() => {
    console.log(weather.main.temp)
  }, [weather])

  return (
    <View style={styles.container}>
      <View style = {styles.calendar}>
        <View style = {styles.calendarday}>
          <Text style = {styles.daywithoutevent}>Mo</Text>
          <Text style = {styles.date}>1</Text>
        </View>
        <View style = {styles.calendarday}>
          <Text style = {styles.daywithoutevent}>Tu</Text>
          <Text style = {styles.date}>2</Text>
        </View>
        <View style = {styles.calendarday}>
          <Text style = {styles.daywithoutevent}>We</Text>
          <Text style = {styles.date}>3</Text>
        </View>
        <View style = {[styles.calendarday, styles.today]}>
          <Text style = {[styles.daywithoutevent, styles.todaytxt]}>Th</Text>
          <Text style = {[styles.date, styles.todaydate]}>4</Text>
        </View>
        <View style = {styles.calendarday}>
          <Text style = {styles.daywithoutevent}>Fr</Text>
          <Text style = {styles.date}>5</Text>
        </View>
        <View style = {styles.calendarday}>
          <Text style = {styles.daywithoutevent}>Sa</Text>
          <Text style = {styles.date}>6</Text>
        </View>
        <View style = {styles.calendarday}>
          <Text style = {styles.day}>Su</Text>
          <Text style = {styles.date}>7</Text>
          <View style = {styles.event}></View>
        </View>
      </View>

      <View style = {styles.calendarbig}>
        <View style = {styles.topcalendar}>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Mo</Text>
              <Text style = {styles.date}>1</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Tu</Text>
              <Text style = {styles.date}>2</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>We</Text>
              <Text style = {styles.date}>3</Text>
            </View>
            <View style = {[styles.calendarday, styles.today]}>
              <Text style = {[styles.daywithoutevent, styles.todaytxt]}>Th</Text>
              <Text style = {[styles.date, styles.todaydate]}>4</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Fr</Text>
              <Text style = {styles.date}>5</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.daywithoutevent}>Sa</Text>
              <Text style = {styles.date}>6</Text>
            </View>
            <View style = {styles.calendarday}>
              <Text style = {styles.day}>Su</Text>
              <Text style = {styles.date}>7</Text>
              <View style = {styles.event}></View>
            </View>
          </View>
          <View style = {styles.bottomcalendar}>
            <View style = {[styles.eventday, styles.blueevent]}>
              <View style = {styles.stt}></View>
              <Text style = {styles.name}>Daily Standup</Text>
              <View style = {styles.time}>
                <Text style = {styles.hour}>10:00 AM</Text>
                <Text style = {styles.minute}>11:00 AM</Text>
              </View>
            
            </View>
            <View style = {[styles.eventday, styles.eventorange]}>
              <View style = {styles.sttorange}></View>
              <Text style = {styles.nameorange}>Daily Standup</Text>
              <View style = {styles.time}>
                <Text style = {styles.hourorange}>10:00 AM</Text>
                <Text style = {styles.minuteorange}>11:00 AM</Text>
              </View>
            
            </View>
            <View style = {[styles.eventday, styles.eventgreen]}>
              <View style = {styles.sttgreen}></View>
              <Text style = {styles.namegreen}>Daily Standup</Text>
              <View style = {styles.time}>
                <Text style = {styles.hourgreen}>10:00 AM</Text>
                <Text style = {styles.minutegreen}>11:00 AM</Text>
              </View>
            
            </View>
         
         </View>
      </View>

      <View style = {styles.meteobig}>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        // Background Linear Gradient
        colors={['rgba(0,191,233,1)', 'rgba(6,44,47,0.6)']}
        style={styles.background}
      />
        <View style = {styles.left}>
        </View>
        <View style = {styles.right}>
          <View style={styles.citycontainer}><Text style = {styles.city}>Barcelona</Text></View>
          <View style = {styles.infocontainer}>
            <View style = {styles.temp}>
              <Text style = {styles.temptxt}>Partly Cloudy</Text>
              <Text style = {styles.tempnum}>{Math.round(weather.main.temp)}°</Text>
            </View>
            <View style = {styles.humidity}>
              <Text style = {styles.humiditytxt}>Humidity</Text>
              <Text style = {styles.humiditynum}>{weather.main.humidity}%</Text>
            </View>
          </View>
        </View>
        <View style = {styles.point}>
          <View style = {styles.pointactive}></View>
          <View style = {styles.pointinactive}></View>
          <View style = {styles.pointinactive}></View>
        </View>
      </View>


      <View style = {styles.orga}>
      <View style = {styles.meteosmall}>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        // Background Linear Gradient
        colors={['rgba(255,202,0,1)', 'rgba(255,80,0,1)']}
        style={styles.backgroundsmallmeteo}
      />
        <View style = {styles.topsmall}>
          <View style = {styles.leftsmall}>
          </View>
          <View style = {styles.rightsmall}>
            <View style={styles.tempnumcontainersmall}>
              <Text style = {styles.tempnumsmall}>{Math.round(weather.main.temp)}°</Text>
              <Text style = {styles.humiditynumsmall}>{weather.main.humidity}°</Text>
            </View>
        </View>
        </View>
        <View style = {styles.bottomsmall}>
        <View style = {styles.citycontainersmall}>
              <Text style = {styles.citysmall}>Barcelona</Text>
              <Text style = {styles.weathersmall}>Sunny</Text>
            </View>
          </View>
          <View style = {styles.pointsmall}>
            <View style = {styles.pointactivesmall}></View>
            <View style = {styles.pointinactivesmall}></View>
            <View style = {styles.pointinactivesmall}></View>
          </View>
      </View>

      <View style = { styles.tasksmall }>
        <View style = { styles.tasksmalltop }>
          <Text style = { styles.tasksmalltxt }>Add Task</Text>
          <TouchableOpacity style = { styles.tasksmallplusbtn }>
            <Svg xmlns="http://www.w3.org/2000/Svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <Path d="M7 1V13" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
              <Path d="M1 7H13" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
          </TouchableOpacity>
        </View>
        <View style = { styles.tasksmallbottom }>
          <View style = { styles.tasksmalltxtline }>
            <View style = { styles.tasksmalltxtcircle }/>
            <Text style = { styles.tasksmalltxtbottom }>Finish homework</Text>
          </View>
          <View style = { styles.tasksmalltxtline }>
            <View style = { styles.tasksmalltxtcircle }/>
            <Text style = { styles.tasksmalltxtbottom }>Do groceries</Text>
          </View>
          <View style = { styles.tasksmalltxtline }>
            <View style = { styles.tasksmalltxtcircle }/>
            <Text style = { styles.tasksmalltxtbottom }>Call mom</Text>
          </View>
          <View style = { styles.tasksmalltxtline }>
            <View style = { styles.tasksmalltxtcircle }/>
            <Text style = { styles.tasksmalltxtbottom }>Clean room</Text>
          </View>
          <View style = { styles.tasksmalltxtline }>
            <View style = { styles.tasksmalltxtcircle }/>
            <Text style = { styles.tasksmalltxtbottom }>Code a new app</Text>
          </View>
          <View style = { styles.tasksmalltxtline }>
            <View style = { styles.tasksmalltxtcircle }/>
            <Text style = { styles.tasksmalltxtbottom }>Check the intranet</Text>
          </View>
          <Text style = { styles.tasksmalltxtadd }>4 more</Text>
        </View>
      </View>

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
        <TouchableOpacity style = {[styles.navbaritem]} onPress={() => navigation.navigate("Home")}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M9.41651 2.43001C9.6374 2.93619 9.40612 3.52561 8.89994 3.7465C7.55253 4.33448 6.36967 5.24359 5.45478 6.39432C4.53988 7.54506 3.92081 8.9024 3.65167 10.3477C3.38254 11.7929 3.47155 13.2821 3.91091 14.6851C4.35027 16.088 5.12661 17.3619 6.17205 18.3955C7.2175 19.4291 8.50022 20.1908 9.90807 20.6141C11.3159 21.0374 12.806 21.1094 14.2481 20.8238C15.6902 20.5382 17.0404 19.9036 18.1806 18.9757C19.3208 18.0477 20.2164 16.8545 20.7889 15.5005C21.004 14.9918 21.5908 14.7538 22.0994 14.9689C22.6081 15.184 22.8461 15.7708 22.631 16.2794C21.9312 17.9344 20.8367 19.3927 19.4431 20.5269C18.0495 21.6611 16.3993 22.4366 14.6367 22.7857C12.8741 23.1348 11.0529 23.0468 9.33218 22.5294C7.61147 22.012 6.0437 21.081 4.76594 19.8178C3.48817 18.5545 2.53931 16.9975 2.00231 15.2828C1.46532 13.5681 1.35653 11.748 1.68547 9.98153C2.01441 8.21509 2.77106 6.55612 3.88927 5.14966C5.00747 3.74321 6.45319 2.63208 8.10002 1.91343C8.6062 1.69254 9.19562 1.92382 9.41651 2.43001Z" fill="#484C52"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M11.7929 1.29289C11.9804 1.10536 12.2348 1 12.5 1C13.9445 1 15.3749 1.28452 16.7095 1.83733C18.0441 2.39013 19.2567 3.20038 20.2782 4.22183C21.2996 5.24327 22.1099 6.4559 22.6627 7.79048C23.2155 9.12506 23.5 10.5555 23.5 12C23.5 12.5523 23.0523 13 22.5 13H12.5C11.9477 13 11.5 12.5523 11.5 12V2C11.5 1.73478 11.6054 1.48043 11.7929 1.29289ZM13.5 3.05573V11H21.4443C21.3505 10.1614 21.1391 9.33849 20.8149 8.55585C20.3626 7.46392 19.6997 6.47177 18.864 5.63604C18.0282 4.80031 17.0361 4.13738 15.9442 3.68508C15.1615 3.3609 14.3386 3.14949 13.5 3.05573Z" fill="#484C52"/>
</Svg>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Widjet")} style = {[styles.navbaritem, styles.selected]}>
        <Svg xmlns="http://www.w3.org/2000/Svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<Path d="M5.08714 9.99592H7.14796C9.20878 9.99592 10.2392 8.99384 10.2392 6.98967V4.9855C10.2392 2.98133 9.20878 1.97925 7.14796 1.97925H5.08714C3.02632 1.97925 1.99591 2.98133 1.99591 4.9855V6.98967C1.99591 8.99384 3.02632 9.99592 5.08714 9.99592Z" stroke="#539DF3" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.4521 9.99592H19.5129C21.5737 9.99592 22.6041 8.99384 22.6041 6.98967V4.9855C22.6041 2.98133 21.5737 1.97925 19.5129 1.97925H17.4521C15.3913 1.97925 14.3608 2.98133 14.3608 4.9855V6.98967C14.3608 8.99384 15.3913 9.99592 17.4521 9.99592Z" stroke="#539DF3" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M17.4521 22.0208H19.5129C21.5737 22.0208 22.6041 21.0187 22.6041 19.0146V17.0104C22.6041 15.0062 21.5737 14.0042 19.5129 14.0042H17.4521C15.3913 14.0042 14.3608 15.0062 14.3608 17.0104V19.0146C14.3608 21.0187 15.3913 22.0208 17.4521 22.0208Z" stroke="#539DF3" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M5.08714 22.0208H7.14796C9.20878 22.0208 10.2392 21.0187 10.2392 19.0146V17.0104C10.2392 15.0062 9.20878 14.0042 7.14796 14.0042H5.08714C3.02632 14.0042 1.99591 15.0062 1.99591 17.0104V19.0146C1.99591 21.0187 3.02632 22.0208 5.08714 22.0208Z" stroke="#539DF3" stroke-width="10" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
<Text style={styles.txtnavbar}>Analytics</Text>

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


  orga : { 
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    width: "100%",
    borderRadius: 20,
  },


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






  container: {
    flex: 1,
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: "column",
  },
  calendar : {
    height: 100,
    width: "90%",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginTop: 100,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  calendarday : {
    height: 83,
    width: "12%",
    backgroundColor: "#ffffffd4",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  day : {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000a6",
    marginTop: 10,
    marginLeft: "22%",
  },
  date : {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 7,
    marginLeft: "37%",
  },
  event : {
    height: 6,
    width: 6,
    backgroundColor: "#367CFE",
    borderRadius: 20,
    opacity: 0.83,
    marginTop: 3,
    marginLeft: "41%",
  },
  daywithoutevent : {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000a6",
    marginTop: 0,
    marginLeft: "22%",
  },
  today : {
    backgroundColor: "#4E87F8",
  },
  todaytxt : {
    color: "#ffffffa1",
  },
  todaydate : {
    color: "#fff",
  },






  calendarbig : {
    height: 200,
    width: "90%",
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  topcalendar : {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomcalendar : {
    width: "100%",
    height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  eventday : {
    height: 21,
    width: "95%",
    backgroundColor: "#C3D0F0",
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name : {
    marginLeft: 10,
    fontSize: 9,
    fontWeight: "bold",
    color: "#367CFE",
  },
  stt : {
    height: 17,
    width: 5,
    borderRadius: 20,
    backgroundColor: "#367CFE",
    marginLeft: 4,
  },
  hour : {
    fontSize: 7,
    fontWeight: "bold",
    color: "#367CFE",
  },
  minute : {
    fontSize: 7,
    fontWeight: "bold",
    color: "#367CFE",
  },
  time : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "63%",
  },

  eventgreen : {
    backgroundColor: "#2fb42c38",
  },
  eventorange : {
    backgroundColor: "#ef842133",
  },
  blueevent : {
    backgroundColor: "#367dfe33",
  },
  nameorange : {
    marginLeft: 10,
    fontSize: 9,
    fontWeight: "bold",
    color: "#ef8421",
  },
  namegreen : {
    marginLeft: 10,
    fontSize: 9,
    fontWeight: "bold",
    color: "#2fb42c",
  },
  hourorange : {
    fontSize: 7,
    fontWeight: "bold",
    color: "#ef8421",
  },
  minuteorange : {
    fontSize: 7,
    fontWeight: "bold",
    color: "#ef8421",
  },
  hourgreen : {
    fontSize: 7,
    fontWeight: "bold",
    color: "#2fb42c",
  },
  minutegreen : {
    fontSize: 7,
    fontWeight: "bold",
    color: "#2fb42c",
  },
  sttorange : {
    height: 17,
    width: 5,
    borderRadius: 20,
    backgroundColor: "#ef8421",
    marginLeft: 4,
  },
  sttgreen : {
    height: 17,
    width: 5,
    borderRadius: 20,
    backgroundColor: "#2fb42c",
    marginLeft: 4,
  },






  meteobig : {
    marginTop: 20,
    marginLeft: 20,
    height: 100,
    width: "90%",
    backgroundColor: "#00BFE9",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
  },
  left : {
    //make glassmorphism
    height: "80%",
    marginTop: "2.5%",
    width: "22%",
    marginLeft: "2.5%",
    backgroundColor: "#ffffff7d",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  right : {
    height: "60%",
    width: "60%",
    marginTop: "2.5%",
    marginLeft: "4%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  citycontainer : {
    height: "60%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: "2%",
  },
  city : {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  infocontainer : {
    marginTop: "10%",
    height: "70%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  temp : {
    height: "100%",
    width: "50%",
    display: "flex",
    marginTop: "8%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  temptxt : {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  tempnum : {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  humidity : {
    height: "100%",
    width: "50%",
    display: "flex",
    marginTop: "8%",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  humiditytxt : {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  humiditynum : {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  point : {
    height: "40%",
    width: "5%",
    marginTop: "8%",
    marginLeft: "2.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pointactive : {
    height: 7,
    width: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  pointinactive : {
    height: 7,
    width: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
    opacity: 0.5,
  },





  meteosmall : {
    marginTop: 20,
    marginLeft: "0.7%",
    height: 168,
    width: "44.8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  backgroundsmallmeteo: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 168,
    width: "100%",
    borderRadius: 20,
  },
  topsmall : {
    height: "60%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  leftsmall : {
    marginLeft: "8%",
    height: "70%",
    width: "40%",
    backgroundColor: "#ffffff7d",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  rightsmall : {
    marginLeft: "4%",
    height: "70%",
    width: "45%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tempnumcontainersmall : {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "20%",
  },
  tempnumsmall : {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000000cc",
  },
  humiditynumsmall : {
    fontSize: 18,
    fontWeight: "bold",
    color: "#53535399",
  },
  citysmall : {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000cc",
  },
  weathersmall : {
    fontSize: 15,
    fontWeight: "bold",
    color: "#53535399",
  },
  bottomsmall : {
    height: "27%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  citycontainersmall : {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "8%",
  },
  pointsmall : {
    height: "5%",
    width: "25%",
    marginLeft: "5%",
    display: "flex",
    marginBottom: "5%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pointactivesmall : {
    height: 7,
    width: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  pointinactivesmall : {
    height: 7,
    width: 7,
    borderRadius: 20,
    backgroundColor: "#fff",
    opacity: 0.5,
  },
  calendarsmall : {
    height: 168,
    width: "45%",
    backgroundColor: "#ffffff7d",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000000",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tasksmall : {
    height: 168,
    width: "45%",
    backgroundColor: "#1695C7",
    borderRadius: 20,
    marginTop: 20,
  },
  tasksmalltop : {
    marginTop: "9.52%",
    marginLeft: "9.52%",
    marginRight: "9.52%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tasksmalltxt : {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  tasksmallplusbtn : {
    marginTop: 5,
  },
  tasksmallbottom : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "9.52%",
    marginRight: "9.52%",
    marginTop: "3%",
  },
  tasksmalltxtbottom : {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
    marginLeft: 5,
  },
  tasksmalltxtadd : {
    fontSize: 8,
    color: "#D3D3D3",
    marginLeft: "8%",

  },
  tasksmalltxtcircle : {
    height: 6,
    width: 6,
    borderRadius: 1999,
    marginTop: 4,
    backgroundColor: "#fff",
  },
  tasksmalltxtline : {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  calendardaysmall : {
    height: "30%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "15%",
    marginTop: "10%",
  },
  daywithouteventsmall : {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF0000",
  },
  datesmall : {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000cc",
    marginLeft: "5%",
  },
  calendareventsmall : {
    height: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  eventsmall : {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sttsmall : {
    height: 30,
    width: 5,
    borderRadius: 20,
    backgroundColor: "#367CFE",
    marginLeft: 4,
  },
  contentsmall : {
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    backgroundColor: "#C3D0F0",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "5%",
    borderRadius: 10,
  },
  namesmall : {
    fontSize: 10,
    fontWeight: "bold",
    color: "#367CFE",
  },
  timesmall : {
    fontSize: 8,
    fontWeight: "bold",
    color: "#367CFE",
  },



});