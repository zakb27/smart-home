import RoomScreen from "./RoomScreen";
import AllDeviceScreen from "./AllDeviceScreen";
import React,{useState} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth, db} from "../../firebase";
import {collection, doc, setDoc,addDoc,getDocs} from "firebase/firestore";
import { Snackbar } from "@react-native-material/core";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetRoomImage from "../components/GetRoomImage";



const AddRoomScreen = ({navigation})=>{
    const [roomName,setName] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('other');
    const [items, setItems] = useState([
        {label: 'Living Room', value: 'living_room'},
        {label: 'Kitchen', value: 'kitchen'},
        {label: 'Bedroom', value: 'bedroom'},
        {label: 'Bathroom', value: 'bathroom'},
        {label: 'Entry room', value: 'entry'},
        {label: 'Garden', value: 'garden'},
        {label: 'Garage', value: 'garage'},
        {label: 'Other', value: 'other'},

    ]);
    const [snackVisible,changeSnack] = useState(false)
    const [errorMessage,changeErrorMessage] = useState("Error");

    const addRoom = async() =>{
        try{
            if(roomName===''){
                changeSnack(true);
                throw new Error('Enter name');
            }
            const email = auth.currentUser?.email

            const docRef = await collection(db,'users',email,'rooms')

            const docsSnap = await getDocs(docRef);

            docsSnap.forEach(doc =>{
                if (doc.data().name.toLowerCase() ===roomName.toLowerCase()){
                    changeSnack(true)
                    throw new Error('Name taken');
                }
            })
            await addDoc(docRef, {
                name: roomName,
                type: value
            });
            console.log("Created Room")
            changeSnack(true)
            changeErrorMessage('Room Created')
        }
        catch(e){
            changeSnack(true)
            changeErrorMessage(e.toString())
        }

    }

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
                <Text style={styles.mainTitle}>Add Room</Text>
            </View>

            <View style={styles.addContainer}>
                <View style={styles.addContainer2}>
                    <View style={styles.imageContainer}>
                        <GetRoomImage type={value} />
                    </View>
                <TextInput
                    placeholder="Choose name... " onChangeText={setName}
                    value={roomName}
                    style={styles.textInput}
                    placeholderTextColor={'#C4CBFD'}/>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.dropDown}
                />

                <TouchableOpacity style={styles.button}  onPress={() => {
                    addRoom();
                }}>
                    <Text style={styles.buttonText}>Add Room</Text>
                </TouchableOpacity>
                </View>
            </View>

            {snackVisible&&(
                <Snackbar
                    message={errorMessage}
                    action={<Button variant="text" title="Dismiss" color="#BB86FC" onPress={e=>changeSnack(false)} compact />}
                    style={{ position: "absolute",
                        start: 16, end: 16, bottom: 16,

                }} />
                    )}


        </SafeAreaView>
    )
}

export default AddRoomScreen;




const styles = StyleSheet.create({

    container:{
        flex:1,
        // justifyContent:'center',
        alignItems:"center",
    },
    dropDown:{
        backgroundColor:'rgba(0,0,0,0)',
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.13)',
        marginBottom:30,
        color: '#7590db',
        fontWeight: '700',
        fontSize: 16,
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

        justifyContent:'center',
        alignItems:'center',
        width:'80%',
        paddingVertical:30,
        paddingHorizontal:10,
        borderRadius:10,
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
    imageContainer:{
        width:150,
        height:150,
        marginBottom:30,

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