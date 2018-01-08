<template>
  <b-container fluid>
    <b-col class="d-none d-md-block col-md-3" id="aside">
      <navigator-container-component></navigator-container-component>
    </b-col>

    <b-col class="col-md-9 content" id="js-content">
      <div class="showNoData bg-info" v-if="!accountData.projectData">
        <div class="signPoint"><i class="fa fa-hand-o-left" aria-hidden="true"></i> 點擊左方 + 符號按鈕新增你的新專案!</div>
        <p class="signMessage">你沒有任何資料</p>
      </div>

      <checklist-container-component v-else></checklist-container-component>
    </b-col>
    
    <img src="./../images/save.png" id="save-sign" alt="Save">
    <div class="save-icon" @click='saveData'></div>
    <div class="infoBox bg-danger"></div>
  </b-container>
</template>

<script>
import $ from 'jquery'
import navigatorContainer from './navigator-container.vue'
import checklistContainer from './checklist-container.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'navigator-container-component': navigatorContainer,
    'checklist-container-component': checklistContainer,
  },
  data: function() {
    return {

    }
  },
  computed: {
    ...mapGetters([ 'accountData' ])
  },
  methods: {
    saveData: function() {
      this.$store.dispatch('saveData')
    }
  },
  created: function() {
    // 點進 checklist 之後就在第一時間將預設的 accountData 做修改
    this.$store.dispatch('updateAccountData');

    // 綁定 infoBox 跟著滑鼠光標
    $(window).on('mousemove', (e) => {
      let left = e.clientX
      let top = e.clientY
      $('.infoBox').css({ 'left': `${left - 100}px`, 'top': `${top - 80}px`})
      $('.infoBox').fadeOut(300)
    })
  },
}
</script>


<style scoped>
  /* .container {
    align-items: flex-start;
  }

  .showNoData {
    margin: 10vh auto;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: -2px -2px 5px grey;
    width: 60%;
    height: 30vh;
  }

  .signPoint {
    text-align: left;
    font-size: 20px;
    margin: 20px 10px;
  }

  .signMessage {
    text-align: center;
    font-size: 40px;
    margin-top: calc((30vh - 73px) / 2)
  }

  #aside {
    height: 100%;
    width: 100%;
    margin-right: 30px;
  }

  .content {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  #save-sign {
    opacity: 0;
    transform: translateY(20px);
    transition: 0.8s;
    position: fixed;
    right: 5%;
    bottom: calc(5% + 60px);
    width: 50px;
    height: 50px;
  }
  #save-sign.active {
    opacity: 1;
    transform: translateY(-20px);
  }
  .save-icon {
    background-image: url('./../images/save-button.svg');
    position: fixed;
    right: 5%;
    bottom: 5%;
    width: 60px;
    height: 60px;
    color: blue;
    transition: 0.5s;
  }
  .save-icon:hover {
    cursor: pointer;
    transform: translateY(-10px)
  }

  .infoBox {
    display: none;
    position: absolute;
    width: auto;
    height: auto;
    padding: 2px;
    border-radius: 5px;
  } */
</style>

