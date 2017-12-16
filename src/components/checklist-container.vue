<template>
  <div>
    <div class="row">
      <input class="project-name bg-primary" maxlength="30" :value="projectName" @keyup="updateProjectName"></input>
      <!-- 搜尋覽 -->
      <!-- <input type="text" class="search-bar js-search-bar" v-model="userSeach" placeholder="項目查詢"> -->
    </div>
    <draggable class="checklist-body" v-model='myList' 
               :options="{ el:'.checklist-body',
                           animation: 150,
                           handle: '.js-drag-bar',
                           scroll: true,
                           scrollSensitivity: 60,
                           scrollSpeed: 15 }">

      <!-- // 利用 v-for 遍歷accountData中指定的專案代碼 -->
      <checklist-card-component class="checklist-item" v-for="(item, index) in listData" 
        :item="item" :id="item.id" :index="index"></checklist-card-component>
    </draggable>
  </div>
</template>

<script>
  import $ from 'jquery'
  import draggable from 'vuedraggable'
  import { mapGetters } from 'vuex'
  import checklistCard from './card/checklist-card.vue'

  export default {
    components: {
      'checklist-card-component': checklistCard,
      draggable,
    },
    data: function() {
      return {
        userSeach: '',
      }
    },
    methods: {
      updateProjectName: function() {
        let value = $('.project-name').val();
        this.$store.commit('updateProjectName', value)
      }
    },
    computed: {
      ...mapGetters([
        'accountData',
        'listData',
        'projectNum'
      ]),
      projectName: {
        get: function() {
          console.log('checklist projectNum changed')
          return this.accountData.projectData[this.projectNum].projectName;
        },
        set: function(){
        }
      },
      myList: {
        get() {
          return this.accountData.projectData[this.projectNum].listData;
        },
        set(value) {
          this.$store.commit('changeSortable', value)
        }
      }
    }
  }
</script>

<style>
  .project-name {
    border-radius: 5px;
    color: #fff;
    width: 90%;
    font-size: 40px;
    margin: 30px auto 10px;
    text-align: center;
    /* box-shadow: inset 2px 0 5px black; */
    /* border: solid 1px gray; */
  }

  .search-bar {
    height: 24px;
    margin: auto 20px auto 0;
  }

  .checklist-title {
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
  }
</style>


