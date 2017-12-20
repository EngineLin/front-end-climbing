import $ from 'jquery'
import sortable from 'sortablejs'
import projectBaseData from './modules/project-base-data.json'

export default {
  toggleFinished: function(state, payload) {
    state.accountData.projectData[state.projectNum].listData[payload.index].finish.isFinished = payload.value
    state.accountData.projectData[state.projectNum].listData[payload.index].finish.finishedDate = payload.date
  },
  
  updateAccountData: function(state, payload) {
    // console.log('update accountData')
    state.accountData = payload || { "accountName": "Visitor", "projectData": [projectBaseData] }
    // console.log(state.accountData)
  },

  changeSortable: function(state, payload) {
    state.accountData.projectData[state.projectNum].listData = payload
  },

  addNewProject: function(state) {
    if (!state.loginState) {
      alert('沒有登入帳號無法開啟第二個專案喔!')
      return
    }
    if (!state.accountData.projectData) {
      state.accountData.projectData = []
    }
    state.accountData.projectData.push(JSON.parse(JSON.stringify(state.projectBaseData)))
    state.projectNum = state.accountData.projectData.length - 1
    this.dispatch('saveData')
  },

  deleteProject: function(state, payload) {
    if (!state.fec_id) {
      alert('沒有登入帳號，無法刪除專案喔!')
      return
    }
    state.accountData.projectData.splice(payload, 1)
    state.projectNum = 0
    this.dispatch('saveData')
  },

  changeProject: function(state, payload) {
    state.projectNum = payload
  },

  updateFECId: function(state, payload) {
    // console.log('set localstorage')
    state.loginState = payload.loginState
    state.fec_id = payload.fec_id
    localStorage.fec_id = payload.fec_id
  },

  updateProjectName: function(state, payload) {
    // console.log('update project name')
    state.accountData.projectData[state.projectNum].projectName = payload
  },

  addNote: function(state, payload) {
    // console.log('add note')
    let tempItem = state.accountData.projectData[state.projectNum].listData[payload.index]
    tempItem.note = payload.value
    state.accountData.projectData[state.projectNum].listData.splice(payload.index,1 , tempItem)
  },

  deleteNoteBox: function(state, payload) {
    // console.log(`add delete`)
    let tempNote = state.accountData.projectData[state.projectNum].listData[payload]
    tempItem.note = ''
    state.accountData.projectData[state.projectNum].listData.splice(payload,1 , tempItem)
  },

  deleteItem: function(state, payload) {
    state.accountData.projectData[state.projectNum].listData.splice(payload, 1)
  },

  // deleteExampleBox: function(state, payload) {
  //   state.accountData.projectData[state.projectNum].listData.
  // },

  // deleteLinkBox: function(state, payload) {
  //   state
  // },
}