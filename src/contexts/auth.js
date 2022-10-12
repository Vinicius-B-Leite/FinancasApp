import React, { createContext, useEffect, useState } from "react";
import firebase from '../service/firebaseConnection'
import AsyncStorage from "@react-native-async-storage/async-storage";



export const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)


    useEffect(()=>{
        async function loadingStorage(){
            const storage = await AsyncStorage.getItem('_authUser')
            
            if (storage){
                setUser(JSON.parse(storage))
                setLoading(false)
            }
            setLoading(false)
        }

        loadingStorage()
    }, [])

    async function singUp(data){
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then( async (value) => {
            let uid = value.user.uid
            await firebase.database().ref('users').child(uid).set({
                nome: data.username,
                saldo: 0,
            }).then(()=>{
                let newdata = {
                    uid: uid,
                    nome: data.username,
                    email: value.user.email,
                    password:data.password
                }
                setUser(newdata)
                storageUser(newdata)
                setLoadingAuth(false)
            })

        }).catch((error)=>{
            setLoadingAuth(false)
            alert(error)
        })
    }

    async function singIn(data){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(async (value) => {
            let uid = value.user.uid
            await firebase.database().ref('users').child(uid).once('value').then((snapshot) => {
                let newdata = {
                    uid,
                    nome: snapshot.val().nome,
                    email: data.email,
                    password: data.password
                }
                console.log(data)

                setUser(newdata)
                storageUser(newdata)
                setLoadingAuth(false)
            })
        }).catch((error)=>{
            alert(error.code)
            setLoadingAuth(false)
        })
    }

    async function singout(){
        await firebase.auth().signOut()
        await AsyncStorage.clear()
        .then(()=>{
            setUser(null)
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('_authUser', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{
            user,
            singUp,
            singIn,
            singout,
            loadingAuth,
            loading,
            singned: !!user //se null ele fica false se tem coisa dentro ele fica true
        }}>
            {children}
        </AuthContext.Provider>
    );
}