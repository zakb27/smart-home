import { useNavigation } from '@react-navigation/core'
import React, {useState} from 'react'
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ImageBackground
} from 'react-native'
import uuid from 'react-native-uuid';
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {auth,db} from "../../firebase"
import { getStorage,ref,uploadString,uploadBytes,uploadBytesResumable } from "firebase/storage";
import {collection, getDocs, doc, addDoc, deleteDoc,} from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import placeholder from '../assets/placeholder_main.png'
const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [image, setImage] = useState(null);
    const [imageRef,changeRef] = useState('placeholder')

    const handleDatabase = async() =>{
        const docRef = await doc(db, "users", email);
        const thirdRef = await collection(db,'users',email,'details')
        // const thirdRef = await collection(db,'users',email,'rooms')
        // const fourthRef = await collection(db,'users',email,'saved')
        await addDoc(thirdRef, {
            'firstname':first,
            'lastname':last,
            'imageRef':`images/${imageRef}`,
        });


    }

    const uploadImage = async () => {
        try{
            const thing = image;
            const storage = getStorage();
            const response = await fetch(thing)
            const blobFile = await response.blob()
            const newRef = await fetch(uuid.v4());
            changeRef(newRef)
            const storageRef = ref(storage, `images/${newRef}`);
            uploadBytesResumable(storageRef, blobFile).then((snapshot) => {
            });
        }
        catch(e){
            console.error(e);
        }

    };
    const handleImageChange = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if(result.assets[0]){
            await setImage(result.assets[0].uri);

        }


    }

    const handleSignUp = () => {
        // const auth = getAuth();
        if(first===''||last===''){
            alert('Must submit names')
            return('Must submit first and last name')
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with:', user.email);
                handleDatabase().then(e=>console.log('Database created'))
                uploadImage().then(e=>console.log('image uploaded'))
            })
            .catch(error => alert(error.message))
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <TouchableOpacity style={styles.imageContainer} onPress={handleImageChange}>
                {image ? <ImageBackground resizeMode="cover" source={{uri:image}} style={styles.image} /> : <ImageBackground resizeMode="cover" source={placeholder} style={styles.image} />}
            </TouchableOpacity>

            <View style={styles.goBack}>
                <TouchableOpacity style={styles.goBackTouch} onPress={e=>{navigation.goBack()}}>
                    <Ionicons name='arrow-back-outline' size={30} color={'white'} />

                </TouchableOpacity>
                <Text style={styles.titleText}>Register</Text>
            </View>
            <View style={styles.roundContainer3}></View>
            <View style={styles.roundContainer2}></View>
            <View style={styles.roundContainer}>

            </View>
            <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.introInput}>Email:</Text>
                <TextInput
                    placeholder="Type here..."
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <Text style={styles.introInput}>Password:</Text>
                <TextInput
                    placeholder="Type here..."
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.namesContainer}>
                    <View style={styles.namesMiniContainer}>
                <Text style={styles.introInput}>Firstname:</Text>
                <TextInput
                    placeholder="Type here..."
                    value={first}
                    onChangeText={text => setFirst(text)}
                    style={styles.input}
                />
                    </View>
                    <View style={styles.namesMiniContainer}>
                <Text style={styles.introInput}>Lastname:</Text>
                <TextInput
                    placeholder="Type here..."
                    value={last}
                    onChangeText={text => setLast(text)}
                    style={styles.input}
                />
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor:'white',
        overflow:'hidden'
    },
    namesMiniContainer:{
        width:'49%'
    },
    introInput:{
        color:'white',
        marginLeft:5,
        marginTop:5,
    },
    image:{
        flex:1,
        justifyContent:'center',
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        borderRadius:'100%',
        borderColor:'#0782F9',
        borderWidth:2,
        height:150,
        width:150,
        zIndex:300,
        overflow:'hidden',

    },
    namesContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        textAlign:'center',
        width:'100%',
    },
    titleText:{
        fontSize:35,
        color:'white',
        alignItems: 'center',
        justifyContent:'center',
    },
    goBackTouch:{
        padding:25,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        textAlign:'start',
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
        height:500,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
        alignItems:'center',
    },
    roundContainer2:{
        backgroundColor:'rgba(45,77,104,0.12)',
        height:575,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer3:{
        backgroundColor:'rgba(45,77,104,0.04)',
        height:650,
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