import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/storage'



  var firebaseConfig = {
    apiKey: "AIzaSyB0ljTAaboicLc0pGzBj55DJAnrsy_VREQ",
    authDomain: "smooth-ffe14.firebaseapp.com",
    databaseURL: "https://smooth-ffe14.firebaseio.com",
    projectId: "smooth-ffe14",
    storageBucket: "smooth-ffe14.appspot.com",
    messagingSenderId: "446776677855",
    appId: "1:446776677855:web:e0b6ddbc8dae19b89b206a"
  };


  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  
  const dbb = fb.firestore()

  
  export {fb,dbb}


 