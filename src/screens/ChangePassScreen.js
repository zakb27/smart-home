import React, {useState} from "react";
import {updateEmail, reauthenticateWithCredential, updatePassword} from "firebase/auth";
import {auth} from "../../firebase";
import { EmailAuthProvider } from "firebase/auth";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetRoomImage from "../components/GetRoomImage";
import DropDownPicker from "react-native-dropdown-picker";
import {Snackbar} from "@react-native-material/core";
import {checkEmailExists,updateFirebaseEmail} from "../hooks/Database";

const ChangePassScreen = ({navigation}) =>{
    const [email,setEmail] = useState('');
    const [oldPass,setOldPass] = useState('');
    const [newPass,setNewPass] = useState('');
    const [confirmPass,setConfirmPass] = useState('');
    const [snackVisible,changeSnack] = useState(false)
    const [errorMessage,changeErrorMessage] = useState("Error");

    const handlePassChange = async() =>{
        try{
            if(newPass.length<6){
                throw new Error('Minimum 6 characters')
            }
            if(newPass!==confirmPass){
                throw new Error('New passwords don\'t match')
            }
            if(oldPass===newPass){
                throw new Error('Can\'t use old password')
            }

            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                user.email,
                oldPass
            );

            await reauthenticateWithCredential(user,credential).then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Reauthenticated in with:', user.email);
            }).catch((error) => {
                throw new Error('Original details wrong')
            });

            await updatePassword(auth.currentUser,newPass).then(()=>{
                alert('Password updated')
                navigation.goBack()
            }).catch((error)=>{
                console.log(error)
                throw new Error('Password error please try again')
            })
        }
        catch(e){
            console.log(e)
            changeErrorMessage(e.toString())
            changeSnack(true)
        }
    }

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
                <Text style={styles.mainTitle}>Change password</Text>
            </View>
            <View style={styles.addContainer}>
                <View style={styles.addContainer2}>
                    <View style={styles.imageContainer}>
                        <GetRoomImage type={'other'} />
                    </View>
                    <TextInput
                        placeholder="Email: "
                        value={email}
                        onChangeText={text => setEmail(text.toLowerCase())}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Old password: "
                        value={oldPass}
                        onChangeText={text => setOldPass(text.toLowerCase())}
                        style={styles.textInput}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="New password: "
                        value={newPass}
                        onChangeText={text => setNewPass(text.toLowerCase())}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Confirm password: "
                        value={confirmPass}
                        onChangeText={text => setConfirmPass(text.toLowerCase())}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        onPress={handlePassChange}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Change Password</Text>
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
        </SafeAreaView>)
}
export default ChangePassScreen

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
            fontSize:35,
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'center',
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

            justifyContent:'center',
            alignItems:'center',
            width:'80%',
            paddingVertical:30,
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
        imageContainer:{
            width:150,
            height:150,
            marginBottom:30,

        },
    }
);