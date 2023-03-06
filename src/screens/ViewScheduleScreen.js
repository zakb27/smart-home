import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button,ScrollView} from 'react-native';
import {DeadDoorDevice, DeadLightDevice,DeadTemperatureDevice} from "../devices/DeadDevices";
import DateTimePicker from '@react-native-community/datetimepicker';
import {createSchedule, getSchedule, performSave} from "../hooks/Database";
import { createStackNavigator } from '@react-navigation/stack';
import EditSchedule from "../components/EditSchedule";

import ScheduleScreen from "./ScheduleScreen";
const Stack = createStackNavigator();

const ViewSchedules= ({route,navigation}) =>{
    const [schedules,updateSchedules] = useState([]);
    const data = route.params.data;

    useEffect(()=>{
        getSchedule(data.id).then((response)=>{
            updateSchedules(response);
        })
    },[])


    return(
        <View style={styles.modalView}>
            <Button title="To Schedule" onPress={() => navigation.navigate("CreateSchedule",{data:data})} />
            <ScrollView>
                {schedules.map((item,index)=> {
                    return (
                        <TouchableOpacity key={index}
                                          onPress={() => {
                                              navigation.navigate('EditSchedule',
                                                  {
                                                      ids: item.ids
                                                  })
                                          }}
                        >
                            <Text>{item.days}{item.startTime}{item.endTime}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}


const ViewScheduleScreen = ({route}) =>{
    const data = route.params.data

        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="ViewSchedules" component={ViewSchedules} initialParams={{ data: data }} />
                <Stack.Screen name="EditSchedule" component={EditSchedule} />
                <Stack.Screen name="CreateSchedule" component={ScheduleScreen} />
            </Stack.Navigator>
        )
}

export default ViewScheduleScreen;


const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection:'row',
    },
    timeView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding:20,
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
        paddingTop:100,
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        flex:1,
        alignSelf: "stretch",
        height:500,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
    }
});