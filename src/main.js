import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyD3y3GpcmRZ_nZZMrJlXZ_L9XXsFsILo6U",
  authDomain: "jireh3512.firebaseapp.com",
  databaseURL: "https://jireh3512-default-rtdb.firebaseio.com",
  projectId: "jireh3512",
  storageBucket: "jireh3512.appspot.com",
  messagingSenderId: "807870939892",
  appId: "1:807870939892:web:f46e099c4b106bc3bb94a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
   //const uid = user.uid;
   console.log(user)
    if(router.currentRoute.path !== '/') {
      router.push('/')
    }
    //console.log('Usuario logado')
    // ...
  } else {
    // User is signed out
    if(router.currentRoute.path !== '/login'){
       router.push('/login')
    }
    console.log('user is not sign-in')
  }
});









Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
