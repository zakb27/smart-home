import React,{useEffect,useState} from 'react';
import { View, Text, Image, ScrollView, TextInput,SafeAreaView } from 'react-native';
import {auth, db} from '../../firebase'
import { collection, getDocs,setDoc,doc,Timestamp,addDoc } from "firebase/firestore";

const Settings = ()=>{
    useEffect(() => {
        // const current = async()=>{
        //     const current = auth.currentUser?.email
        //     const docRef = collection(db, "users", current,"devices");
        //     const docSnap = await getDocs(docRef);
        //
        //     docSnap.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // }
        //
        // current().then(e=>changeItem('carriedout'))

        const current = async()=>{

        }

        current().then(e=>console.log('sopmethingout'))

    }, []);

    return(
        <SafeAreaView>
            <Text>
                This is the settings page
                say hi to
            </Text>

        </SafeAreaView>


    )
}

export default Settings;