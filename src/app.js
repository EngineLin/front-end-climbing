import Vue from 'vue';
import $ from 'jquery';
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue'
import router from './router/router.js';
import store from './store/store.js';
import header from './components/header/header';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 開啟 Vue 的除錯模式
Vue.config.debug = true;
Vue.use(BootstrapVue);

// 初始化 Firebase
const config = {
  apiKey: "AIzaSyD2-heCBavyvZbRwd_6wJpXcGryZ_-l-ws",
  authDomain: "front-end-climbing.firebaseapp.com",
  databaseURL: "https://front-end-climbing.firebaseio.com",
  projectId: "front-end-climbing",
  storageBucket: "front-end-climbing.appspot.com",
  messagingSenderId: "733449558443"
};
firebase.initializeApp(config);

// 建立 Vue 根目錄實例
const mv = new Vue({
  el: '#app',
  store,
  router,
  components: {
    'header-component': header,
  },
})

const uploadData = setTimeout(function() {
  if (!localStorage.fec_id) {
    return;
  }
  
  mv.$store.dispatch('saveData');
}, 60000)