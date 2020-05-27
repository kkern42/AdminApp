import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyBnB8dZjvXD4Ze8-X7LNspLZC6dIgV5Wzw",
    authDomain: "school-aa57c.firebaseapp.com",
    databaseURL: "https://school-aa57c.firebaseio.com",
    projectId: "school-aa57c",
    storageBucket: "school-aa57c.appspot.com",
    messagingSenderId: "552355200282",
    appId: "1:552355200282:web:116df200afcb10be5980a3"
};
firebase.initializeApp(firebaseConfig);
export default firebase;