<template>
  <header class="bg-warning">
    <a href="#" @click="clickLogo($event)">
      <img src="./../../images/logo.png" alt="Logo image">
    </a>
    
    <div class="header-navbar">
      <ul class="header-navbar-ul">
        <router-link to="/overview" class="header-navbar-btn">Overview</router-link>
        <router-link to="/checklist" class="header-navbar-btn">Project</router-link>
        <router-link to="/manual" class="header-navbar-btn">Manual</router-link>
        <a href="#" id="logout" class="bg-secondary" v-if="isLogIn" @click="logOut">Log-out</a>
        <router-link to="/login" id="router-link-login" class="header-navbar-btn" v-else>Log-in</router-link>
      </ul>
    </div>
    <div id="header-avater"><i class="fa fa-user-circle-o" aria-hidden="true" @click="clickVisitorAvater"></i></div>
  </header>
</template>

<script>
  import $ from 'jquery'
  import Router from 'vue-router'
  import firebase from 'firebase'

  export default {
    data: function() {
      return {
        translateY: `transform: translateY(10px)`
      }
    },
    methods: {
      logOut: function() {
        firebase.auth().signOut()
        
        .then(() => {
          let payload = { loginState: false, fec_id: '' }
          this.$store.commit('updateFECId', payload)
          this.$store.dispatch('updateAccountData')
          this.$router.push('checklist')
          alert('您已經成功登出')
        })
        
        .catch((error) => {
          alert(`登出出現問題: ${error}`)
        })
      },
      clickVisitorAvater: function() {
        this.$router.push('login')
      },
      clickLogo: function(e) {
        e.preventDefault()
        this.$router.push('overview')
      }
    },
    computed: {
      isLogIn: function() {
        return this.$store.state.loginState
      },
    },
  }

</script>

<style scoped>
  header {
    height: 100px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  a {
    color: black;
    text-decoration: none;
    height: 100px;
    width: auto;
  }

  a img {
    height: 100%;
  }

  .header-title {
    padding: 0 50px;
  }

  .header-navbar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-navbar-ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    padding: 0;
    margin: 0;
  }

  .header-navbar-btn {
    height: 50px;
    width: 20%;
    font-size: 20px;
    border-radius: 10px 10px 0 0;
    transform: translateY(10px);
    background-color: #f1f1f1;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
  }
  .router-link-active {
    background-color: #fff;
    box-shadow: -3px -3px 5px gray;
    z-index: 10;
  }
  .header-navbar-btn:hover {
    cursor: pointer;
  }

  #logout {
    text-align: center;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    width: 20%;
    border-radius: 10px;
  }

  #header-avater {
    height: 100px;
    width: 100px;
    margin: 0 80px;
    font-size: 80px;
    line-height: 100px;
  }
  #header-avater:hover {
    cursor: pointer;
  }
</style>
