import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button,ScrollView,Pressable} from 'react-native';
import {createSchedule, getSchedule, deleteSchedule} from "../hooks/Database";
import { createStackNavigator } from '@react-navigation/stack';
import EditSchedule from "../components/EditSchedule";
import ScheduleScreen from "./ScheduleScreen";
import {LinearGradient} from "expo-linear-gradient";
const Stack = createStackNavigator();

const ViewScheduleScreen = ({route,navigation}) =>{
    const [schedules,updateSchedules] = useState([]);
    const data = route.params.data;
    const [updatedData,updateData] = useState('');

    const handleRemove = (data)=>{
        deleteSchedule(data).then((response)=>{
            console.log(response)
            updateData(response)
        })

    }

    useEffect(()=>{
        const test =  navigation.addListener('focus', () => {
            getSchedule(data.id).then((response) => {
                updateSchedules(response);
            })
        });
        getSchedule(data.id).then((response) => {
            updateSchedules(response);
        })
        test();
    },[navigation,updatedData])


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
            <ScrollView>
                {schedules.map((item,index)=> {
                    return (
                        <View style={styles.scheduleView} key={index}>
                            <Pressable style={styles.dayButton}
                                       onPress={() => {
                                           alert('todo')
                                       }}
                            >
                                <Text>{item.days}{item.startTime}{item.endTime}</Text>
                            </Pressable>
                            <TouchableOpacity style={styles.removeButton}
                                              onPress={()=>handleRemove(item)}
                            >
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default ViewScheduleScreen;


const styles = StyleSheet.create({
    scheduleView:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:300,
        height:50,
        borderColor:"black",
        borderWidth:1,
        borderRadius:5,
        overflow:'hidden',
    },
    removeButton:{
        backgroundColor:"#e63946",
        borderLeftColor:"black",
        borderLeftWidth:3,
        width:45,
        alignItems:"center",
        justifyContent:"center"
    },
    dayButton:{
        flex:1,
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        font:'black',
        backgroundColor:'#a8dadc',

    },
    modalView: {
        paddingTop:100,
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        flex:1,
        alignSelf: "stretch",
        height:600,
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",

    }
});