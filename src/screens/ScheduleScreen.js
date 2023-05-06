import React, {useCallback, useEffect, useState} from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Modal,TouchableWithoutFeedback,Button} from 'react-native';
import {DeadDoorDevice, DeadLightDevice,DeadTemperatureDevice} from "../devices/DeadDevices";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {createSchedule, performSave} from "../hooks/Database";
import {LinearGradient} from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
        label: "Sa",
    }
];


const ScheduleScreen = ({route}) =>{
    const [date, setDate] = useState('12:00');
    const [date2, setDate2] = useState('13:00');
    const [isEnabled, setIsEnabled] = useState({});
    const [selectedDays, setSelectedDays] = useState([]);
    const [value,changeValue] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
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
        if(selectedDays.length===0){
            alert('Have to select a day')
            return ''
        }

        if(date>date2){
            alert('Start time must be before the end')
            return ''
        }
        const sender = {
            "id":data.id,
            "value":value,
            "starter":date,
            "ender":date2,
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


    const onChange = (event) => {

        const start = `${event.getHours().toString().padStart(2, '0')}:${event.getMinutes().toString().padStart(2, '0')}`;

        console.log(start)
        setDatePickerVisibility(false)
        setDate(start);

    };
    const onChange2 = (event) => {
        const currentDate = `${event.getHours().toString().padStart(2, '0')}:${event.getMinutes().toString().padStart(2, '0')}`;
        console.log(currentDate)
        setDatePickerVisibility(false)
        setDate2(currentDate);


    };

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
            <Text style={styles.titleText}>Create Schedule</Text>
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
            <View style={styles.rightSide}>

            <View style={styles.timeView}>
                <View style={styles.startTime}>
                    <Text style={styles.timeText}>Start time: </Text>
                    {/*<RNDateTimePicker*/}

                    {/*    testID="dateTimePicker"*/}
                    {/*    value={date}*/}
                    {/*    mode={'time'}*/}
                    {/*    is24Hour*/}
                    {/*    onChange={onChange}*/}
                    {/*/>*/}
                    <Button title={date} onPress={e=>setDatePickerVisibility(true)} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="time"
                        onConfirm={onChange}
                        onCancel={e=>setDatePickerVisibility(false)}
                    />
                </View>
                <View style={styles.startTime}>
                    <Text style={styles.timeText}>End time: </Text>
                    <Button title={date2} onPress={e=>setDatePickerVisibility2(true)} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible2}
                        mode="time"
                        onConfirm={onChange2}
                        onCancel={e=>setDatePickerVisibility2(false)}
                    />
                </View>

            </View>
            {RenderSwitch()}

            <TouchableOpacity onPress={handleSubmit} style={styles.submit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>

        </View>

    )
}

export default ScheduleScreen;


const styles = StyleSheet.create({
    startTime:{
      backgroundColor:'#eeeeef',
      width:'80%',
      height:55,
        borderRadius:8,
      padding:10,
      flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-evenly',
        margin:5,
    },
    timeText:{
        color:'black',
    },
    titleText:{
        color:'#333333',
        fontSize:27,
        position:'absolute',
        top:60,
        right:70,
        fontWeight: '500',
    },
    rightSide:{
        paddingTop:50,
        width:'80%',
       display:"flex",
       flexDirection:"column",
       alignItems:'center',
       justifyContent:'center',
    },
    buttonContainer:{
        flexDirection:'column',
        // position:'absolute',
        // left:10,
        // top:100
    },
    timeView:{
        flexDirection:'column',
        justifyContent:'space-evenly',
    },
    dayButton:{
        borderRadius:50,
        // padding: 15,
        marginVertical:5,
        marginHorizontal:0,
        // borderWidth:1,
        textAlign:'center',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'blue',
        width:50,
        height:50,
        font:'black',

    },
    modalView: {
        bottom:0,
        right:0,
        left:0,
        position:"absolute",
        flex:1,
        alignSelf: "stretch",
        height:600,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        display:"flex",
        flexDirection:"row",
        justifyContent:'center',
        alignItems: "center",
    },
    submit:{
        padding:15,
        width:150,
        backgroundColor:'rgba(41,191,18,0)',
        borderRadius:7,
        borderColor: "#eeeeef",
        borderWidth: 2,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:"center",
        margin:10,

    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
    },
});