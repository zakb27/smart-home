import React, {useState} from "react";
import {updateEmail,reauthenticateWithCredential} from "firebase/auth";
import {auth} from "../../firebase";
import { EmailAuthProvider } from "firebase/auth";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetRoomImage from "../components/GetRoomImage";
import DropDownPicker from "react-native-dropdown-picker";
import {Snackbar} from "@react-native-material/core";
import {checkEmailExists,updateFirebaseEmail} from "../hooks/Database";
import Svg, {G, Path, Rect} from "react-native-svg";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

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
                throw new Error('Email authentication error')
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
                throw new Error('Email authentication error')
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
                    throw new Error('Email change failed')
                }
                else{
                    alert('Email updated')
                    navigation.goBack();
                }
            })
        }

        catch(error){
            console.log(error)
            changeErrorMessage(error.message.toString())
            changeSnack(true)
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
                <Text style={styles.mainTitle}>Change email</Text>
            </View>
            <KeyboardAvoidingView style={styles.addContainer}
                                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.addContainer2}>
                    <View style={styles.imageContainer}>
                        <Svg
                            width={150} height={150} viewBox="-0.04 0 96 96" xmlns="http://www.w3.org/2000/svg"
                        >
                            <G
                                data-name="Group 7"
                                transform="translate(-111 -696)"
                                stroke="#8da0e2"
                                strokeLinejoin="round"
                                strokeWidth={4}
                            >
                                <Path
                                    data-name="Rectangle 54"
                                    fill="#cdf4f0"
                                    strokeLinecap="round"
                                    d="M181 707h14v36h-14z"
                                />
                                <Path
                                    data-name="Path 54"
                                    d="m159 709-36 33v48h72v-49Z"
                                    fill="#cdf4f0"
                                    strokeLinecap="round"
                                />
                                <Path
                                    data-name="Rectangle 55"
                                    fill="#ebf4f7"
                                    strokeLinecap="round"
                                    d="M148 765h22v25h-22z"
                                />
                                <Rect
                                    data-name="Rectangle 60"
                                    width={30}
                                    height={10}
                                    rx={5}
                                    transform="translate(144 755)"
                                    fill="#fff"
                                />
                                <Rect
                                    data-name="Rectangle 61"
                                    width={22}
                                    height={10}
                                    rx={5}
                                    transform="translate(177 698)"
                                    fill="#fff"
                                />
                                <Path
                                    data-name="Path 58"
                                    d="m202 736.858-35.929-35.929a10 10 0 0 0-14.142 0L116 736.858a9.978 9.978 0 0 0-2.878 8.067A5.009 5.009 0 0 0 113 746v20a5 5 0 0 0 10 0v-8a5 5 0 0 0 10 0v-9.858l26-26L187.858 751A10 10 0 0 0 202 736.858Z"
                                    fill="#fff"
                                />
                                <Path
                                    data-name="Line 15"
                                    fill="#fff"
                                    strokeLinecap="round"
                                    d="M123 758v-7"
                                />
                            </G>
                        </Svg>
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
            </KeyboardAvoidingView>

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
            fontWeight: '500',
        },
        textInput:{
            width:'100%',
            borderWidth:1,
            borderColor:'rgba(0,0,0,0.13)',
            marginBottom:25,
            fontWeight: '500',
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