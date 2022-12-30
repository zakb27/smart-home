import React from 'react';
import {View, Text, Image, ScrollView, TextInput, SafeAreaView, TouchableOpacity,Button,StyleSheet} from 'react-native';
import {auth} from "../../firebase";
import {signOut} from "firebase/auth";
const Home = ()=>{



    return(
        <SafeAreaView>
            <Text>
                This is the Home page
            </Text>

        </SafeAreaView>


    )
}

export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})