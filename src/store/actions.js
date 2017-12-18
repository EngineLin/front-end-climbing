import $ from 'jquery'
import firebase from 'firebase'

export default {
  updateAccountData: function(context) {
    let value;
    let accountData;
    let tempProject = context.state.accountData.projectData[0];
    if (localStorage.fec_id) {
      console.log('login and set data')
      firebase.database().ref(`accountData/${localStorage.fec_id}`).once('value').then(snapshot => {
        value = snapshot.val();
        if (!value) {
          accountData = {
            "accountName": 'new User',
            "projectData": [context.state.projectBaseData]
          }
        } else {
          accountData = {
            "accountName": value.accountName,
            "projectData": value.projectData || []
          }
        }
        if (tempProject !== context.state.projectBaseData) {
          console.log('add tempProject')
          accountData.projectData.push(tempProject);
        }
        if (context.state.accountData.projectData[0] !== context.state.checklistBaseData) {
          accountData.projectData.push(context.state.accountData.projectData[0]);
        }
        context.commit('updateAccountData', accountData);
      })
    } else {
      console.log('no login')
      context.commit('updateAccountData', false);
    }
  },

  saveData: function(context) {
    if (!context.state.fec_id) {
      alert('沒有登入帳號，您的資料不會保存喔');
      return;
    }
    firebase.database().ref(`accountData/${context.state.fec_id}/`)
    .set(
      context.state.accountData
    )
    
    .then(function() {
      $('#save-sign').addClass('active');
      setTimeout(function() {
        $('#save-sign').removeClass('active');
      }, 2500);
    })
    
    .catch(function() {
      alert('儲存檔案失敗')
    })
    
  },
}