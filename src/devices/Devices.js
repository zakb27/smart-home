import React, { useEffect, useState,useRef,useMemo} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet,Modal,  StatusBar,} from 'react-native';
import {sendInfo, checkSaved, performSave, checkPin, updateDoor, getDoorTime,updateWasher} from "../hooks/Database";
import Icon from "react-native-vector-icons/Ionicons"
import { RadialSlider } from 'react-native-radial-slider';
import Slider from '@react-native-community/slider';
import PinView from 'react-native-pin-view';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, {G, Path} from "react-native-svg";
import GetProductImage from "../components/GetProductImage";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Snackbar} from "@react-native-material/core";
import ColorPicker from 'react-native-wheel-color-picker'
const LightDevice = ({data}) =>{
    const [percent,changePercent] = useState(data.value)
    const [isSaved,changeSaved] = useState(false)
    const [color,changeColor] = useState(data.color)
    const [rgba,changeRgba] = useState()

    const handleSend =() => {

        const info = {
            id: data.id,
            value:percent,
            color:color,
        }
        sendInfo(info).then(response => {
            console.log(response)
        });
    }

    // Code used for changing colour https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
    useEffect(()=>{
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)){
            c= color.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            const thing = 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+(Math.round(percent)/100 + ')');
            changeRgba(thing)
        }
    },[color,percent])

    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }
    const handleReset = () =>{
        changeColor('#e9c46a')
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
                <TouchableOpacity
                    onPress={handleReset}
                    style={styles.reset}
                >
                    <Ionicons name={"reload-outline"} size={35} color={'#7590db'} />
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
                        fill: rgba,
                    }}
                    d="M195.048 402.286c0-115.81-109.714-115.81-109.714-231.619C85.333 76.411 161.744 0 256 0s170.667 76.411 170.667 170.667c0 115.81-109.714 115.81-109.714 231.619"
                />
                <Path
                    style={{
                        fill: rgba,
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


            <View style={styles.tempView}>
                <View>

                </View>
                <ColorPicker
                    color={color}
                    swatchesOnly={false}
                    onColorChange={changeColor}
                    // color={'#F6E27DFF'}
                    onColorChangeComplete={changeColor}
                    thumbSize={50}
                    sliderSize={40}
                    noSnap={true}
                    sliderHidden= {true}
                    row={true}
                    swatchesLast={false}
                    swatches={false}
                    discrete={false}
                    s
                />
            <RadialSlider value={percent}
                          subTitle={""}
                          variant={'radial-circle-slider'}
                          unit={'%'}
                          min={0} max={100}
                          onChange={e=> {changePercent(e)}}
                          linearGradient={
                              [ { offset: '0%', color:'#f4a261' }, { offset: '100%', color: '#e9c46a' }]
                          }
                          step={1}
                          sliderTrackColor={'#ffffff'}
                          thumbColor={'#e9c46a'}
                          lineColor={'#ffffff'}
                          radius={75}
                          subTitleStyle={
                              {fontSize: 12}
                          }
                          valueStyle={{
                              fontSize:20,
                          }}
                          sliderWidth={18}
                          thumbBorderWidth={8}
                          thumbRadius={18}
                          isHideValue={true}
                          isHideLines={true}
                          isHideTailText={true}
                          isHideButtons={true}
            />


            </View>
            <TouchableOpacity onPress={handleSend} style={styles.setLight}>
                    <Ionicons name={'checkmark-circle'} size={65} color={'#ffffff'} />
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


    const handleUpdate = () =>{
        console.log(speed)
        const info = {
            id: data.id,
            value:speed
        }
        sendInfo(info).then(response => {
        });
    }


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
                          sliderTrackColor={'#ffffff'}
                          thumbColor={'#7590db'}
                          lineColor={'#ffffff'}
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
                          isHideButtons={true}
            />

            <TouchableOpacity onPress={handleUpdate}>
                <Ionicons name={"checkmark-circle"} size={75} color={'#ffffff'} />
            </TouchableOpacity>



        </View>
    )
}

