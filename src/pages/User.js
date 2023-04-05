import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableOpacity, KeyboardAvoidingView, ImageBackground
} from 'react-native';
import {auth} from "../../firebase";
import {signOut,updateEmail,updatePassword} from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import * as ImagePicker from 'expo-image-picker';
import {fetchProf, fetchRooms} from "../hooks/Database";
import { getStorage,ref,uploadString,getDownloadURL,uploadBytesResumable } from "firebase/storage";
import placeholder from "../assets/placeholder_main.png";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";
import ChangePassScreen from "../screens/ChangePassScreen";
import AddDoorCodeScreen from "../screens/AddDoorCodeScreen";

const Display = ({navigation}) =>{
    const [image, setImage] = useState(null);
    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Sign out successful')
            })
            .catch(error => alert(error.message))
    }


    useEffect(() => {
        fetchProf().then((data)=>{
            const storage = getStorage();
            // const pathReference = ref(storage, data.url);
            const pathReference = ref(storage, data[0].url);
            const test = async () =>{
                const url = await getDownloadURL(pathReference)
                setImage(url)
                setFirst(data[0].first)
                setLast(data[0].last)
            }
            test();

        })
    }, []);


    return(
        <SafeAreaView style={styles.userContainer}>
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>{first}</Text>
            </View>
            <View style={styles.profileContainer}>
                <View style={styles.profilePresser}>
                <View style={styles.imageContainer}>
                    {image && <Image resizeMode="cover" source={{uri:image}} style={styles.image} />}
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.nameContainer}>
                        {first && <Text style={styles.name}>{first}</Text>}
                        {last && <Text style={styles.name}>{last}</Text>}
                    </View>
                    <Text>{auth.currentUser?.email}</Text>
                </View>
                </View>
            </View>
            <View style={styles.changeContainer}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("Email")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Change Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.navigate("Password")}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>


    )
}

const UserMain = ()=>{

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Display} />
            <Stack.Screen name="Email" component={ChangeEmailScreen} />
            <Stack.Screen name="Password" component={ChangePassScreen} />
            <Stack.Screen name="Door" component={AddDoorCodeScreen} />
        </Stack.Navigator>


    )
}

export {UserMain};


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
        paddingHorizontal:30,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        fontWeight: '700',
    },

    detailsContainer:{
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
        padding:20,

    },

    nameContainer:{
        flexDirection:"row",
    },
    name:{
        fontSize:30,
        marginRight:5,
        paddingBottom:10,
    },

    profileContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop:40,
        paddingBottom:100,

    },
    profilePresser:{

        flexDirection:"row",
        justifyContent:'space-between',
        width:'90%',
        paddingHorizontal:30,
        paddingVertical:15,
        borderRadius:10,
        backgroundColor:'rgba(255,255,255,0.9)',
    },
    image:{
        borderRadius:'50%',
        width:100,
        height:100,
    },
    changeContainer:{
        height:'30%',
        width:'55%',
        backgroundColor:'rgba(255,255,255,0.9)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,

    },
    button: {
        backgroundColor: 'rgba(255,255,255,0)',
        width: '100%',
        height:'33%',
        padding: 15,
        margin:0,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        textAlign:'right',

    },
    buttonText: {
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 16,
    },
})