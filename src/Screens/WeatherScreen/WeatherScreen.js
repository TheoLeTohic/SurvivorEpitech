import {StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Svg, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper"

export default function App( { navigation }) {
    const [cities, setCities] = useState(['Barcelona']);
    const [modalVisible, setModalVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Widjet')} style={styles.leftbutton}>
                <Image source={require('../../../assets/return.png')} resizeMode="cover" style={styles.arrowbutton}/>
            </TouchableOpacity>
            <Swiper
                showsButtons={false}
                loop={false}
                showsPagination={true}
                key={"test"}
                scrollEnabled={!isScrolling}
            >
                {cities.map((city) => (
                    <CityWeather city={city} cities={cities} setIsScrolling={setIsScrolling}/>
                ))}
            </Swiper>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.rightbutton}>
                <Image source={require('../../../assets/add.png')} resizeMode="cover" style={styles.addbutton}/>
            </TouchableOpacity>
            <CityModal cities={cities} setCities={setCities} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
            );
}

function CityWeather({ city, cities, setIsScrolling }) {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const currentHour = new Date().getHours();
    const weatherIcons = {
        sun_snow: require('../../../assets/snow.png'),
        sun_heavy_rain: require('../../../assets/heavy_rain.png'),
        sun_light_rain: require('../../../assets/light_rain.png'),
        sun_cloudy: require('../../../assets/cloudy.png'),
        sun_partly_cloudy: require('../../../assets/partly_cloudy.png'),
        sun_sunny: require('../../../assets/sunny.png'),
        moon_snow: require('../../../assets/moon_snow.png'),
        moon_heavy_rain: require('../../../assets/moon_rain.png'),
        moon_light_rain: require('../../../assets/moon_light_rain.png'),
        moon_cloudy: require('../../../assets/moon_cloudy.png'),
        moon_partly_cloudy: require('../../../assets/moon_partly_cloudy.png'),
        moon_sunny: require('../../../assets/moon.png')
    };

    const fetchWeatherData = async () => {
        const API_KEY = "66ef064fdc6a4c1bb88142620231309"
        try {
            let cityDataResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`);
            let cityData = await cityDataResponse.json();

            if (!cityData || cityData.length === 0) return;

            const lat = cityData[0].lat;
            const lon = cityData[0].lon;

            let [forecastResponse, currentWeatherResponse] = await Promise.all([
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,showers,snowfall,cloudcover,windspeed_10m&forecast_days=1`),
                fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
            ]);

            let forecastData = await forecastResponse.json();
            let currentWeatherData = await currentWeatherResponse.json();

            setForecastData(forecastData);
            setWeatherData(currentWeatherData);
        } catch (error) {
            console.log('Error fetching weather data:', error);
        }
    }


    const getWeatherIcon = (snowfall, rain, cloudcover, hour) => {
        let pre = (hour <= 7 || hour >= 20) ? 'moon_' : 'sun_';

        if (snowfall > 0) return weatherIcons[`${pre}snow`];
        if (rain > 0) return rain > 5 ? weatherIcons[`${pre}heavy_rain`] : weatherIcons[`${pre}light_rain`];
        if (cloudcover > 75) return weatherIcons[`${pre}cloudy`];
        if (cloudcover > 25 && cloudcover <= 75) return weatherIcons[`${pre}partly_cloudy`];

        return weatherIcons[`${pre}sunny`];
    }

    const getWeatherCondition = (snowfall, rain, cloudcover) => {
        if (snowfall > 0) {
            return 'Snow';
        }

        if (rain > 0) {
            if (rain > 5) {
                return 'Heavy Rain';
            } else {
                return 'Light Rain';
            }
        }

        if (cloudcover > 75) {
            return 'Cloudy';
        } else if (cloudcover > 25 && cloudcover <= 75) {
            return 'Partly Cloudy';
        } else {
            return 'Sunny';
        }
    }

    useEffect(() => {
        console.log(cities);
        fetchWeatherData().then(r => console.log('Weather data fetched!'));
    }, [cities]);

    if (!weatherData) {
        return <Text>Error fetching weather data.</Text>;
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={['rgba(104, 183, 255, 0.6)', 'rgba(87, 144, 255, 1)']}
                style={styles.background}
            />
            <View style={styles.topcontainer}>
                <View style={ styles.titlecontainer }>
                    <Text style={ styles.title }>{city}</Text>
                    <Text style={ styles.subtitle }>Wednesday, 13 September</Text>
                </View>
            </View>
            <Image source={getWeatherIcon(
                forecastData.hourly.snowfall[currentHour],
                forecastData.hourly.rain[currentHour],
                forecastData.hourly.cloudcover[currentHour],
                currentHour
            )} style={styles.sun}/>
            <View style={styles.degreecontainer}>
                <Text style={styles.degree}>{Math.round(weatherData.current.temp_c)}</Text>
                <Text style={styles.degreesign}>º</Text>
            </View>
            <Text style={styles.weather}>{getWeatherCondition(
                forecastData.hourly.snowfall[currentHour],
                forecastData.hourly.rain[currentHour],
                forecastData.hourly.cloudcover[currentHour]
            )}</Text>
            <View style={styles.weatherinfo}>
                <View style={styles.infoblock}>
                    <Image source={require('../../../assets/umbrella.png')} style={styles.icon}/>
                    <Text style={styles.weatherdata}>{weatherData.current.precip_mm}%</Text>
                    <Text style={styles.weatherdescription}>Precipitation</Text>
                </View>
                <View style={styles.infoblock}>
                    <Image source={require('../../../assets/rain.png')} style={styles.icon}/>
                    <Text style={styles.weatherdata}>{weatherData.current.humidity}%</Text>
                    <Text style={styles.weatherdescription}>Humidity</Text>
                </View>
                <View style={styles.infoblock}>
                    <Image source={require('../../../assets/wind.png')} style={styles.icon}/>
                    <Text style={styles.weatherdata}>{weatherData.current.wind_kph}km/h</Text>
                    <Text style={styles.weatherdescription}>Wind Speed</Text>
                </View>
            </View>
            <View style={styles.bottomcontainer}>
                <View style={styles.toptext}>
                    <Text style={{color: '#fff', fontWeight: '400'}}>Today</Text>
                    <Text style={{color: '#fff', fontWeight: '400'}}>7-day Forecasts</Text>
                </View>
                <ScrollView horizontal={true} onTouchStart={() => setIsScrolling(true)} onTouchEnd={() => setIsScrolling(false)} showsHorizontalScrollIndicator={false} style={styles.forecast}>
                    {forecastData && forecastData.hourly.temperature_2m.map((temperature, index) => (
                        <View key={index} style={styles.forecastbox}>
                            <Text style={styles.hourforecast}>
                                {index === 0 ? 12 : (index <= 12 ? index : index - 12)} {index < 12 ? 'AM' : 'PM'}
                            </Text>
                            <Image source={getWeatherIcon(
                                forecastData.hourly.snowfall[index],
                                forecastData.hourly.rain[index],
                                forecastData.hourly.cloudcover[index],
                                index
                            )} style={styles.forecasticon}/>
                            <Text style={styles.tempforecast}>{Math.round(temperature)}°</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

function CityModal({ cities, setCities, modalVisible, setModalVisible}) {
    const [inputCity, setInputCity] = useState('');

    const handleCityInput = (text) => {
        setInputCity(text);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <BlurView
                intensity={20}
                tint="dark"
                style={styles.modal}
            >
                <View style = {styles.card}>
                    <Text style = {styles.cardtitle}>New City</Text>
                    <Text style = {styles.citytitle}>Choose New City</Text>
                    <TextInput
                        placeholder="Select City"
                        style = {styles.cityform}
                        onChangeText={handleCityInput}
                        placeholderTextColor={"rgba(0, 0, 0, 0.1)"}
                    />
                    <View style = {styles.buttoncontainer}>
                        <TouchableOpacity style = {styles.cancelbutton} title="Cancel" onPress={() => setModalVisible(false)}>
                            <Text style = {{color: "#000000"}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.savebutton} title="Save" onPress={
                            () => {
                                setCities([...cities, inputCity]);
                                setModalVisible(false);
                            }
                        }>
                            <Text style = {{color: "#fff", fontWeight: "400"}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: 'column',
        height: "100%",
        width: "100%",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: 0,
    },
    topcontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowbutton: {
        width: 10,
        height: 20,
    },
    addbutton: {
        width: 20,
        height: 20,
    },
    titlecontainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        color: "#fff",
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 'bold',
    },
    sun: {
        resizeMode: 'contain',
        width: '40%',
        height: '30%',
        marginTop: '5%',
    },
    degreecontainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: '-15%',
        marginLeft: '9%',
    },
    degree: {
        fontSize: 120,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '12%',
    },
    weather: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    degreesign: {
        fontSize: 80,
        height: '90%',
        fontWeight: 'bold',
        color: '#fff',
    },
    weatherinfo: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: '85%',
        borderRadius: 25,
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        marginTop: '7%',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: 'rgba(230,230,230,0.46)',
    },
    infoblock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        marginBottom: '18%',
        resizeMode: 'contain',
    },
    weatherdata: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    weatherdescription: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '300',
    },
    bottomcontainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '85%',
        marginTop: '5%',
    },
    toptext: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    forecast: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '4%',
    },
    forecastbox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 15,
        width: 55,
        height: 100,
        paddingVertical: 1,
        borderWidth: 1.5,
        borderColor: 'rgba(230,230,230,0.46)',
        marginRight: 20,
    },
    forecasticon: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
    },
    hourforecast: {
        fontSize: 12,
        color: '#fff',
    },
    tempforecast: {
        fontSize: 12,
        color: '#fff',
        marginLeft: '4%',
    },
    card: {
        width: "80%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#EAEAEA",
        borderRadius: 15,
        paddingVertical: 20,
    },
    buttoncontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
    },
    savebutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#2FDB73",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
    },
    cancelbutton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: "45%",
        backgroundColor: "#EAEAEA",
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 5,
    },
    cardtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: "80%",
        marginBottom: 30,
    },
    citytitle: {
        fontSize: 14,
        color: "#636363",
        fontWeight: '400',
        width: "80%",
        marginBottom: 10,
    },
    modal: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityform: {
        width: "80%",
        borderRadius: 5,
        padding: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        marginBottom: 20,
    },
    leftbutton: {
        position: 'absolute',
        top: "9.5%",
        left: "10%",
        zIndex: 1,
    },
    rightbutton: {
        position: 'absolute',
        top: "9.5%",
        right: "10%",
        zIndex: 1,
    }

});