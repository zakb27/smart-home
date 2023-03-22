import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import React,{useEffect} from "react";
import {auth, db} from "../../firebase";
import {collection, getDocs} from "firebase/firestore";
import {fetchDevices} from "../hooks/Database";


const EditRoomScreen = ({navigation}) =>{

    // useEffect(() => {
    //     const compareDevices = async() =>{
    //
    //         const email = auth.currentUser?.email
    //         const docRef = await collection(db,'users',email,'devices')
    //         const roomRef = await collection(db,'users',email,'rooms')
    //         const docsSnap = await getDocs(docRef);
    //         const roomsSnap = await getDocs(roomRef)
    //         const allDevices = await fetchDevices()
    //         const hew = []
    //         const fire = []
    //         docsSnap.forEach(doc=>{
    //             fire.push(doc.data())
    //         })
    //         allDevices.forEach(device=>{
    //             const found = fire.find(el => el.id === device.id);
    //             if (!found) hew.push({ label: device.name,value: device.id});
    //         })
    //         setItems(hew);
    //         const tempRooms = []
    //         roomsSnap.forEach(doc=>{
    //             tempRooms.push({label:doc.data().name,value:doc.id})
    //         })
    //         changeRooms(tempRooms);
    //     }
    //     compareDevices().then();
    // }, [navigation,isEnabled]);


    return(

        <SafeAreaView style={styles.container}>

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
                <Text style={styles.mainTitle}>Edit Room</Text>
            </View>

        </SafeAreaView>
    )

}

export default EditRoomScreen;

const styles = StyleSheet.create({
    container:{
       flex:1,
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
})