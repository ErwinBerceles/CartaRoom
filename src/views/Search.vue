<template>
<div class="search">
    <div id="first">
        <h1 class="heading_one">Reserve a Room</h1>
        <div id="search_text">
            <p class="label_head">where</p>
            <input class="search_input big" type="text" placeholder="Location" v-model="criteria" id="where" @keyup.enter="search">
            <br>
            <div style="display: inline-flex;">
                <p class="label_head">when</p>
                <p style="padding-left: 290px;" class="label_head">how many</p>
            </div>
            <br>
            <input class="search_input small" style="margin-left: 40px; " type="text" placeholder="Date" @keyup.enter="search">
            <input class="search_input small" type="text" placeholder="Time" @keyup.enter="search">
            <input class="search_input small" style="margin-left: 48px; " type="text" placeholder="Guests" @keyup.enter="search">
            <button id="search_button" @click="search">Search</button>
        </div>
    </div>
    <div id="second">
        <div class="row">
            <div class="column1">
    <h4 id="second_heading">What is CartaRoom?</h4>
        <p style="font-size: 20px; font-family: Roboto;">CartaRoom is a convenient online room mangement service that connects local businesses with avaiable space with customers who need a temporary space. </p>
                </div>
            <div class="column2">
        <img src="../assets/banner/Section.jpg">
                </div>
    </div>
        </div>
    <div id="third">
        <WhyCartaRoom></WhyCartaRoom>
        <p></p>
    </div>
    <!--
      <Recommended></Recommended>
   -->
</div>
</template>

<script>
import Recommended from "../components/Recommended";
import HostNavbar from "../components/HostNavbar";
import WhyCartaRoom from "../components/WhyCartaRoom";

export default {
    name: 'search',
    components: {
        HostNavbar,
        Recommended,
        WhyCartaRoom
    },
    data() {
        return {
            criteria: ''
        }
    },
    methods: {
        search: function () {
            if (this.criteria == '') {
               alert('Missing criteria');
            } else {
                this.$router.push({
                    name: 'Results',
                    params: {
                        criteria: this.criteria
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.heading_one {
    font-family: Rajdhani;
    font-style: normal;
    font-weight: 600;
    font-size: 52px;
    line-height: 92px;
    margin-top: 0px;
}

#first {
    background-image: url("../assets/banner/Search.jpg");
    height: 474px;
    background-repeat: no-repeat;
    margin-top: -150px;
    padding-top: 150px;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: center;
}

    #second_heading{
        font-family: Rajdhani;
font-style: normal;
font-weight: 600;
font-size: 45px;
line-height: 68px;

color: #000000;

    }
    
    img{ 

-webkit-clip-path: polygon(25% 0, 100% 0, 100% 100%, 37% 100%);
-moz-clip-path: polygon(25% 0, 100% 0, 100% 100%, 37% 100%);
-o-clip-path: polygon(25% 0, 100% 0, 100% 100%, 37% 100%);
        
clip-path: polygon(25% 0, 100% 0, 100% 100%, 37% 100%);
        height: 450px;
        width: 100%;
        
    }
#second {
    height: 450px;
    
    margin: 20px 50px;
    
}
    
    #third{
        height: 450px;
        background-color: #DAE5E3;
    }

#search_text {
    left: 25%;
    text-align: left;
    margin: 0 auto;
    background: #FFFFFF;
    border: 0.25px solid #828282;
    box-sizing: border-box;
    border-radius: 15px;
    width: 700px;
    height: 200px;
}

.search_input {
    background: #FFFFFF;
    border: 1px solid #828282;
    box-sizing: border-box;
    border-radius: 10px;
    padding-left: 20px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
}

.small {
    height: 37px;
    width: 138px;

}

.big {
    width: 620px;
    height: 37px;
    margin-left: 40px;
}

.label_head {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 28px;
    text-align: left;
    padding-left: 40px;
    margin-bottom: 0px;
}
    .row {
        display: flex;
    }

    .column1 {
        padding-left: 15%;
        width: 25%;
    }.column2 {
        width: 75%;
        margin-left: -15%;
    }

#search_button {
    background: rgba(84, 142, 255, 0.8);
    margin-left: 90px;
    border-radius: 5px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    color: #FFFFFF;
    height: 47px;
}

::placeholder {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}

:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}

::-ms-input-placeholder {
    /* Microsoft Edge */
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    color: #828282;
}
</style>
