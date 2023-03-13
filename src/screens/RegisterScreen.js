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
import {LinearGradient} from "expo-linear-gradient";
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
            <LinearGradient colors={['#CDF4F0', '#C4CBFD', '#8DA0E2']} style={{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
            }}></LinearGradient>
            <TouchableOpacity style={styles.imageContainer} onPress={handleImageChange}>
                {image ? <ImageBackground resizeMode="cover" source={{uri:image}} style={styles.image} /> : <ImageBackground resizeMode="cover" source={placeholder} style={styles.image} />}
            </TouchableOpacity>

            <View style={styles.goBack}>
                <TouchableOpacity style={styles.goBackTouch} onPress={e=>{navigation.goBack()}}>
                    <Ionicons name='arrow-back-outline' size={40} color={'#8DA0E2'} />

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
        overflow:'hidden',

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
        borderColor:'white',
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
        fontWeight: '700',
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
        height:450,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer2:{
        backgroundColor:'rgba(141,160,226,0.35)',
        height:500,
        position:'absolute',
        bottom:0,
        width:'130%',
        borderTopLeftRadius:300,
        borderTopRightRadius:300,
    },
    roundContainer3:{
        backgroundColor:'rgba(141,160,226,0.16)',
        height:550,
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
        backgroundColor: '#BCF1EB',
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
        color: '#8DA0E2',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#b8f5e4',
        fontWeight: '700',
        fontSize: 16,
    },
})
