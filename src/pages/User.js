import React,{useState} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    SafeAreaView,
    Button,
    StyleSheet,
    TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import {auth} from "../../firebase";
import {signOut,updateEmail,updatePassword} from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const PassChange = ({navigation}) =>{
    const [value,setValue] = useState('');
    const handlePassChange = () =>{
        updatePassword(auth.currentUser,value).then(()=>{
            console.log('Pass updated')
            alert('Done')
            navigation.goBack()
        }).catch((error)=>{
            console.log(error)
            console.log('Error occurred')
        })
    }
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    value={value}
                    onChangeText={text => setValue(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handlePassChange}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </KeyboardAvoidingView>)
}

const EmailChange = ({navigation}) =>{
    const [value,setValue] = useState('');
    const handleEmailChange = () =>{
        updateEmail(auth.currentUser,value).then(()=>{
            console.log('Email updated')
            alert('Done')
            navigation.goBack()
        }).catch((error)=>{
            console.log(error)
            console.log(auth.currentUser)
            console.log('Error occurred')
        })
    }
    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={value}
                onChangeText={text => setValue(text)}
                style={styles.input}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleEmailChange}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Change Email</Text>
            </TouchableOpacity>
        </View>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </KeyboardAvoidingView>)
}

const Display = ({navigation}) =>{

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Sign out successful')
            })
            .catch(error => alert(error.message))
    }



    return(
        <SafeAreaView>
            <Text>
                hello {auth.currentUser?.email}
            </Text>

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
            <Stack.Screen name="Email" component={EmailChange} />
            <Stack.Screen name="Password" component={PassChange} />
        </Stack.Navigator>


    )
}

export {UserMain};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
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