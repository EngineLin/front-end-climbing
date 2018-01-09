<template>
  <b-container class="mt-5">
    <h2 class="flex-center m-5">建立帳號</h2>

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
        <router-link to="/login"><b-btn variant="primary">已經有帳號</b-btn></router-link>
      </b-col>
      <b-col class="col-6 col-md-2 flex-center">
        <b-btn variant="warning" @click="sendOut">註冊</b-btn>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <p class="message text-danger mt-2"></p>
    </b-row>
    <b-row class="mt-3">
      <img src="./../images/sign-in.png" alt="sign in image">
    </b-row>

  </b-container>
</template>

<script>
  import firebase from 'firebase'
  import $ from 'jquery'

  export default {
    data: function() {
      return {

      }
    },
    methods: {
      sendOut: function() {
        let email = $('#email').val();
        let password = $('#password').val();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( confirmationResult => {
          alert("感謝您註冊帳號")
          this.$router.push('login')
        })
        .catch( error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          $('.message').text(errorMessage)
        })
      },
    }
  }
</script>