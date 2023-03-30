import React, {useState} from "react";
import {updateEmail,reauthenticateWithCredential} from "firebase/auth";
import {auth} from "../../firebase";
import { EmailAuthProvider } from "firebase/auth";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetRoomImage from "../components/GetRoomImage";
import DropDownPicker from "react-native-dropdown-picker";
import {Snackbar} from "@react-native-material/core";
import {checkEmailExists,updateFirebaseEmail} from "../hooks/Database";

const ChangeEmailScreen = ({navigation}) =>{
    const [oldEmail,setOld] = useState('');
    const [newEmail,setNew] = useState('');
    const [pass,setPass] = useState('');
    const [snackVisible,changeSnack] = useState(false)
    const [errorMessage,changeErrorMessage] = useState("Error");


    const handleEmailChange = async() =>{
        try{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if(!reg.test(newEmail)){
                throw new Error('Not valid email')
            }
            if(auth.currentUser.email!==oldEmail){
                throw new Error('Not old email')
            }

            if(oldEmail===newEmail){
                throw new Error('Cannot use same email')
            }

            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                user.email,
                pass
            );

            await reauthenticateWithCredential(user,credential).then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Reauthenticated in with:', user.email);
            }).catch((error) => {
                throw new Error('Original details wrong')
            });

            await updateEmail(auth.currentUser,newEmail)
                .then(()=>{
                console.log('Email updated')
            }).catch((e)=>{
                changeErrorMessage('Email in use')
                changeSnack(true)
                return ''
            })


            await updateFirebaseEmail({oldEmail,newEmail}).then((r)=>{
                if(r){
                    throw new Error('Issue with updating firebase make new account')
                }
                else{
                    alert('Email updated')
                    navigation.goBack();
                }
            })
        }

        catch(error){
            console.log(error)
            changeErrorMessage(error.toString())
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
                <Text style={styles.mainTitle}>Change email</Text>
            </View>
            <View style={styles.addContainer}>
                <View style={styles.addContainer2}>
                    <View style={styles.imageContainer}>
                        <GetRoomImage type={'other'} />
                    </View>
                    <TextInput
                        placeholder="Old Email: "
                        value={oldEmail}
                        onChangeText={text => setOld(text.toLowerCase())}
                        style={styles.textInput}
                    />
                    <TextInput
                        placeholder="Password: "
                        value={pass}
                        onChangeText={text => setPass(text.toLowerCase())}
                        style={styles.textInput}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="New email: "
                        value={newEmail}
                        onChangeText={text => setNew(text.toLowerCase())}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        onPress={handleEmailChange}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Change Email</Text>
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
export default ChangeEmailScreen

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