import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

import firebase from "firebase/app";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0PNsu4KdKyirzwpQHhm53IK7fT0-ubLw",
  authDomain: "vue-firebase-template-51c13.firebaseapp.com",
  databaseURL: "https://vue-firebase-template-51c13.firebaseio.com",
  projectId: "vue-firebase-template-51c13",
  storageBucket: "vue-firebase-template-51c13.appspot.com",
  messagingSenderId: "271586708853",
  appId: "1:271586708853:web:90f8c2f896fd66571ad73c",
  measurementId: "G-F2FWHVSK4S"
});

const db = firebaseApp.firestore();

// Export the database for components to use.
export { db };

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
