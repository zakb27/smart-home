import React, { useEffect, useState,useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet,ImageBackground, SafeAreaView, StatusBar,} from 'react-native';
import {sendInfo, checkSaved, performSave} from "../hooks/Database";
import Icon from "react-native-vector-icons/Ionicons"
import { RadialSlider } from 'react-native-radial-slider';
import Slider from '@react-native-community/slider';
import PinView from 'react-native-pin-view';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, {Path} from "react-native-svg";
const LightDevice = ({data}) =>{
    const [percent,changePercent] = useState(data.value)
    const [isSaved,changeSaved] = useState(false)



    const handleSend =() => {
        const info = {
            id: data.id,
            value:percent,
            on:true,
        }
        sendInfo(info).then(response => {

        });
    }

    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }

    useEffect(()=>{
        checkSaved(data.id).then((item)=>{
            changeSaved(item.exists)
        })
    },[])


    return(

        <View style={styles.modalView}>
            <LinearGradient colors={['#cdf4f0','#c3d0f3', '#7590db']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.goBackTouch}>
                    {isSaved ?
                        <Ionicons name={'bookmark'} size={35} color={'#7590db'} />
                        :
                        <Ionicons name={"bookmark-outline"} size={35} color={'#7590db'} />
                    }
                </TouchableOpacity>
            </View>
            <Svg
                height={250}
                width={250}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
            >
                <Path
                    style={{
                        fill: "rgba(154,154,154,0.1)",
                    }}
                    d="M195.048 402.286c0-115.81-109.714-115.81-109.714-231.619C85.333 76.411 161.744 0 256 0s170.667 76.411 170.667 170.667c0 115.81-109.714 115.81-109.714 231.619"
                />
                <Path
                    style={{
                        fill: "rgba(154,154,154,0.05)",
                    }}
                    d="M426.667 170.667C426.667 76.411 350.256 0 256 0h-.001v402.286h60.954c-.001-115.81 109.714-115.81 109.714-231.619z"
                />

                <Path
                    style={{
                        fill: `rgba(246,226,125,${Math.round(percent)/100})`,
                    }}
                    d="M195.048 402.286c0-115.81-109.714-115.81-109.714-231.619C85.333 76.411 161.744 0 256 0s170.667 76.411 170.667 170.667c0 115.81-109.714 115.81-109.714 231.619"
                />
                <Path
                    style={{
                        fill: `rgba(246,226,125,${Math.round(percent)/100})`,
                    }}
                    d="M426.667 170.667C426.667 76.411 350.256 0 256 0h-.001v402.286h60.954c-.001-115.81 109.714-115.81 109.714-231.619z"
                />



                <Path
                    style={{
                        fill: "#fff",
                    }}
                    d="m330.748 182.729-25.859-25.858L256 205.759l-48.89-48.888-25.858 25.858 56.462 56.464v163.093h36.572V239.193z"
                />
                <Path
                    style={{
                        fill: "#d8d8da",
                    }}
                    d="M341.332 384H170.667v36.571h24.381v30.476C195.048 484.71 222.337 512 256 512s60.952-27.29 60.952-60.952v-30.476h24.38V384z"
                />
                <Path
                    style={{
                        fill: "#c6c5ca",
                    }}
                    d="M256 384v128c33.663 0 60.952-27.29 60.952-60.952v-30.476h24.38V384H256z"
                />
            </Svg>


            <Slider
                style={{width: 200, height: 60}}
                minimumValue={0}
                value={percent}
                onValueChange={changePercent}
                maximumValue={100}
                onSlidingComplete={handleSend}
                minimumTrackTintColor="#f4a261"
                maximumTrackTintColor="#e9c46a"
            />

            <TouchableOpacity
                onPress={() => alert('dfgdfg')}
            >
                <Text>sdfsdfsdf</Text>
            </TouchableOpacity>

        </View>
    )
}
const TemperatureDevice = ({data}) =>{
    const [speed, setSpeed] = useState(data.value);
    const [isSaved,changeSaved] = useState(false);


    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }

    useEffect(()=>{
        checkSaved(data.id).then((data)=>{
            changeSaved(data.exists)
        })
    },[])

    useEffect(() => {
        const info = {
            id: data.id,
            on: true,
            value:speed
        }
        sendInfo(info).then(response => {
        });
    }, [speed]);



    return(

        <View style={styles.modalView}>
            <LinearGradient colors={['#cdf4f0','#c3d0f3', '#7590db']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.goBackTouch}>
                    {isSaved ?
                        <Ionicons name={'bookmark'} size={35} color={'#7590db'} />
                        :
                        <Ionicons name={"bookmark-outline"} size={35} color={'#7590db'} />
                    }
                </TouchableOpacity>
            </View>






            <RadialSlider value={speed}
                          subTitle={"Temperature"}
                          unit={'\u2103'}
                          min={14} max={25} onChange={setSpeed}
                          linearGradient={
                              [ { offset: '0%', color:'#8275bd' }, { offset: '100%', color: '#7590db' }]
                          }
                          sliderTrackColor={'#e6efe9'}
                          thumbColor={'#7590db'}
                          lineColor={'#e6efe9'}
                          radius={125}
                          subTitleStyle={
                              {fontSize: 20}
                          }
                          valueStyle={{
                              fontSize:40,
                          }}
                          sliderWidth={25}
                          thumbBorderWidth={10}
                          thumbRadius={20}
            />



        </View>
    )
}

