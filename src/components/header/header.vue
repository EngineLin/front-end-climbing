<template>
  <b-container fluid class="bg-warning header pt-2 pb-2">
    <b-row>
      <b-col class="col-md-3">
        <img src="./../../images/logo.png" alt="Logo image" @click="clickLogo($event)">
      </b-col>
      <b-col class="col-md-7 d-none d-md-flex" style="display:flex;align-items:center">
        <b-row style="width: 100%;display:flex;justify-content:space-around">
          <router-link to="/overview" class="btn btn-light btn-lg">Overview</router-link>
          <router-link to="/checklist" class="btn btn-light btn-lg">Project</router-link>
          <router-link to="/manual" class="btn btn-light btn-lg">Manual</router-link>
          <a href="#" id="logout" class="btn btn-secondary btn-lg" v-if="isLogIn" @click="logOut">Log-out</a>
          <router-link to="/login" id="router-link-login" class="btn btn-light btn-lg" v-else>Log-in</router-link>
        </b-row>
      </b-col>
      <b-col class="col-md-2 d-none d-md-flex flex-center">
        <div id="header-avater">
          <i class="fa fa-user-circle-o" style="font-size: 100px"
            aria-hidden="true" @click="clickVisitorAvater"></i>
        </div>
      </b-col>
    </b-row>
    <div id="header-navbar-btn" class="d-block d-md-none">
      <b-btn class="btn-lg mb-2 mt-2" variant="info" style="width:100%" @click="clickNavbarBtn">
        <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
      </b-btn>
    </div>
    <div id="header-navbar-zoom" v-show="isShowNavbarZoom">
      <div class="d-block d-md-none mt-2">
        <router-link to="/overview" class="btn btn-light btn-lg" style="width:100%">Overview</router-link>
      </div>
      <div class="d-block d-md-none mt-2">
        <router-link to="/checklist" class="btn btn-light btn-lg" style="width:100%">Project</router-link>
      </div>
      <div class="d-block d-md-none mt-2">
        <router-link to="/manual" class="btn btn-light btn-lg" style="width:100%">Manual</router-link>
      </div>
      <div class="d-block d-md-none mt-2" v-if="isLogIn">
        <a href="#" id="logout" class="btn btn-secondary btn-lg" style="width:100%" @click="logOut">Log-out</a>
      </div>
      <div class="d-block d-md-none mt-2" v-else>
        <router-link to="/login" id="router-link-login" class="btn btn-light btn-lg" style="width:100%">Log-in</router-link>
      </div>
    </div>
  </b-container>
</template>

<script>
  import $ from 'jquery'
  import firebase from 'firebase'

  export default {
    data() {
      return {
        translateY: `transform: translateY(10px)`,
        isShowNavbarZoom: false,
      }
    },
    methods: {
      logOut() {
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

      clickVisitorAvater() {
        this.$router.push('login')
      },
      clickLogo(e) {
        e.preventDefault()
        this.$router.push('overview')
      },
      clickNavbarBtn() {
        this.isShowNavbarZoom = !this.isShowNavbarZoom;
      }
    },
    computed: {
      isLogIn() {
        return this.$store.state.loginState
      },
    },
  }

</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }
  img:hover {
    cursor: pointer;
  }

  i:hover {
    cursor: pointer;
  }
</style>
