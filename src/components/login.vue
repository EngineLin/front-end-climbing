<template>
  <div class="container">
    <div class="login-from">
      <h2>帳號登入</h2>
      <label for="email">信箱</label>
      <input type="text" id="email" name="email" placeholder="請輸入帳號信箱">
      <label for="password">密碼</label>
      <input type="password" id="password" name="password" placeholder="請輸入密碼" @keyup.enter="sendOut">
      <div class="row row-flex-end">
        <router-link to="/signin"><button class="bg-info">建立帳號</button></router-link>
        <button class="bg-primary" @click="sendOut">登入</button>
      </div>
      <p class="message text-danger"></p>
    </div>
  </div>
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
</style>

