import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button} from 'react-native';
import {DeadDoorDevice, DeadLightDevice,DeadTemperatureDevice} from "../devices/DeadDevices";
import DateTimePicker from '@react-native-community/datetimepicker';
import {createSchedule, performSave} from "../hooks/Database";

const DAYS = [
    {
        key: "Sunday",
        label: "Su",
    },
    {
        key: "Monday",
        label: "Mo",
    },
    {
        key: "Tuesday",
        label: "Tu",
    },
    {
        key: "Wednesday",
        label: "We",
    },
    {
        key: "Thursday",
        label: "Th",
    },
    {
        key: "Friday",
        label: "Fr",
    },
    {
        key: "Saturday",
        label: "Su",
    }
];


const ios_blue = "#007AFF";
const themeColor = "#0D1014";

const ScheduleScreen = ({route}) =>{
    const [date, setDate] = useState(new Date(1598051730000));
    const [date2, setDate2] = useState(new Date(1598053001002));
    const [isEnabled, setIsEnabled] = useState({});
    const [selectedDays, setSelectedDays] = useState([]);
    const [value,changeValue] = useState();

    const data = route.params.data;

    const RenderSwitch=()=>{

        switch(data.type){
            case "light":
                return <DeadLightDevice value={value} changeValue = {changeValue}/>
            case "temp":
                return <DeadTemperatureDevice value={value} changeValue = {changeValue} />
            case "door":
                return <DeadDoorDevice value={value} changeValue = {changeValue} />
            default:
                return <Text>Error</Text>
        }
    }

    const handleSubmit = () =>{

        const start = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        const end = `${date2.getHours().toString().padStart(2, '0')}:${date2.getMinutes().toString().padStart(2, '0')}`;
        const sender = {
            "id":data.id,
            "value":value,
            "starter":start,
            "ender":end,
            "days":selectedDays,
        }
        console.log(sender);
        createSchedule(sender).then((data)=>{
            console.log(data);
        })
    }

    const toggleSwitch = (key) => {

        if (selectedDays.includes(key)) {
            setSelectedDays(selectedDays.filter((d) => d !== key));
        } else {
            setSelectedDays([...selectedDays, key]);
        }

        setIsEnabled((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };
    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate2(currentDate);
    };

    return(
        <View style={styles.modalView}>
            <View style={styles.buttonContainer}>
                {DAYS.map((day, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.dayButton,
                            {
                                backgroundColor: isEnabled[day.key]
                                    ? "#f5dd4b"
                                    : "#f4f3f4",
                            },
                        ]}
                        onPress={() => toggleSwitch(day.key)}
                    >
                        <Text>{day.label}</Text>
                    </TouchableOpacity>
                ))}

            </View>
            <View style={styles.timeView}>
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
            {RenderSwitch()}

            <TouchableOpacity onPress={handleSubmit}>
                <Text>Submit</Text>
            </TouchableOpacity>

        </View>

    )
}

export default ScheduleScreen;


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