import React, { useEffect, useState,useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet,ImageBackground, SafeAreaView, StatusBar,} from 'react-native';
import {sendInfo, checkSaved, performSave} from "../hooks/Database";
import Icon from "react-native-vector-icons/Ionicons"
import { RadialSlider } from 'react-native-radial-slider';
import Slider from '@react-native-community/slider';
import PinView from 'react-native-pin-view';

const DeadLightDevice = (schedule) =>{
    const percent = schedule.value;
    const changePercent = schedule.changeValue;

    return(

        <View>
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
                          sliderWidth={15}
                          thumbBorderWidth={10}
                          thumbRadius={15}
                          isHideValue={true}
                          isHideLines={true}
                          isHideTailText={true}
                          isHideButtons={true}
            />
        </View>
    )
}
const DeadTemperatureDevice = (schedule) =>{
    const speed = schedule.value;
    const setSpeed = schedule.changeValue
    return(

        <View>
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
                          isHideButtons={true}
            />

        </View>
    )
}


const styles = StyleSheet.create({
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
});


export {DeadLightDevice,DeadTemperatureDevice}

