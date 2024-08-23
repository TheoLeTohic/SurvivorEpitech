import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Svg, Path, Circle } from 'react-native-svg';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function App({ navigation, route }) {
    const [number, setNumber] = useState("3123 ")
    const [date, setDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [name, setName] = useState("")
    const [cardFace, setCardFace] = useState(1)

    function cardFlip(nbr) {
        if (nbr === cardFace)
            return 1
        setCardFace(nbr)
    }

    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
    const [frontAnim, setFrontAnim] = useState(fadeAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    }));
    const [backAnim, setBackAnim] = useState(fadeAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    }));

    function flipCard() {
        Animated.timing(fadeAnim, {
            toValue: 180,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    const frontAnimatedStyle = {
        transform: [
            { rotateX: frontAnim }
        ]
    }
    const backAnimatedStyle = {
        transform: [
            { rotateX: backAnim }
        ]
    }
    return (
        <View style={ styles.container }>
            <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['rgba(0, 0,0,0.7)', 'rgba(0, 154, 117, 1)']}
        style={styles.background}
        />
            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>Add{"\n"}Payment</Text>
            </View>
            <View style={ styles.circle1 } />
            <View style={ styles.circle2 } />
            {cardFace == 1 ?
            <Animated.View style={ [styles.creditCard ] }>
                <View style={ styles.Topcontainer }>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Path fill-rule="evenodd" clip-rule="evenodd" d="M1.72819 16.1628L1.72338 16.168L1.71873 16.1733C1.45935 16.4668 0.879095 16.5536 0.425774 16.2979C0.0628872 16.0931 -0.0456504 15.6362 0.264104 15.2746C0.726178 14.8036 1.06205 14.2533 1.28289 13.7154C1.51281 13.1555 1.62026 12.5194 1.61698 11.8956C1.61369 11.2718 1.49954 10.6369 1.26374 10.0794C1.03724 9.54396 0.695591 8.99726 0.228582 8.53133C-0.0849641 8.17308 0.0187531 7.71495 0.379463 7.50633C0.830063 7.24571 1.4112 7.32629 1.67366 7.61704L1.67837 7.62226L1.68322 7.62738C2.26444 8.24061 2.74091 8.92212 3.02528 9.59095C3.32449 10.3778 3.51473 11.139 3.51866 11.8854C3.5228 12.6708 3.42792 13.4143 3.06654 14.1465C2.67297 14.9439 2.29208 15.5551 1.72819 16.1628ZM5.93469 17.6159L5.94608 17.603L5.95654 17.5896C7.24893 15.9351 7.99582 13.9395 7.98487 11.8614C7.97392 9.78381 7.20644 7.7968 5.89729 6.15647C5.61359 5.79633 5.74185 5.37001 6.22127 5.09272C6.54324 4.9065 7.14714 4.97164 7.50496 5.35534C8.98299 7.23254 9.87418 9.50277 9.88655 11.8512C9.89934 14.2797 9.0329 16.4782 7.57339 18.3724C7.23585 18.7438 6.71975 18.8483 6.27513 18.6385C5.79317 18.3564 5.70567 17.8751 5.93469 17.6159ZM13.5073 2.8791L13.52 2.89916L13.5346 2.91833C15.5373 5.53219 16.6481 8.54854 16.6653 11.8148C16.6825 15.0795 15.6046 18.1063 13.6313 20.7407C13.3288 21.1293 12.8188 21.2394 12.3022 21.0476C11.8322 20.8029 11.7064 20.3968 11.9527 19.9861C13.6311 17.605 14.6765 14.8001 14.6609 11.8255C14.6453 8.86417 13.6809 6.06603 11.8633 3.68864C11.6174 3.28263 11.74 2.87786 12.2052 2.62936C12.7662 2.41449 13.3123 2.57092 13.5073 2.8791ZM19.4513 0.38281L19.46 0.396514L19.4696 0.40981C21.8962 3.7683 23.3193 7.60953 23.3412 11.7789C23.3632 15.944 21.9835 19.7966 19.597 23.1785C19.2939 23.5627 18.7864 23.6708 18.2722 23.4799C17.8037 23.236 17.6772 22.8316 17.9203 22.4223C20.2193 19.2876 21.4599 15.6575 21.4396 11.7891C21.4191 7.91073 20.0315 4.29761 17.8113 1.19888C17.5332 0.746476 17.7302 0.302873 18.1195 0.144779C18.6909 -0.087274 19.2529 0.0691913 19.4513 0.38281Z" fill="white"/>
</Svg>
<Svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/Svg">
<Circle cx="15" cy="23.9412" r="15" fill="#EB001B"/>
<Circle cx="33" cy="23.9412" r="15" fill="#F79E1B"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M23.9999 35.9411C28.1406 33.5458 30.9265 29.0688 30.9265 23.9412C30.9265 18.8135 28.1406 14.3365 23.9999 11.9412C19.8591 14.3365 17.0732 18.8135 17.0732 23.9412C17.0732 29.0688 19.8591 33.5458 23.9999 35.9411Z" fill="#FF5F00"/>
</Svg>


                </View>
                <View style={ styles.Bottomcontainer }>
                    <View style={ styles.left }>
                        <Text style={ styles.owner }>{name}</Text>
                        <Text style={ styles.number }>{number}</Text>
                    </View>
                    <View style={ styles.right }>
                        <Text style={ styles.expire }>Expiry</Text>
                        <Text style={ styles.date }>{date}</Text>
                    </View>
                </View>
            </Animated.View>
            : null}
            {cardFace == 2 ?
            <Animated.View style={ [styles.creditCard] }>
                <Text style = {styles.cardtxt}>For customer service call 911</Text>
                <View style={ styles.blackbar }></View>
                <Text style={ styles.inputcvv }>{cvv}</Text>
                <Text style = {styles.cardtxt}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis dui enim, id eleifend leo dignissim ut. Sed quis nunc quis lorem pellentesque facilisis.</Text>
        </Animated.View>
            : null}
            <View style={ styles.form }>
            <View style = {styles.allinput}>
                <Text style = {styles.inputtxt}>Enter Card Holder Name</Text>
            <TextInput onFocus={() => setCardFace(1)} style={ styles.input } onChangeText={text => setName(text)} />
            </View>
                <View style={ styles.allinput }>
                    <Text style = {styles.inputtxt}>Enter Card Number</Text>
                <TextInput style={ styles.input } onFocus={() => setCardFace(1)} placeholderTextColor={"#55BE96"} placeholder="XXXX    XXXX    XXXX    XXXX" onChangeText={text => setNumber(text)} />
                </View>
                <View style={ styles.bottomForm }>
                <View style={ styles.allinputbottom }>
                    <Text style = {styles.inputtxt}>Enter Expiry Date</Text>
                    <TextInput style={ styles.inputbottom } onFocus={() => setCardFace(1)} placeholderTextColor={"#55BE96"} placeholder="MM/YY" onChangeText={text => setDate(text)} />
                </View>
                <View style={ styles.allinputbottom }>
                    <Text style = {styles.inputtxt}>Enter CVV</Text>
                    <TextInput style={ styles.inputbottom } onFocus={() => setCardFace(2)} placeholderTextColor={"#55BE96"} placeholder="CVV" onChangeText={text => setCvv(text)} />
                </View>
                </View>
            </View>
            <TouchableOpacity style= {styles.buttonsubmit} onPress={() => navigation.navigate("Home", {id: route.params.id, code: route.params.code, me: route.params.me})}>
                <Text style = {styles.submittxt}>Confirm Payment</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7E5FF',
        display: 'flex',
        flexDirection: 'column',
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
    titleContainer: {
        zIndex: 100,
        marginTop: 50,
    },
    title: {
        zIndex: 100,
        color: '#FFF',
        fontSize: 46,
        fontStyle: 'normal',
        fontWeight: 'bold',
        left: '9.6%',
        top: '35.256%',
    },
    circle1: {
        position: 'absolute',
        width: '186.666666667%',
        height: '86.2068965517%',
        borderRadius: 700 / 2,
        backgroundColor: '#183D3D',
        top: -414,
        left: -284,
    },
    circle2: {
        backgroundColor: '#93B1A6',
        position: 'absolute',
        width: '122.4%',
        height: '49.01477%',
        borderRadius: 459 / 2,
        top: 579,
        left: 154,
    },
    circle3: {
        backgroundColor: '#367CFE',
        width: 64,
        height: 64,
        borderRadius: 2000,
    },
    signup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 30,
    },
    signupText: {
        fontSize: 32,
        marginRight: 20,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    signin: {
        display: 'flex',
        left: '72%',
        top: '15%',
    },
    signinText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
    },
    rectangle1: {
        backgroundColor: '#367CFE',
        width: 75,
        height: 10,
    },
    buttonsubmit: {
        backgroundColor: "#55BE96",
        width: "70%",
        height: "7.5%",
        marginLeft: "15%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
    },
    submittxt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    createcontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: "5%",
        width: "100%",
    },
    createtxt: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    nottxt: {
        fontSize: 12,
        color: "#D2D2D2",
    },
    creditCard: {
        marginTop: '20%',
        marginLeft: '10%',
        backgroundColor: '#ffffff63',
        width: '80%',
        height: '20%',
        borderRadius: 20,
        shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 20,
    shadowColor: "#fff",
    },
    Topcontainer: {
        marginLeft: '10%',
        marginTop: '5%',
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Bottomcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        marginTop: '22%',
        marginLeft: '10%',
    },
    right: {
        marginTop: '22%',
        marginRight: '10%',
    },
    owner: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffff',
    },
    number: {
        fontSize: 18,
        marginTop: '5%',
        fontWeight: 'bold',
        color: '#ffff',
    },
    expire: {
        fontSize: 15,
        color: '#ffff',
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffff',
    },
    form: {
        marginTop: '10%',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        height: '30%',
        borderRadius: 20,
        marginLeft: '10%',
        backgroundColor: "#ECECEC",
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 20,
    },
    bottomForm: {
        width: '70%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5%',
    },      
    allinput: {
        width: '70%',
        height: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },  
    input: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ECECEC',
        borderRadius: 5,
        paddingLeft: '5%',
        borderColor: '#55BE96',
        borderWidth: 1,
    },
    allinputbottom: {
        width: '45%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    inputbottom: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ECECEC',
        borderRadius: 5,
        paddingLeft: '5%',
        borderColor: '#55BE96',
        borderWidth: 1,
    },
    cardtxt: {
        fontSize: 6,
        opacity: 0.5,
        fontWeight: 'bold',
        color: '#ffff',
        marginLeft: '10%',
        marginTop: '5%',
        marginRight: '10%',
    },
    blackbar: {
        width: '100%',
        height: '15%',
        backgroundColor: '#000000',
        marginTop: '5%',
    },
    inputcvv: {
        width: '80%',
        backgroundColor: '#ECECEC',
        borderRadius: 5,
        paddingLeft: '5%',
        marginLeft: '10%',
        marginTop: '5%',
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    inputtxt: {
        marginBottom: '3%',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#55BE96',
    },
});