const WashingDevice = ({data}) =>{

    const [speed, setSpeed] = useState(data.value);
    const [speed2, setSpeed2] = useState(0);
    const [isSaved,changeSaved] = useState(false);
    const [wash,openWash] = useState(false);
    const [time,changeTime] = useState(0);

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

    const handleStart = async()=>{
        if(speed2===0){
            return '';
        }
        updateWasher(data.id,speed,speed2).then(()=>{
            console.log('Started wash')
            openWash(true)
            changeTime(speed2)
        })

    }

    useEffect(() => {
        let timer;
        // checks if timer still on and updates time left every minute
        if (time > 0) {
            timer = setTimeout(() => changeTime(time - 1), 60000);
        }
        return () => clearTimeout(timer);
    }, [wash, time]);
    useEffect(() => {
        // Opens functionality when time runs out
        if (time === 0) {
            openWash(false);
        }
    }, [time]);
    useEffect(()=>{
        // Closes functionality when time left
        if(data.time>0){
            openWash(true);
            changeTime(data.time)
        }
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
            <View style={{ aspectRatio: 1,
                marginTop:-40,
                height:200,
            }}>
            <GetProductImage type={data.type} />
            </View>

            {wash?
                (
                        <View style={styles.underWash}>
                            <Ionicons name="water" size={100} color={'#4a92b9'} />
                            <Text style={styles.counter}>{time} Mins</Text>
                        </View>
                )
                :
                (
                    <>
                    <View style={styles.tempView}>
                        <RadialSlider value={speed}
                                      subTitle={"Temperature"}
                                      variant={'radial-circle-slider'}
                                      unit={'\u2103'}
                                      min={20} max={80} onChange={setSpeed}
                                      linearGradient={
                                          [ { offset: '0%', color:'#7acae7' }, { offset: '100%', color: '#4a92b9' }]
                                      }
                                      step={10}
                                      sliderTrackColor={'#ffffff'}
                                      thumbColor={'#7acae7'}
                                      lineColor={'#ffffff'}
                                      radius={75}
                                      subTitleStyle={
                                          {fontSize: 12}
                                      }
                                      valueStyle={{
                                          fontSize:20,
                                      }}
                                      sliderWidth={15}
                                      thumbBorderWidth={10}
                                      thumbRadius={15}
                                      isHideLines={true}
                                      isHideTailText={true}
                                      isHideButtons={true}
                        />
                        <RadialSlider value={speed2}
                                      subTitle={"Length"}
                                      variant={'radial-circle-slider'}
                                      unit={'mins'}
                                      min={0} max={180} onChange={setSpeed2}
                                      linearGradient={
                                          [ { offset: '0%', color:'#7acae7' }, { offset: '100%', color: '#4a92b9' }]
                                      }
                                      step={5}
                                      sliderTrackColor={'#ffffff'}
                                      thumbColor={'#7acae7'}
                                      lineColor={'#ffffff'}
                                      radius={75}
                                      subTitleStyle={
                                          {fontSize: 12}
                                      }
                                      valueStyle={{
                                          fontSize:20,
                                      }}
                                      sliderWidth={15}
                                      thumbBorderWidth={10}
                                      thumbRadius={15}
                                      isHideLines={true}
                        />
                    </View>
                <TouchableOpacity onPress={handleStart}>
                <Ionicons name={"power"} size={75} color={'#ffffff'} />
                </TouchableOpacity>
                </>
                )
            }
        </View>
    )
}
const DoorDevice = ({data}) =>{
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    const [isSaved,changeSaved] = useState(false);
    const [door,openDoor] = useState(false);
    const [time,changeTime] = useState(0);
    const [snackVisible,changeSnack] = useState(false)
    const [errorMessage,changeErrorMessage] = useState("Error");
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
    }, [enteredPin])


    useEffect(() => {
        let timer;
        if (time > 0) {
            timer = setTimeout(() => changeTime(time - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [door, time]);

    useEffect(() => {
        if (time === 0) {
            // perform any action you want when the countdown is over
            openDoor(false);
        }
    }, [time]);

    useEffect(()=>{
        getDoorTime(data.id).then((res)=>{
            console.log(res);
            if(res>0){
                openDoor(true)
                changeTime(Math.round(res))
            }
        })
    },[])

    const handleSave = () =>{
        performSave(data.id).then((data)=>{
            changeSaved(!isSaved)
        })
    }
    const handlePin = (pin) =>{
                updateDoor(data.id,pin).then((res)=>{
                    if(res){
                        openDoor(true)
                        changeTime(10)
                    }
                    else{
                        changeErrorMessage('Incorrect Pin')
                        changeSnack(true)
                    }
                })
    }




    useEffect(()=>{
        checkSaved(data.id).then((data)=>{
            changeSaved(data.exists)
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
                        <Ionicons name={'bookmark'} size={35} color={!door?"#7590db": "rgba(0,0,0,0.05)"} />
                        :
                        <Ionicons name={"bookmark-outline"} size={35} color={!door?"#7590db": "rgba(0,0,0,0.05)"} />
                    }
                </TouchableOpacity>
            </View>
            <StatusBar barStyle="light-content" />
            <View
                style={styles.doorStyle}>
                <PinView
                    inputSize={46}
                    ref={pinView}
                    pinLength={4}
                    buttonSize={70}
                    onValueChange={value => setEnteredPin(value)}
                    buttonAreaStyle={{
                        marginHorizontal: 30,
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: !door?"#8DA0E2": "rgba(0,0,0,0.05)",
                        backgroundColor:!door?"#8DA0E2": "rgba(0,0,0,0.05)",
                    }}
                    activeOpacity={0.6}

                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.10)",
                        marginHorizontal: 10,

                    }}
                    inputViewFilledStyle={{
                        backgroundColor: !door?"#8DA0E2": "rgba(0,0,0,0.05)",
                        marginHorizontal: 10,
                    }}
                    buttonTextStyle={{
                        color: !door?"#000000": "rgba(178,174,174,0.05)",
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            pinView.current.clear()
                        }
                        if (key === "custom_right") {
                            // alert("Entered Pin: " + enteredPin)
                            handlePin(enteredPin)
                            // setEnteredPin('')
                            // pinView.current.clear()
                        }
                    }}
                    customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={46} color={!door?"#131313": "rgba(178,174,174,0.1)"} /> : undefined}
                    customRightButton={showCompletedButton ? <Icon name={"checkmark-circle"} size={46} color={!door?"#131313": "rgba(178,174,174,0.1)"} /> : undefined}
                />
            </View>
            {door&&
                (
                    <View style={styles.blockDoor}>
                        <View style={styles.darkenDoor}>
                            <Ionicons name="lock-open" size={100} color={'#2f7539'} />
                        <Text style={styles.counter}>{time}s</Text>
                        </View>
                    </View>
                )
            }
            {snackVisible&&(
                <Snackbar
                    message={errorMessage}
                    action={<Button variant="text" title="Dismiss" color="#BB86FC" onPress={e=>changeSnack(false)} compact />}
                    style={{ position: "absolute",
                        start: 16, end: 16, bottom: 16,

                    }} />
            )}
        </View>
    )
}


