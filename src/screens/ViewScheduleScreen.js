import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button,ScrollView} from 'react-native';
import {createSchedule, getSchedule, deleteSchedule} from "../hooks/Database";
import { createStackNavigator } from '@react-navigation/stack';
import EditSchedule from "../components/EditSchedule";
import ScheduleScreen from "./ScheduleScreen";
const Stack = createStackNavigator();

const ViewSchedules= ({route,navigation}) =>{
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
            <Button  title="To Schedule" onPress={() => navigation.navigate("CreateSchedule",{data:data})} />
            <ScrollView>
                {schedules.map((item,index)=> {
                    return (
                        <View style={styles.scheduleView} key={index}>
                        <TouchableOpacity style={styles.dayButton}
                                          onPress={() => {
                                              navigation.navigate('EditSchedule',
                                                  {
                                                      ids: item.ids
                                                  })
                                          }}
                        >
                            <Text>{item.days}{item.startTime}{item.endTime}</Text>
                        </TouchableOpacity>
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


const ViewScheduleScreen = ({route}) =>{
    const data = route.params.data


        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    styles:{backgroundColor: 'blue'}
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
        height:500,
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",

    }
});