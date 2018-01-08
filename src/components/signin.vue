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

<style scoped>
  /* .pos-r {
    position: relative;
  }

  .login-from {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h2, label, input {
    width: 100%;
    font-weight: bold;
  }

  label {
    margin: 3px;
  }

  input {
    margin: 10px;
  }

  button {
    margin: 0 5px;
    display: inline-block;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  button:hover {
    cursor: pointer;
  }

  .row-flex-end {
    width: 100%; 
    justify-content: flex-end;
  }

  img {
    position: absolute;
    right: 100px;
  } */
</style>