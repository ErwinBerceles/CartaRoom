<template>
<div id="app">
    <div id="nav">
        <!-- renders view after logged in[Patron] -->
        <LoginNavbarPatron></LoginNavbarPatron>
    </div>
    
    <div id="patronContent">
        <router-view></router-view>
    </div>
    <v-footer dark height="auto" style="margin-bottom: 0px;">
        <Footer></Footer>
    </v-footer>
</div>
</template>

<script>
import Footer from "./components/Footer";
import firebase from 'firebase';
import db from '@/firebase.js';
import LoginNavbarPatron from "./components/LoginNavbarPatron";

// db.ref('rooms').once('value').then(function(snapshot) {
//   console.log(snapshot.val());
// }).catch((error) => {
//   console.log(error);
// });

var userID;
firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        // console.log(user.uid); //a@a.com = gbEw7s5ic1drxG3vgFWD3DAMb972
        userID = user.uid;
    } else {
        // console.log("No user available");
        userID = "null";
    }
});

export default {
    components: {Footer,LoginNavbarPatron},
    name: 'home',
    methods: {
        logout: function () {
            firebase.auth().signOut().then(() => {
                this.$router.replace('/')
            })
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}


#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
