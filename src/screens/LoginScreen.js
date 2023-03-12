import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput,Text, TouchableOpacity, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase"
import Ionicons from 'react-native-vector-icons/Ionicons';

import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';
import { SvgUri } from 'react-native-svg';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const handleLogin = () => {
        // const auth = getAuth();
        signInWithEmailAndPassword(auth,email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            {/*<Svg*/}
            {/*    width={200} height={200} viewBox="-0.04 0 96 96" xmlns="http://www.w3.org/2000/svg"*/}
            {/*>*/}
            {/*    <G*/}
            {/*        data-name="Group 7"*/}
            {/*        transform="translate(-111 -696)"*/}
            {/*        stroke="#2d4d68"*/}
            {/*        strokeLinejoin="round"*/}
            {/*        strokeWidth={4}*/}
            {/*    >*/}
            {/*        <Path*/}
            {/*            data-name="Rectangle 54"*/}
            {/*            fill="#5aade0"*/}
            {/*            strokeLinecap="round"*/}
            {/*            d="M181 707h14v36h-14z"*/}
            {/*        />*/}
            {/*        <Path*/}
            {/*            data-name="Path 54"*/}
            {/*            d="m159 709-36 33v48h72v-49Z"*/}
            {/*            fill="#5aade0"*/}
            {/*            strokeLinecap="round"*/}
            {/*        />*/}
            {/*        <Path*/}
            {/*            data-name="Rectangle 55"*/}
            {/*            fill="#ebf4f7"*/}
            {/*            strokeLinecap="round"*/}
            {/*            d="M148 765h22v25h-22z"*/}
            {/*        />*/}
            {/*        <Rect*/}
            {/*            data-name="Rectangle 60"*/}
            {/*            width={30}*/}
            {/*            height={10}*/}
            {/*            rx={5}*/}
            {/*            transform="translate(144 755)"*/}
            {/*            fill="#fff"*/}
            {/*        />*/}
            {/*        <Rect*/}
            {/*            data-name="Rectangle 61"*/}
            {/*            width={22}*/}
            {/*            height={10}*/}
            {/*            rx={5}*/}
            {/*            transform="translate(177 698)"*/}
            {/*            fill="#fff"*/}
            {/*        />*/}
            {/*        <Path*/}
            {/*            data-name="Path 58"*/}
            {/*            d="m202 736.858-35.929-35.929a10 10 0 0 0-14.142 0L116 736.858a9.978 9.978 0 0 0-2.878 8.067A5.009 5.009 0 0 0 113 746v20a5 5 0 0 0 10 0v-8a5 5 0 0 0 10 0v-9.858l26-26L187.858 751A10 10 0 0 0 202 736.858Z"*/}
            {/*            fill="#fff"*/}
            {/*        />*/}
            {/*        <Path*/}
            {/*            data-name="Line 15"*/}
            {/*            fill="#fff"*/}
            {/*            strokeLinecap="round"*/}
            {/*            d="M123 758v-7"*/}
            {/*        />*/}
            {/*    </G>*/}
            {/*</Svg>*/}
            <View style={styles.goBack}>
                <TouchableOpacity style={styles.goBackTouch} onPress={e=>{navigation.goBack()}}>
                    <Ionicons name='arrow-back-outline' size={30} color={'white'} />

                </TouchableOpacity>
                <Text style={styles.titleText}>Sign In</Text>
            </View>
            <View style={styles.roundContainer3}></View>
            <View style={styles.roundContainer2}></View>
            <View style={styles.roundContainer}></View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text>Email:</Text>
                    <TextInput
                        placeholder="Type here..."
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <Text>Password:</Text>
                    <TextInput
                        placeholder="Type here..."
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                    {/*    onPress={handleSwitch}*/}
                    {/*    style={[styles.button, styles.buttonOutline]}*/}
                    {/*>*/}
                    {/*    <Text style={styles.buttonOutlineText}>Register</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor:'white',
        overflow:'hidden'
    },
    titleText:{
        fontSize:35,
        color:'white',
        alignItems: 'center',
        justifyContent:'center',
    },
    goBackTouch:{
        padding:25,
        alignItems: 'center',
        justifyContent:'center',

    },
    goBack:{
        position:"absolute",
        backgroundColor:'#0782F9',
        width:300,
        padding:15,
        height:300,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius:500,
        top:-120,
        left:-80,
        color:'white',
    },
    roundContainer:{
        backgroundColor:'#2d4d68',
        height:425,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer2:{
        backgroundColor:'rgba(45,77,104,0.12)',
        height:500,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer3:{
        backgroundColor:'rgba(45,77,104,0.04)',
        height:600,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    formContainer:{
        backgroundColor:'#2d4d68',
        width:'100%',
        alignItems: 'center',
        padding:22,
        paddingBottom:100

    },
    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})