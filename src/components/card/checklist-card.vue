<template>
  <div>

    <!-- 標題顯示的 ItemBox -->
    <div class="item-wrap item-title" v-if="id[0] === 'Title'" :id="[`hash${index}`]">
      <div class="item-title-text">{{ id[1] }}</div>
      <div class="delete-btn delete-btn-of-title"><i class="fa fa-times" aria-hidden="true" @dblclick="deleteItem()" @click="deleteAlert()"></i></div>
      <div class="drag-bar bg-success js-drag-bar drag-bar-full-height" @click="dragBarAlert()"><i class="fa fa-arrows-v" aria-hidden="true"></i></div>
    </div> 

    <!-- 內容顯示的 ItemBox -->
    <div class="item-wrap" v-else :id="[`hash${index}`]">
      <div :class="['check-wrap', 'itemType-' + item.finish.isFinished]">
        <div class="control-zoom">

          <!--  點擊切換 accountData 中當前的 isFinished 狀態 -->
          <input class="checkbox" type="checkbox" :checked='item.finish.isFinished' @click="toggleFinished()">

          <!--  v-show 判斷當前 isFinished 決定是否顯示 -->
          <div class="checked-date" v-show="item.finish.isFinished">{{ item.finish.finishedDate }} 完成</div>
          <div class="delete-btn"><i class="fa fa-times" aria-hidden="true" @dblclick="deleteItem()" @click="deleteAlert()"></i></div>
        </div>
        <div class="title-zoom">
          <div class="check-level">{{checklistBaseData[id[0]][id[1]][id[2]].level}}</div>
          <div class="check-name">{{checklistBaseData[id[0]][id[1]][id[2]].title}}：</div>
        </div>
        <div class="check-content">{{checklistBaseData[id[0]][id[1]][id[2]].description}}</div>
        <div class="detail-btn-box" @click="openDetailBox()">
          <i :class="[`fa`, `fa-angle-double-down`, `detail-btn`, `detail-btn-${this.index}`, hasDetail ? `text-primary` : '']" aria-hidden="true"></i>
        </div>
        <i class="fa fa-thumbs-o-up finish-sign" aria-hidden="true" v-show='item.finish.isFinished'></i>
      </div>
      <div class="drag-bar bg-success js-drag-bar" @click="dragBarAlert()"><i class="fa fa-arrows-v" aria-hidden="true"></i></div>
    </div>

    <!-- 新增筆記按鈕 -->
    <div class="add-note-box"
         :id="[`add-note-box-${index}`]"
         style="display: none;"
         v-if="id[0] !== 'Title' && !item.note"
         @click="addNewNote"
         v-text="`+ 新增筆記`">
    </div>

    <!-- 筆記編輯器 -->
    <div class="add-note-textarea"
         :id="[`add-note-textarea-${index}`]"
         style="display: none"
         v-if="id[0] !== 'Title' && !item.note">
      <textarea cols="20" rows="10" :id="[`add-note-textarea-value-${index}`]"></textarea>
      <i class="fa fa-check" aria-hidden="true" @click="clickYes"></i>
      <i class="fa fa-times" aria-hidden="true" @click="clickNo"></i>
    </div>

    <!-- 顯示筆記的 box -->
    <div class="note-box" 
      :id="[`note-box-${index}`]" 
      style="display: none;"
      v-if="id[0] !== 'Title' && item.note"
      v-html="deleteNoteBoxBtn + item.note">
    </div>

    <!-- 顯示範例的 box -->
    <div class="detail-example-box" 
      :id="[`detail-example-box-${index}`]" 
      style="display: none;" 
      v-html="checklistBaseData[id[0]][id[1]][id[2]].example" 
      v-if="id[0] !== 'Title' && checklistBaseData[id[0]][id[1]][id[2]].example">
    </div>
    
    <!-- 顯示連結的 box -->
    <div class="detail-link-box" 
      :id="[`detail-link-box-${index}`]" 
      style="display: none;" 
      v-html="checklistBaseData[id[0]][id[1]][id[2]].link" 
      v-if="id[0] !== 'Title' && checklistBaseData[id[0]][id[1]][id[2]].link">
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'

  export default {
    props:['item', "id", 'index'],
    data: function() {
      return {
        // deleteDetailExampleBoxBtn: `<div class="delete-btn"><i class="fa fa-times delete-detail-example-box-${this.index}" aria-hidden="true"></i></div>`,
        // deleteDetailLinkBoxBtn: `<div class="delete-btn"><i class="fa fa-times delete-detail-link-box-${this.index}" aria-hidden="true"></i></div>`,
        deleteNoteBoxBtn: `<div class="delete-btn"><i class="fa fa-times delete-note-box-${this.index}" aria-hidden="true"></i></div>`,
        isAddNote: false,
        hasAddTextarea : false,
        hasAddBox: this.item.note ? false : true,
        deg: '0deg',
      }
    },
    computed: {
      ...mapGetters(['checklistBaseData']),
      note: function() {
        return this.item.note
      },
      hasDetail: function() {
        // 判斷有詳細資料(包括私人筆記)才為箭頭加上顏色
        return (this.item.note || this.checklistBaseData[this.id[0]][this.id[1]][this.id[2]].example || this.checklistBaseData[this.id[0]][this.id[1]][this.id[2]].link)
        ? true
        : false
      }
    },
    methods: {
      // 切換當前點擊 item 的完成狀態，同時改變 accountData 內的資料
      toggleFinished: function() {
        const finishedDate = new Date()

        //整理日期格式
        const date = `
          ${finishedDate.getFullYear()}
          /${finishedDate.getMonth() + 1 < 10 ? '0' + finishedDate.getMonth() : finishedDate.getMonth()}
          /${finishedDate.getDate() < 10 ? '0' + finishedDate.getDate() : finishedDate.getDate()}
          -${finishedDate.getHours() < 10 ? '0' + finishedDate.getHours() : finishedDate.getHours()}
          :${finishedDate.getMinutes()}
        `

        const value = this.item.finish.isFinished ? false : true
        this.$store.commit('toggleFinished', { index: this.index, value: value, date: date })
      },

      addNewNote: function() {
        $(`#add-note-textarea-${this.index}`).slideDown('slow');
        $(`#add-note-box-${this.index}`).slideUp('slow');
        this.hasAddTextarea = true;
        this.hasAddBox = false;
      },

      clickYes: function() {
        let value = $(`#add-note-textarea-value-${this.index}`).val();
        value = value.replace(/\n/g,"<br />");
        let payload = { index: this.index, value: value };
        this.$store.commit('addNote', payload);
        this.isAddNote = true;
        this.hasAddTextarea = false;
        this.hasAddBox = false;
      },

      clickNo: function() {
        $(`#add-note-textarea-${this.index}`).slideUp('slow');
        $(`#add-note-box-${this.index}`).slideDown('slow');
        $(`#add-note-textarea-value-${this.index}`).val('');
        this.hasAddTextarea = false;
        this.hasAddBox = true;
      },

      deleteAlert: function(e) {
        $('.infoBox').text('雙擊以左鍵以刪除資料。')
        $('.infoBox').fadeIn(300)
      },

      deleteItem: function() {
        this.$store.commit('deleteItem', this.index)
      },

      openDetailBox: function() {
        this.deg = this.deg === '0deg' ? '180deg' : '0deg';
        $(`.detail-btn-${this.index}`).css({'-webkit-transform' : `rotate(${this.deg})`,
                                            '-moz-transform' : `rotate(${this.deg})`,
                                            '-ms-transform' : `rotate(${this.deg})`,
                                            'transform' : `rotate(${this.deg})`,
                                            'transition': `0.5s` });
        if (this.hasAddBox) {
          $(`#add-note-box-${this.index}`).slideToggle("slow");
        }
        if (this.hasAddTextarea) {
          $(`#add-note-textarea-${this.index}`).slideToggle("slow");
        }
        $(`#note-box-${this.index}`).slideToggle("slow");
        $(`#detail-example-box-${this.index}`).slideToggle("slow");
        $(`#detail-link-box-${this.index}`).slideToggle("slow");
      },

      dragBarAlert: function() {
        $('.infoBox').text('按住滑鼠左鍵拖動項目。')
        $('.infoBox').fadeIn(300)
        console.log(this.item.finish.isFinished)
      }
    },
    updated: function() {
      if (this.isAddNote) {
        $(`#note-box-${this.index}`).slideToggle("slow");
      }
    },
    mounted: function() {
      $(`.delete-note-box-${this.index}`).click(() => {
        console.log(this)
        // this.$store.commit('deleteNoteBox', this.index);
      })

      // $(`.delete-detail-example-box-${this.index}`).click(function() {
      //   this.$store.commit('deleteExampleBox', this.index);
      // })

      // $(`.delete-detail-link-box-${this.index}`).click(function() {
      //   this.$store.commit('deleteLinkBox', this.index);
      // })
    }
  }
