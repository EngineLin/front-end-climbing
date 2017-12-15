import Vue from 'vue'
import $ from 'jquery'
import firebase from 'firebase'
import routers from './router/index.js'
import store from './store/index.js'
import header from './components/header/header'

// 開啟 Vue 的除錯模式
Vue.config.debug = true;

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
  router: routers,
  components: {
    'header-component': header,
  },
})

const uploadData = setTimeout(function() {
  if (!localStorage.fec_id) {
    return;
  }
  console.log('setTimeout save')
  mv.$store.dispatch('saveData');
}, 60000)