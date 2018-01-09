<template>
  <b-container fluid>
    <b-row>
      <b-col class="d-none d-md-block col-md-3" id="aside">
        <navigator-container-component></navigator-container-component>
      </b-col>

      <b-col class="col-md-9 content" id="js-content">

        <!-- v-if -->
        <div class="showNoData bg-info" v-if="!accountData.projectData">
          <div class="signPoint"><i class="fa fa-hand-o-left" aria-hidden="true"></i> 點擊左方 + 符號按鈕新增你的新專案!</div>
          <p class="signMessage">你沒有任何資料</p>
        </div>

        <!-- v-else -->
        <checklist-container-component v-else></checklist-container-component>
      </b-col>
    </b-row>
    
    <img src="./../images/save.png" id="save-sign" alt="Save">
    <div id="save-icon" @click='saveData'></div>
    <div id='infoBox' class="rounded bg-danger text-dark p-1"></div>
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
  computed: {
    ...mapGetters([ 'accountData' ])
  },
  methods: {
    saveData() {
      this.$store.dispatch('saveData');
    }
  },

  created() {
    // 點進 checklist 之後就在第一時間將預設的 accountData 做修改
    this.$store.dispatch('updateAccountData');

    // 綁定 infoBox 跟著滑鼠光標
    $(window).on('mousemove', e => {
      const left = e.pageX;
      const top = e.pageY;

      $('#infoBox').css({ 'left': `${left}px`, 'top': `${top + 20}px`});
      $('#infoBox').fadeOut(300);
    })
  },
}
</script>

<style scoped>
  #save-icon {
    background-image: url('./../images/save-button.svg');
    position: fixed;
    z-index: 100;
    bottom: 10px;
    right: 10%;
    width: 60px;
    height: 60px;
    color: blue;
    transition: 0.5s;
  }
  #save-icon:hover {
    cursor: pointer;
    transform: translateY(-10px)
  }

  #save-sign {
    position: fixed;
    bottom: 10px;
    right: 5%;
    opacity: 0;
    transition: 2s;
  }
  #save-sign.active {
    opacity: 1;
    transform: translateY(-80px);
  }

  #infoBox {
    display: none;
    position: absolute;
    z-index: 1000;
    width: auto;
    height: auto;
  }
</style>