</script>

<style scoped>
  .item-wrap {
    position: relative;
    margin: 10px 0 10px 0;
    display: flex;
    border: solid 1px black;
    border-radius: 5px;
    box-shadow: 2px 2px 5px gray;
  }

  .item-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    height: 5vh;
    margin: 10px auto;
    width: 80%;
  }

  .item-title-text {
    margin: 0 auto;
  }

  .check-wrap {
    width: auto;
    flex-grow: 1;
    padding: 5px;
  }

  .itemType-true {
    background-color: rgba(6, 167, 195, 0.3);
    transition: 0.5s; 
  }

  .control-zoom {
    display: flex;
    justify-content: space-between;
  }

  .checkbox {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
  .checkbox:hover {
    cursor: pointer;
  }

  .checked-date {
    height: 20px;
    width: auto;
    margin-right: auto;
    background-color: yellow;
    line-height: 20px;
  }

  .delete-btn {
    height: 20px;
    width: 20px;
    font-size: 20px;
    line-height: 20px;
    color: red;
    margin: 0 10px 0 auto;
  }
  .delete-btn-of-title{
    margin: 0 10px 0 0 !important;
  }
  .delete-btn:hover {
    cursor: pointer;
  }

  .title-zoom {
    display: flex;
  }

  .check-level {
    margin: 0 20px;
    color: red;
  }

  .check-name {
    font-weight: bold;
  }

  .check-content {
    padding: 30px;
    text-align: center;
  }

  .detail-btn-box {
    text-align: center;
  }
  .detail-btn:hover {
    cursor: pointer;
  }
  .fa-times:hover {
    font-weight: bold;
  }

  .drag-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    min-width: 20px;
    max-width: 20px;
    flex-grow: 0;
    font-size: 25px;
  }
  .drag-bar:hover {
    cursor: pointer;
  }

  .drag-bar-full-height {
    height: 100%;
  }

  .add-note-box {
    box-sizing: border-box;
    height: 3vh;
    width: 30%;
    border: solid 1px black;
    border-radius: 5px;
    margin: 0 auto 5px;
    padding: 3px 0;
    text-align: center;
    font-size: 20px;
    box-shadow: 2px 2px 5px grey;
  }
  .add-note-box:hover {
    cursor: pointer;
    border: 2px solid red;
  }

  .add-note-textarea {
    position: relative;
    border: solid 1px black;
    margin: 0 10px 5px;
    text-align: center;
    box-shadow: 2px 2px 5px gray;
  }

  .add-note-textarea textarea {
    width: 100%;
    height: 100%; 
    padding: 0;
    margin: 0;
    border-width: 0;
    font-size: 24px;
  }
  .add-note-textarea textarea:focus {
    outline: none !important;
  }

  .add-note-textarea .fa-check {
    position: absolute;
    font-size: 24px;
    color: green;
    right: 20%;
    bottom: 0;
  }
  .add-note-textarea .fa-check:hover {
    cursor: pointer;
    font-weight: bold;
  }

  .add-note-textarea .fa-times {
    position: absolute;
    font-size: 24px;
    color: red;
    right: 10%;
    bottom: 0;
  }
  .add-note-textarea .fa-times:hover {
    cursor: pointer;
    font-weight: bold;
  }

  .note-box {
    border: solid 1px black;
    margin: 0 10px 5px;
    padding: 3px 0;
    text-align: center;
    box-shadow: 2px 2px 5px gray;
    font-size: 20px;
  }

  .detail-example-box {
    border: solid 1px black;
    background-color: rgba(100, 100 ,100 , .1);
    margin: 0 10px 5px;
    padding: 3px 0;
    text-align: center;
    color: gray;
    box-shadow: 2px 2px 5px gray;
  }

  .detail-link-box {
    border: solid 1px black;
    margin: 0 10px 5px;
    text-align: center;
    box-shadow: 2px 2px 5px gray;
    padding: 1em;
    line-height: 30px;
  }

  .finish-sign {
    position: absolute;
    right: 10%;
    top: 30%;
    font-size: 5vh;
  }
</style>

