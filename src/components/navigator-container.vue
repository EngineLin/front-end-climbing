<template>
  <div class="navigator-wrap">
    <div class="navigator-project-body">
      <div class="navigator-project-item" :id="[`project-${index}`]" :class="index == projectNum ? 'active' : ''" v-for=" (item, index) in projectData">
        <div class="project-box">
          <a href="#" @click="changeProject(index)"><div>{{ projectData[index].projectName }}</div></a>
          <div class="delete-btn"><i class="fa fa-times" aria-hidden="true" @dblclick="deleteProject" @click="deleteAlert"></i></div>
        </div>
      </div>
      <slot>
        <div class="navigator-project-item">
          <a href="#" @click="addNewProject"><div> + New Project</div></a>
        </div>
      </slot>
    </div>
    <div class="navigator-body" :style="bodyHeight">

      <!-- v-for 遍歷 acountData 中的資料且與 listData 中的 checklistBaseData 交互比對獲得資料 -->
      <div>
        <div :class="[`navigator-item`, item.id[0] === 'Title' ? 'bg-info' : '']" v-for=" (item, index) in listData" @click="slide2Item(index, $event)">
          <a href="#" v-if="item.id[0] === 'Title'">{{ item.id[1] }}</a>
          <a href="#" v-else><div>{{ checklistBaseData[item.id[0]][item.id[1]][item.id[2]].title }}</div></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'checklistBaseData',
        'accountData',
        'projectNum',
        'listData'
      ]),
      projectData: function() {
        // console.log('navigator projectData changed')
        // console.log(this)
        return this.accountData.projectData;
      },
      bodyHeight: function() {
        return `height: ${this.accountData.projectData.length < 3 ? `calc(90vh - 150px)` : `calc(80vh - 160px)`}`
      }
    },
    methods: {
      addNewProject: function() {
        this.$store.commit('addNewProject');
      },

      changeProject: function(index) {
        this.$store.commit('changeProject', index);
      },

      slide2Item: function(index, e) {
        e.preventDefault();
        let scrollTop = $(`#hash${index}`)[0].offsetTop;
        $('#js-content').animate({ scrollTop: `${scrollTop - 10}`}, 500, 'linear');
      },

      deleteAlert: function(e) {
        $('.infoBox').text('雙擊以左鍵以刪除資料。')
        $('.infoBox').fadeIn(300)
      },

      deleteProject: function() {
        this.$store.commit('deleteProject', this.index)
      },
    },
  }
</script>

<style>
  .navigator-wrap {
    background-color:#FFC93C;
    border-radius: 5px 0 0 5px;
    border-right: 1px solid black;
    height: calc(100vh - 150px);
    padding: 15px;
  }

  .navigator-body {
    overflow-y: scroll;
  }

  .navigator-item {
    transition: 0.5s;
    background-color: #FFF5DB;
    padding: 5px;
    margin: 5px 10px;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 rgba(0,0,0,.6);
  }
  .navigator-item:hover {
    cursor: pointer;
    box-shadow: 0 8px 15px 2px rgba(0,0,0,.25);
  }

  .navigator-project-body {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .navigator-project-item{
    box-sizing: border-box;
    font-size: 20px;
    font-weight: bold;
    background-color: #fff;
    width: calc(50% - 10%);
    height: 10vh;
    margin: 5px 5%;
    border-radius: 5px;
    border: 1px solid black;
  }
  .navigator-project-item.active {
    border: 2px solid red;
  }
  .project-box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  a {
    width: 100% ;
    height: 100%;
    color: black;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
  }

  .detail-link-box a {
    color: blue;
  }
  .detail-link-box a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .delete-btn {
    height: 20px;
    width: 20px;
    font-size: 20px;
    line-height: 20px;
    color: red;
    margin: 0 10px 0 auto;
  }
  .delete-btn:hover {
    cursor: pointer;
  }
  .fa-times:hover {
    font-weight: bold;
  }
</style>


