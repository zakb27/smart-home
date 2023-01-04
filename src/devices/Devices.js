import React, { useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity,Button,StyleSheet} from 'react-native';

const LightDevice = ({id,type,name}) =>{


    return(

        <View>
            <Text>This is the light of {name}</Text>
        </View>
    )
}
const TemperatureDevice = ({id,type,name}) =>{
    
    return(

        <View>
            <Text>This is the temp of {name}</Text>
        </View>
    )
}

const WashingDevice = ({id,type,name}) =>{


    return(

        <View>
            <Text>This is the machine of {name}</Text>
        </View>
    )
}
const DoorDevice = ({id,type,name}) =>{


    return(

        <View>
            <Text>This is the door of {name}</Text>
        </View>
    )
}

const DishDevice = ({id,type,name}) =>{


    return(

        <View>
            <Text>This is the dishwasher of {name}</Text>
        </View>
    )
}


const SpeakerDevice = ({id,type,name}) =>{
    return(

        <View>
            <Text>This is the speaker of {name}</Text>
        </View>
    )
}

const OtherDevice = ({id,type,name}) =>{
    return(

        <View>
            <Text>This is the other of {name}</Text>
        </View>
    )
}


export {LightDevice,TemperatureDevice,OtherDevice,DishDevice,DoorDevice,SpeakerDevice,WashingDevice}