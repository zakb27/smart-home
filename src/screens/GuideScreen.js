import {auth} from "../../firebase";
import {EmailAuthProvider, reauthenticateWithCredential, updateEmail} from "firebase/auth";
import {updateFirebaseEmail} from "../hooks/Database";
import {SafeAreaView} from "react-native-safe-area-context";
import {LinearGradient} from "expo-linear-gradient";
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, {G, Path, Rect} from "react-native-svg";
import {Snackbar} from "@react-native-material/core";

const GuideScreen = ({navigation}) =>{

    return(
        <SafeAreaView
            style={styles.container}
            behavior="padding"
        >
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>

            <View style={styles.titleContainer}>
                <TouchableOpacity style={styles.goBackTouch} onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-outline' size={40} color={'#8DA0E2'} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>How to use</Text>
            </View>
            <View style={styles.addContainer}>
                <ScrollView contentContainerStyle={styles.addContainer2}>
                    <Text style={styles.subtitle}>Get started</Text>
                    <Text style={styles.body}>To get started you have to press the plus button to fill in the form to create a room, once completed you can sync a device by
                        pressing the plus button again to add a device tied to a room. Now there should be a device that can be accessed from the all devices button.
                        You can bookmark a device by pressing the bookmark icon on the device page which should get you started on the main page.
                    </Text>
                    <Text style={styles.subtitle}>Dashboard</Text>
                    <Text style={styles.body}>The dashboard is a central hub for your devices, it displays information such as whether a washing machine is running
                        or the average temperature of the house or how many devices are connected to your system. It also can be a home for bookmarked devices for
                        easy access.
                    </Text>
                    <Text style={styles.subtitle}>Rooms</Text>
                    <Text style={styles.body}>The rooms page shows all of the rooms that you have synced to your account, as mentioned before to get started you can create
                        a room with the plus icon and add a device to a room as well. From there you can click the room page to view the devices from there.
                    </Text>
                    <Text style={styles.subtitle}>Search</Text>
                    <Text style={styles.body}>The search page allows you to enter a prompt into the search bar and it searches for devices matching that prompt,
                        from there you can click on the devices that return to edit the device.
                    </Text>
                    <Text style={styles.subtitle}>User</Text>
                    <Text style={styles.body}>The user page shows information such as name and email as well as providing this guide page, additionally you can edit your email
                        or password and finally can sign out.
                    </Text>
                    <Text style={styles.subtitle}>Devices</Text>
                    <Text style={styles.body}>Clicking on a device opens up the control panel where you can control your devices as follows: {'\n'}
                        Light:A circular slider that can control the light emitted from the smart bulb, click on button to accept changes {'\n'}
                        Temperature: A radial slider to control the temperature, click on button to accept changes {'\n'}
                        Speaker: A slider to control the volume of your speaker {'\n'}
                        Washing Machine: Two sliders to control temperature and time of machine, click on button to accept changes {'\n'}
                        Dish washer: Two sliders as well to control temperature and time taken, click on button to accept changes {'\n'}
                        Door: Enter pin code attributed to your smart door to open for ten seconds, click on tick to accept changes {'\n'}
                        Other: Simple off/on switch
                    </Text>
                    <Text style={styles.subtitle}>Schedules</Text>
                    <Text style={styles.body}>For lights and temperature control you have the option of setting up an automation of each device by choosing a date, time and value
                        for the device which will applied to the schedule of your smart device.
                    </Text>
                </ScrollView>
            </View>

        </SafeAreaView>)
}
export default GuideScreen


const styles = StyleSheet.create({
        container:{
            flex:1,
        },
        userContainer: {
            flex: 1,
            alignItems: 'center',
        },
        titleContainer:{
            width:'100%',
            flexDirection:"row",
        },
        goBackTouch:{
            paddingLeft:20,
            alignItems: 'center',
            justifyContent:'center',
        },
        mainTitle:{
            color:'#8da0e2',
            fontSize:40,
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            fontWeight: '700',
        },
        textInput:{
            width:'100%',
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.13)',
            marginBottom:25,
            fontWeight: '700',
            padding:15,
            borderRadius:10,
            // backgroundColor:'#C4CBFD',
            color:'#8DA0E2',
        },

        addContainer:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            width:'100%',

        },
        addContainer2:{
            backgroundColor:'rgba(255,255,255,0.9)',
            width:'90%',
            paddingVertical:10,
            paddingHorizontal:10,
            borderRadius:10,
        },
        button: {
            // backgroundColor: '#b8f5e4',
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.13)',
            width: '100%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
        },
        buttonText: {
            color: '#7590db',
            fontWeight: '700',
            fontSize: 16,
        },
        title:{
            color:'#8da0e2',
            fontSize:23,
            borderBottomColor:'#8da0e2',
            borderBottomWidth:2,
            textAlign:'center',
            fontWeight: '700',
            marginBottom:10,
        },
        subtitle:{
            color:'#8da0e2',
            fontSize:20,
            fontWeight: '700',

        },
        body:{
            color:'black',
            fontSize:15,

        },
        imageContainer:{
            width:150,
            height:150,
            marginBottom:30,

        },


    }
);