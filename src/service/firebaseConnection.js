import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBgVqtzeJLNKcAI253R0K860zUO1n2fNbA",
    authDomain: "financas-app-d0649.firebaseapp.com",
    projectId: "financas-app-d0649",
    storageBucket: "financas-app-d0649.appspot.com",
    messagingSenderId: "799750841105",
    appId: "1:799750841105:web:e10dee961b50f22e38e2b0",
    measurementId: "G-YWRKBPKG36",
    databseURL: 'https://financas-app-d0649-default-rtdb.firebaseio.com/'
  };

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

export default firebase