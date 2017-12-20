import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import feachUserData from './modules/feachUserData.js'
import checklistBaseData from './modules/checklist-base-data.json'
import projectBaseData from './modules/project-base-data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 判斷是否登錄
    loginState: !!localStorage.fec_id,
    fec_id: localStorage.fec_id || '',
    projectNum: 0,

    // checklist 基本資料
    checklistBaseData: checklistBaseData,
    projectBaseData: projectBaseData,

    // accountData 為了運行的預設值
    accountData: {
      "accountName": "Visitor",
      "projectData": [projectBaseData]
    }
  },

  getters: {
    checklistBaseData: function(state) {
      // console.log(state.checklistBaseData)
      return state.checklistBaseData
    },

    // 本地初始化 checklist 資料
    accountData : function(state) {
      // console.log('getter accountData')
      return state.accountData;
    },
    projectNum: function(state) {
      // console.log('getter projectNum')
      return state.projectNum
    },
    listData: function(state) {
      console.log('getter listData')
      return state.accountData.projectData[state.projectNum].listData
    }
  },

  mutations,
  actions,
})