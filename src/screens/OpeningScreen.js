import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput,Text, TouchableOpacity, View } from 'react-native'

import Svg, {
    G,
    Path,
    Rect,
} from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
const OpeningScreen = ({navigation}) => {


    const handleSwitch = () =>{
        navigation.navigate("Register")
    }

    const handleLogin = () => {
        // const auth = getAuth();
        navigation.navigate("Login")
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
            <View style={styles.svgContainer}>
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
                <Text style={[styles.titleText]}>Homerino</Text>
                <Text style={styles.subTitle}>A smart solution</Text>
            </View>
            <View style={styles.roundContainer3}></View>
            <View style={styles.roundContainer2}></View>
            <View style={styles.roundContainer}></View>
            <View style={styles.formContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSwitch}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
export default OpeningScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor:'white',
    },
    svgContainer:{
      flex:1,
      alignItems:'center',
        justifyContent:'center',
        marginTop:-200,
    },
    titleText:{
        fontSize:50,
        color:'#8da0e2',
        alignItems: 'center',
        justifyContent:'center',
        fontFamily:"Kailasa-Bold",
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
        backgroundColor:'#8da0e2',
        height:300,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer2:{
        backgroundColor:'rgba(141,160,226,0.35)',
        height:350,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer3:{
        backgroundColor:'rgba(141,160,226,0.16)',
        height:400,
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