const WashingDevice = ({data}) =>{


    return(

        <View>
            <Text>This is the machine of {data.name}</Text>
        </View>
    )
}
const DoorDevice = ({data}) =>{
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    const [isSaved,changeSaved] = useState(false);

    useEffect(() => {
        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 4) {
            setShowCompletedButton(true)
        } else {
            setShowCompletedButton(false)
        }
        if(enteredPin==='4422'){
            alert('correct');
        }
    }, [enteredPin])


    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }

    useEffect(()=>{
        checkSaved(data.id).then((data)=>{
            changeSaved(data.exists)
        })
    },[])

    return(

        <View style={styles.modalView}>
            <Text>{data.name}</Text>
            <Button onPress={handleSave} title={isSaved.toString()} />
            <StatusBar barStyle="light-content" />
            <View
                style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                <PinView
                    inputSize={36}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={70}
                    onValueChange={value => setEnteredPin(value)}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: "#201d50",
                        backgroundColor:'#364386'
                    }}
                    activeOpacity={0.6}

                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#8f3636",
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: "#c95555",
                    }}
                    buttonTextStyle={{
                        color: "#66bdcc",
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            pinView.current.clear()
                        }
                        if (key === "custom_right") {
                            alert("Entered Pin: " + enteredPin)
                        }
                    }}
                    customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#364386"} /> : undefined}
                    customRightButton={showCompletedButton ? <Icon name={"pizza"} size={36} color={"#364386"} /> : undefined}
                />
            </View>
        </View>
    )
}

const DishDevice = ({data}) =>{


    return(

        <View>
            <Text>This is the dishwasher of {data.name}</Text>
        </View>
    )
}


const SpeakerDevice = ({data}) =>{
    return(

        <View>
            <Text>This is the speaker of {data.name}</Text>
        </View>
    )
}

const OtherDevice = ({data}) =>{
    return(

        <View>
            <Text>This is the other of {data.name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    titleContainer:{
        width:'100%',
        flexDirection:"row",
    },
    goBackTouch:{
        width:'100%',
        padding:10,
        alignItems: 'flex-end',
        justifyContent:'flex-end',
    },

    buttonContainer:{
        flexDirection:'row',
    },
    dayButton:{
        margin:2,
        borderRadius:'50',
        padding: 5,
        borderWidth:1,
        flex:1,
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'blue',
        width:32,
        height:32,
        font:'black',
    },
    modalView: {
        paddingTop:50,
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        alignSelf: "stretch",
        height:600,
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",
    }
});


export {LightDevice,TemperatureDevice,OtherDevice,DishDevice,DoorDevice,SpeakerDevice,WashingDevice}

