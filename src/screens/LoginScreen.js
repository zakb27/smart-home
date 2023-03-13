import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput,Text, TouchableOpacity, View } from 'react-native'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase"
import Ionicons from 'react-native-vector-icons/Ionicons';

import Svg, {
    G,
    Path,
    Rect,
} from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

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
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <View style={styles.goBack}>
                <TouchableOpacity style={styles.goBackTouch} onPress={e=>{navigation.goBack()}}>
                    <Ionicons name='arrow-back-outline' size={40} color={'#8DA0E2'} />

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
    titleText:{
        fontSize:35,
        color:'#8DA0E2',
        alignItems: 'center',
        justifyContent:'center',
        fontWeight:'700',
        marginLeft:5,
    },
    goBackTouch:{
        padding:25,
        alignItems: 'center',

        justifyContent:'center',

    },
    goBack:{
        position:"absolute",
        backgroundColor:'#CDF4F0',
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
        backgroundColor:'#8da0e2',
        height:350,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer2:{
        backgroundColor:'rgba(141,160,226,0.35)',
        height:400,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer3:{
        backgroundColor:'rgba(141,160,226,0.16)',
        height:450,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    formContainer:{
        backgroundColor:'#8da0e2',
        width:'100%',
        alignItems: 'center',
        padding:0,
        paddingBottom:85
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#b8f5e4',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#8da0e2',
        marginTop: 5,
        borderColor: '#b8f5e4',
        borderWidth: 2,
    },
    buttonText: {
        color: '#7590db',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#b8f5e4',
        fontWeight: '700',
        fontSize: 16,
    },
})
