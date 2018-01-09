<template>
  <b-container fluid class="border border-dark rounded navigator-wrap bg-warning">
    <b-row class="justify-content-center align-items-center">
      <b-col class="col-5 bg-light border border-dark rounded m-1 p-1 navigator-project-item" :id="[`project-${index}`]" :class="index == projectNum ? 'active' : ''" v-for=" (item, index) in projectData">
        <div class="project-box">
          <a href="#" @click="changeProject(index)"><div>{{ projectData[index].projectName }}</div></a>
          <div class="delete-btn text-danger"><i class="fa fa-times" aria-hidden="true" @dblclick="deleteProject" @click="deleteAlert"></i></div>
        </div>
      </b-col>
      <slot>
        <b-col class="col-5 bg-secondary border border-primary rounded m-1 navigator-project-item">
          <a href="#" @click="addNewProject"><div class="text-light text-center">New Project<br>+</div></a>
        </b-col>
      </slot>
    </b-row>

    <b-row>

      <!-- v-for 遍歷 acountData 中的資料且與 listData 中的 checklistBaseData 交互比對獲得資料 -->
      <b-col style="padding-left:0;padding-right:0;margin: 0 15px;">
        <div :class="['mt-1', 'mb-1','navigator-item', item.id[0] === 'Title' ? 'bg-info' : 'bg-light']" v-for=" (item, index) in listData" @click="slide2Item(index, $event)">
          <a href="#" v-if="item.id[0] === 'Title'">{{ item.id[1] }}</a>
          <a href="#" v-else><div>{{ checklistBaseData[item.id[0]][item.id[1]][item.id[2]].title }}</div></a>
        </div>
      </b-col>
    </b-row>
  </b-container>
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
      projectData() {
        return this.accountData.projectData;
      },
    },
    methods: {
      addNewProject() {
        this.$store.commit('addNewProject');
      },

      changeProject(index) {
        this.$store.commit('changeProject', index);
      },

      slide2Item(index, e) {
        e.preventDefault();
        let scrollTop = $(`#hash${index}`)[0].offsetTop;
        window.scrollTo(0, scrollTop);
        // #TOFIX slide function
        // $('body').animate({ scrollY: `${scrollTop - 10}`}, 500, 'linear');
      },

      deleteAlert(e) {
        $('#infoBox').text('雙擊以左鍵以刪除資料。');
        $('#infoBox').fadeIn(300);
      },

      deleteProject() {
        this.$store.commit('deleteProject', this.index)
      },
    },
  }
</script>

<style scoped>
  .navigator-wrap {
    position: fixed;
    top: 130px;
    width: 23vw;
    height: calc(100vh - 180px);
    overflow-y: scroll;
    box-shadow: 3px 3px 10px gray;
  }

  .navigator-project-item{
    box-sizing: border-box;
    font-size: 14px;
    font-weight: bold;
    background-color: #fff;
  }
  .navigator-project-item.active {
    border: 2px solid red;
  }

  .navigator-item a {
    width: 100% ;
    height: 100%;
    color: black;
    text-decoration: none;
  }
  a:hover {
    cursor: pointer;
    text-decoration: none;
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

  .delete-btn {
    position: absolute;
    top: 0;
    right:5px;
  }
  .delete-btn:hover {
    cursor: pointer;
  }

  .fa-times:hover {
    font-weight: bold;
  }
</style>


