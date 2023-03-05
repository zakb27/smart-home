import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button} from 'react-native';
import {DoorDevice, LightDevice,TemperatureDevice} from "../devices/Devices";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    SelectMultipleButton,
    SelectMultipleGroupButton
} from "react-native-selectmultiple-button";

const DAYS = [
    {
        key: "sunday",
        label: "S"
    },
    {
        key: "monday",
        label: "M"
    },
    {
        key: "tuesday",
        label: "T"
    },
    {
        key: "wednesday",
        label: "W"
    },
    {
        key: "thursday",
        label: "T"
    },
    {
        key: "friday",
        label: "F"
    },
    {
        key: "saturday",
        label: "S"
    }
];


const ios_blue = "#007AFF";
const themeColor = "#0D1014";

const ScheduleScreen = () =>{
    const [date, setDate] = useState(new Date(1598051730000));
    const [date2, setDate2] = useState(new Date(1598053001002));
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const onChange = (event, selectedDate) => {

        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        console.log(date)
    };
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow2(false);
        setDate2(currentDate);
    };



    return(
        <View style={styles.modalView}>
            <View style={styles.buttonContainer}>
                {DAYS.map((day,index)=>(
                    <TouchableOpacity key={index} style={styles.dayButton}>
                        <Text>{day.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            {/*<SelectMultipleGroupButton*/}
            {/*    multiple={true}*/}
            {/*    group={[*/}
            {/*        { value: "SimpleBtn" },*/}
            {/*        { value: "GroupBtn" },*/}
            {/*        { value: "Segment" },*/}
            {/*        { value: "List" }*/}
            {/*    ]}*/}
            {/*    defaultSelectedIndexes={[0]}*/}
            {/*    buttonViewStyle={{ flex: 1, margin: 0, borderRadius: 0 }}*/}
            {/*    highLightStyle={{*/}
            {/*        borderColor: ios_blue,*/}
            {/*        textColor: ios_blue,*/}
            {/*        backgroundColor: themeColor,*/}
            {/*        borderTintColor: ios_blue,*/}
            {/*        textTintColor: "white",*/}
            {/*        backgroundTintColor: ios_blue*/}
            {/*    }}*/}
            {/*/>*/}


                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChange}
                />
            <DateTimePicker
                testID="dateTimePicker"
                value={date2}
                mode={'time'}
                is24Hour={true}
                onChange={onChange2}
            />
        </View>

    )
}

export default ScheduleScreen;


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
    modalView: {
        paddingTop:50,
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