const SpeakerDevice = ({data}) =>{
    const [percent,changePercent] = useState(data.value)
    const [isSaved,changeSaved] = useState(false)
    const [play,changePlay] = useState(false)


    const handleSend =() => {
        const info = {
            id: data.id,
            value:percent,
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
            <View style={{ aspectRatio: 1,
                height:200,
            }}>
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={'100%'}
                    height={'100%'}
                    aria-hidden="true"
                    className="iconify iconify--twemoji"
                    viewBox="0 0 36 36"
                >
                    <Path
                        fill="#8899A6"
                        d="M2 10s-2 0-2 2v12c0 2 2 2 2 2h6l8 8s1 1 2 1h1s1 0 1-1V2s0-1-1-1h-1c-1 0-2 1-2 1l-8 8H2z"
                    />
                    <Path
                        fill="#CCD6DD"
                        d="m8 26 8 8s1 1 2 1h1s1 0 1-1V2s0-1-1-1h-1c-1 0-2 1-2 1l-8 8v16z"
                    />
                    <Path
                        fill={percent>77?"#8899A6":"rgba(255,255,255,0)"}
                        d="M29 32.019a.945.945 0 0 1-.615-1.666c3.603-3.071 5.668-7.551 5.668-12.29s-2.066-9.219-5.669-12.29a.947.947 0 0 1 1.229-1.44 18.017 18.017 0 0 1 6.333 13.73 18.016 18.016 0 0 1-6.332 13.729.944.944 0 0 1-.614.227z"
                    />
                    <Path
                        fill={percent>44?"#8899A6":"rgba(255,255,255,0)"}
                        d="M26.27 28.959a.927.927 0 0 1-.592-1.645 12.04 12.04 0 0 0 4.394-9.315 12.05 12.05 0 0 0-4.311-9.245.929.929 0 0 1 1.196-1.422 13.905 13.905 0 0 1 4.973 10.667c0 4.172-1.848 8.089-5.069 10.746a.918.918 0 0 1-.591.214z"
                    />
                    <Path
                        fill={percent>10?"#8899A6":"rgba(255,255,255,0)"}
                        d="M23.709 25.959a.998.998 0 0 1-.636-1.772A7.98 7.98 0 0 0 26 18a7.968 7.968 0 0 0-2.988-6.236 1 1 0 1 1 1.254-1.558A9.96 9.96 0 0 1 28 18a9.972 9.972 0 0 1-3.657 7.731.99.99 0 0 1-.634.228z"
                    />
                </Svg>
            </View>




                <View style={styles.player}>
                    <TouchableOpacity style={styles.playIcon}>
                        <Ionicons name={'play-back'} size={50} color={'#ffffff'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playIcon} onPress={e=>changePlay(!play)}>
                        {!play?<Ionicons name={'play'} size={60} color={'#ffffff'} />:<Ionicons name={'pause'} size={60} color={'#ffffff'} />}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playIcon}>
                        <Ionicons name={'play-forward'} size={50} color={'#ffffff'} />
                    </TouchableOpacity>
                </View>
            <Slider
                style={{width: 200, height: 60}}
                minimumValue={0}
                value={percent}
                onValueChange={changePercent}
                maximumValue={100}
                onSlidingComplete={handleSend}
                minimumTrackTintColor="#8899A6"
                maximumTrackTintColor="#434950FF"
            />

        </View>
    )
}

