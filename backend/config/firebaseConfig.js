const { initializeApp } = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const dotenv = require('dotenv')

if (process.env.NODE_ENV != 'production') {
    dotenv.config()
}

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "simple-item-list.firebaseapp.com",
    projectId: "simple-item-list",
    storageBucket: "simple-item-list.appspot.com",
    messagingSenderId: "582634376406",
    appId: "1:582634376406:web:5ca5f5171c51761bb94d77"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

module.exports = { db }