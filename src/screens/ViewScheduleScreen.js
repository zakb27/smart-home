import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button,ScrollView,Pressable} from 'react-native';
import {createSchedule, getSchedule, deleteSchedule} from "../hooks/Database";
import { createStackNavigator } from '@react-navigation/stack';
import EditSchedule from "../components/EditSchedule";
import ScheduleScreen from "./ScheduleScreen";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
const Stack = createStackNavigator();

const ViewScheduleScreen = ({route,navigation}) =>{
    const [schedules,updateSchedules] = useState([]);
    const data = route.params.data;
    const [updatedData,updateData] = useState('');

    const handleRemove = (data)=>{
        deleteSchedule(data).then((response)=>{
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
            console.log(response)
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
            <Text style={styles.titleText}>Schedules for the week</Text>
            <ScrollView>
                {schedules.map((item,index)=> {
                    return (
                        <View style={styles.card} key={index}>
                            <View style={styles.days}>
                                {item.days.map((day,dayIndex)=>{
                                    return(
                                        <View key={dayIndex} style={styles.dayView}>
                                            <Text style={styles.dayText}>{day.slice(0,2)}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={styles.textView}
                            >
                                <Text style={styles.text}>Value</Text>
                                <Text style={styles.text}> {item.value}%</Text>
                            </View>
                            <View style={styles.textView}
                            >
                                <Text style={styles.text}>Start: {item.startTime}</Text>
                                <Text style={styles.text}> End:  {item.endTime}</Text>
                            </View>

                            <TouchableOpacity style={styles.removeButton}
                                              onPress={()=>handleRemove(item)}
                            >
                                <Ionicons name={'trash-outline'} size={25} color={'#cc3737'} />
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
    titleText:{
        color:'#333333',
        fontSize:27,
        position:'absolute',
        paddingTop:60,
        fontWeight: '500',
        marginBottom:25,
    },
    removeButton:{
        // backgroundColor:"#e63946",
        position:"absolute",
        right:0,
        width:45,
        height:'100%',
        alignItems:"center",
        justifyContent:"center"
    },
    card: {
        width:265,
        height:60,
        margin:3,

                // borderBottomWidth:'1',
        // borderBottomColor:'black',
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:7,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent:'space-evenly',
        paddingRight:50,
    },
    text: {
        color: '#1e1d1d',
        fontWeight: '400',
        fontSize: 9,
        textAlign:'left',
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
    },
    days:{
        display:"flex",
        flexDirection:'row',
        alignItems:'center',
        width:'45%',
        flexWrap:'wrap',
    },
    dayView:{
        margin:1,
        backgroundColor:'#f3f3f3',
        borderRadius:50,
        height:20,
        width:20,
        alignItems:'center',
        justifyContent:"center",
    },
    dayText:{
        fontSize:10,
    },
});