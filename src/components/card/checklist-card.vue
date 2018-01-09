<template>
  <b-container fluid>
    <!-- 標題顯示的 ItemBox -->
    <!-- v-if -->
    <b-row class="item-title border border-dark rounded" v-if="id[0] === 'Title'" :id="[`hash${index}`]">
      <b-col class="text-center m-2">{{ id[1] }}</b-col>
      <b-row class="delete-btn delete-btn-of-title text-danger justify-content-end"><i class="fa fa-times" aria-hidden="true" @dblclick="deleteItem()" @click="deleteAlert()"></i></b-row>
      <b-col cols="1" class="flex-center bg-success text-dark js-drag-bar " @click="dragBarAlert()"><i class="fa fa-arrows-v" aria-hidden="true"></i></b-col>
    </b-row> 

    <!-- 內容顯示的 ItemBox -->
    <!-- v-else -->
    <b-row class="border border-dark rounded mb-2" :id="[`hash${index}`]" v-else>
      <b-col :class="['col-10', 'col-sm-11', 'check-wrap', 'itemType-' + item.finish.isFinished]">
        <b-row class="align-items-center">

          <!--  點擊切換 accountData 中當前的 isFinished 狀態 -->
          <input class="checkbox" type="checkbox" :checked='item.finish.isFinished' @click="toggleFinished()">

          <!--  v-show 判斷當前 isFinished 決定是否顯示 -->
          <div class="checked-date bg-warning" v-show="item.finish.isFinished">{{ item.finish.finishedDate }} 完成</div>
          <b-row class="delete-btn text-danger justify-content-end"><i class="fa fa-times" aria-hidden="true" @dblclick="deleteItem()" @click="deleteAlert()"></i></b-row>
        </b-row>

        <b-row>
            <div class="ml-2 mr-3 text-danger">{{checklistBaseData[id[0]][id[1]][id[2]].level}}</div>
            <div>{{checklistBaseData[id[0]][id[1]][id[2]].title}}：</div>
        </b-row>

        <b-row class="justify-content-center align-items-center p-1 mb-2">{{checklistBaseData[id[0]][id[1]][id[2]].description}}</b-row>

        <b-row class="justify-content-center" @click="openDetailBox()">
          <i :class="[`fa`, `fa-angle-double-down`, `detail-btn`, `detail-btn-${this.index}`, hasDetail ? `text-primary` : '']" aria-hidden="true"></i>
        </b-row>
        
        <i class="fa fa-thumbs-o-up finish-sign" aria-hidden="true" v-show='item.finish.isFinished'></i>
      </b-col>
      <b-col class="col-2 col-sm-1 flex-center bg-success text-dark js-drag-bar" @click="dragBarAlert()"><i class="fa fa-arrows-v" aria-hidden="true"></i></b-col>
    </b-row>

    <!-- 新增筆記按鈕 -->
    <b-row class="justify-content-center">
      <b-btn variant="primary" class="add-note-box mb-2"
          :id="[`add-note-box-${index}`]"
          style="display: none;"
          v-if="id[0] !== 'Title' && !item.note"
          @click="addNewNote"
          v-text="`+ 新增筆記`">
      </b-btn>
    </b-row>

    <!-- 筆記編輯器 -->
    <b-row class="add-note-textarea border border-dark rounded mb-2"
         :id="[`add-note-textarea-${index}`]"
         style="display: none"
         v-if="id[0] !== 'Title' && !item.note">
      <textarea cols="20" rows="10" :id="[`add-note-textarea-value-${index}`]" class="col col-10 col-md-11"></textarea>
      <b-col cols="2" md="1" class="justify-content-around align-items-center" style="display:none;display:flex;flex-direction:column;">
        <i class="fa fa-times text-danger" aria-hidden="true" @click="clickNo"></i>
        <i class="fa fa-check text-success" aria-hidden="true" @click="clickYes"></i>
      </b-col>
    </b-row>

    <!-- 顯示筆記的 box -->
    <b-row class="note-box border border-dark rounded justify-content-around mr-auto ml-auto mb-2" 
      :id="[`note-box-${index}`]" 
      style="display: none;"
      v-if="id[0] !== 'Title' && item.note"
      v-html="item.note + deleteNoteBoxBtn">
    </b-row>

    <!-- 顯示範例的 box -->
    <b-row class="detail-example-box border border-dark rounded justify-content-center align-items-center mr-auto pt-1 ml-auto mb-2" 
      :id="[`detail-example-box-${index}`]" 
      style="display: none; background-color: rgba(192, 192, 192 ,.5)" 
      v-html="checklistBaseData[id[0]][id[1]][id[2]].example" 
      v-if="id[0] !== 'Title' && checklistBaseData[id[0]][id[1]][id[2]].example">
    </b-row>
    
    <!-- 顯示連結的 box -->
    <b-col class="detail-link-box border border-dark rounded text-center p-1 mr-auto ml-auto mb-2" 
      :id="[`detail-link-box-${index}`]" 
      style="display: none;" 
      v-html="checklistBaseData[id[0]][id[1]][id[2]].link" 
      v-if="id[0] !== 'Title' && checklistBaseData[id[0]][id[1]][id[2]].link">
    </b-col>

  </b-container>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'

  export default {
    props:['item', "id", 'index'],
    data() {
      return {
        // deleteDetailExampleBoxBtn: `<div class="delete-btn"><i class="fa fa-times delete-detail-example-box-${this.index}" aria-hidden="true"></i></div>`,
        // deleteDetailLinkBoxBtn: `<div class="delete-btn"><i class="fa fa-times delete-detail-link-box-${this.index}" aria-hidden="true"></i></div>`,
        deleteNoteBoxBtn: `<div class="delete-btn"><i class="fa fa-times text-danger delete-note-box-${this.index}" aria-hidden="true"></i></div>`,
        isAddNote: false,
        hasAddTextarea : false,
        hasAddBox: this.item.note ? false : true,
        deg: '0deg',
      }
    },
    computed: {
      ...mapGetters(['checklistBaseData']),
      note() {
        return this.item.note
      },
      hasDetail() {
        // 判斷有詳細資料(包括私人筆記)才為箭頭加上顏色
        return (this.item.note || this.checklistBaseData[this.id[0]][this.id[1]][this.id[2]].example || this.checklistBaseData[this.id[0]][this.id[1]][this.id[2]].link)
        ? true
        : false
      }
    },
    methods: {
      // 切換當前點擊 item 的完成狀態，同時改變 accountData 內的資料
      toggleFinished() {
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

      addNewNote() {
        $(`#add-note-textarea-${this.index}`).slideDown('slow');
        $(`#add-note-box-${this.index}`).slideUp('slow');
        this.hasAddTextarea = true;
        this.hasAddBox = false;
      },

      clickYes() {
        let value = $(`#add-note-textarea-value-${this.index}`).val();
        value = value.replace(/\n/g,"<br />");
        let payload = { index: this.index, value: value };
        this.$store.commit('addNote', payload);
        this.isAddNote = true;
        this.hasAddTextarea = false;
        this.hasAddBox = false;
      },

      clickNo() {
        $(`#add-note-textarea-${this.index}`).slideUp('slow');
        $(`#add-note-box-${this.index}`).slideDown('slow');
        $(`#add-note-textarea-value-${this.index}`).val('');
        this.hasAddTextarea = false;
        this.hasAddBox = true;
      },

      deleteAlert(e) {
        $('#infoBox').text('雙擊以左鍵以刪除資料。')
        $('#infoBox').fadeIn(300)
      },

      deleteItem() {
        this.$store.commit('deleteItem', this.index)
      },

      openDetailBox() {
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

      dragBarAlert() {
        $('#infoBox').text('按住滑鼠左鍵拖動項目。')
        $('#infoBox').fadeIn(300)
      }
    },
    updated() {
      if (this.isAddNote) {
        $(`#note-box-${this.index}`).slideToggle("slow");
      }
    },
    mounted() {
      //#TODO Delete Note function
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
  .item-title {
    margin: 10px auto;
    width: 80%;
  }

  .checkbox {
    height: 20px;
    width: 20px;
    margin: 5px 10px 0 15px;
  }
  .checkbox:hover {
    cursor: pointer;
  }

  .checked-date {
    height: 20px;
    line-height: 20px;
  }

  .itemType-true {
    background-color: rgba(6, 167, 195, 0.3);
    transition: 0.5s; 
  }

  .delete-btn {
    height: 20px;
    width: 20px;
    font-size: 20px;
    line-height: 20px;
    margin: 0 10px 0 auto;
  }
  .delete-btn-of-title{
    margin: 0 10px 0 0 !important;
  }
  .delete-btn:hover {
    cursor: pointer;
  }

  .finish-sign {
    position: absolute;
    right: 5px;
    bottom: 0;
    font-size: 5vh;
  }

  .add-note-box:hover {
    cursor: pointer;
  }

  .add-note-textarea textarea:focus {
    outline: none !important;
  }

  .add-note-textarea .fa-check {
    font-size: 3rem;
  }
  .add-note-textarea .fa-check:hover {
    cursor: pointer;
    font-weight: bold;
  }

  .add-note-textarea .fa-times {
    font-size: 3rem;
  }
  .add-note-textarea .fa-times:hover {
    cursor: pointer;
    font-weight: bold;
  }

  .fa-angle-double-down:hover {
    cursor: pointer;
  }

  .fa-times:hover {
    font-weight: bold;
  }
</style>