const OtherDevice = ({data}) =>{
    const [percent,changePercent] = useState(data.value)
    const [isSaved,changeSaved] = useState(false)
    const [isOn,changeOn] = useState()
    const handleSend =() => {
        if(isOn){
            const info = {
                id: data.id,
                value:0,
            }
            sendInfo(info).then(response => {
            });
            changePercent(0)
        }
        else{
            const info = {
                id: data.id,
                value:100,
            }
            sendInfo(info).then(response => {
            });
            changePercent(100)
        }
        console.log(percent)

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
        if(percent>0){
            changeOn(true)
        }
        else{
            changeOn(false)
        }
        console.log(percent)
    },[percent])


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
            <View style={{ aspectRatio: 1,
                height:200,
            }}>
                <GetProductImage data={data.type} />
            </View>
            <TouchableOpacity onPress={handleSend} style={styles.goRight}>
                {isOn ?
                    <Ionicons name={'power'} size={170} color={'#52d32b'} />
                    :
                    <Ionicons name={'power'} size={170} color={'#d31616'} />
                }
            </TouchableOpacity>


        </View>
    )
}


const styles = StyleSheet.create({
    goRight:{
        marginTop:50,
      marginRight:-10,
    },
    setLight:{
       position:"absolute",
       bottom:20,

       margin: 0,
    },
    blockDoor:{
        flex:1,
        position:"absolute",
        padding:15,
        // left:0,
        // right:0,
        width:'100%',
        height:'100%',

        alignItems:"center",
        justifyContent:"center"

    },
    darkenDoor:{

        marginTop:60,
        height:450,
        width:350,
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center"
    },
    counter:{
        color:'black',
        fontSize:50,
    },

    doorStyle:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:-100,

    },
    titleContainer:{
        width:'100%',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
    },
    goBackTouch:{
        padding:10,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
    },
    reset:{
        padding:10,
        // alignItems: 'flex-end',
        // justifyContent:'flex-end',
        // transform:'scale(-1, 1)'
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
    },
    blackOverlay:{
        flex:1,
        top:0,
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        alignSelf: "stretch",
        backgroundColor:'#ffffff'
    },
    overlay: {

        height:500,
        width:500,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    player:{
        marginTop:50,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    playIcon:{
        marginHorizontal:20,
    },
    tempView:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:"row",
        margin:0,
    },
    lengthView:{
        marginTop:-10,
    },
    underWash:{
        marginTop:50,
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
    }
});


export {LightDevice,TemperatureDevice,OtherDevice,DoorDevice,SpeakerDevice,WashingDevice}

