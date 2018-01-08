<template>
  <b-container class="mt-5">
    <h2 class="flex-center m-5">帳號登入</h2>

    <b-row class="flex-center mb-2">
      <b-col sm="2"><label for="email">信箱：</label></b-col>
      <b-col sm="10" class="flex-center">
        <b-form-input id="email" type="email" placeholder="請輸入帳號信箱"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="flex-center mb-2">
      <b-col sm="2"><label for="password">密碼：</label></b-col>
      <b-col sm="10" class="flex-center">
        <b-form-input id="password" type="password" placeholder="請輸入密碼"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="justify-content-end">
      <b-col class="col-6 col-md-2 flex-center">
        <router-link to="/signin"><b-btn variant="info">建立帳號</b-btn></router-link>
      </b-col>
      <b-col class="col-6 col-md-2 flex-center">
        <b-btn variant="primary" @click="sendOut">登入</b-btn>
      </b-col>
    </b-row>
    <b-row class="justify-content-center mt-2">
      <p class="message text-danger"></p>
    </b-row>

  </b-container>
</template>

<script>
  import Router from 'vue-router'
  import firebase from 'firebase'
  import $ from 'jquery'

  export default {
    methods: {
      sendOut: function() {
        let email = $('#email').val();
        let password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(confirmationResult => {
          let payload = {
            loginState: true,
            fec_id: confirmationResult.uid
          };
          this.$store.commit('updateFECId', payload);
          this.$store.dispatch('updateAccountData');
          this.$router.push('checklist')
        })
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          $('.message').text(errorMessage);
        })
      },
    }
  }
</script>

<style scoped>

</style>

