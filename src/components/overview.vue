<template>
  <b-container fluid>
      <b-row class="banner-1">
        <b-col class="flex-center" style="flex-direction: column;">
          <h2 class="text-light">What is Front-end Climbing？</h2>
          <p class="text-dark">
            參考 Github 上最近特別熱門的 Front-end checklist 製作而成的網頁 APP。<br>
            讓你面對專案使用這分清單時的不方便，有一個便利且可管理的幫手。<br>
            輕鬆建立帳戶與專案，清單提供豐富資訊且全面囊括網頁開發時的所有細節，<br>
            使你的網頁開發細膩度更上一層樓。
          </p>
        </b-col>
        <img src="./../images/forkme.png" class="forkme" alt="fork me banner" @click="linkToGitHub">
      </b-row>

      <b-row class="banner-2 flex-center m-3 mb-5" style="flex-direction: row-reverse">
        <b-col class="flex-center col-12 col-md-6" style="flex-direction: column;">
          <h2>Who is author of this checklist？</h2>
          <p class="text-secondary">
            這份清單的作者是 David Dias，專案發表在他的 <a href='https://github.com/thedaviddias/Front-End-Checklist' target="_blank">GitHub 帳號</a>。<br>
            他的個人帳號 <a href="https://github.com/thedaviddias" target="_blank">thedaviddias</a> 還有許多超棒的專案。目前這一份開發清單在 GitHub 非常火熱。
          </p>
        </b-col>
        <b-col class="flex-center col-12 col-md-6">
          <img class="img-fluid" src="./../images/David-Dias.jpg" alt="David Dias">
        </b-col>
      </b-row>

      <b-row class="banner-3 flex-center m-3">
        <b-col class="flex-center col-12 col-md-6" style="flex-direction: column;">
          <h2>Who made this webapp？</h2>
          <p class="text-secondary">
            小弟是剛進入前端業界的新人 Engine Lin，之前翻譯了 David Dias 的前端開發清單有興趣可以點 <a href="https://github.com/EngineLin/Front-End-Checklist" target="_blank">這個連結</a> 看我的翻譯。<br>
            有鑑於這份列表詳細豐富卻不便於使用，所以開發了一個針對專案方便使用與控管的應用網頁。<br>
            另一方面，也是累積第三方框架的使用經驗。<br>
            該應用使用了 Vue.js、Vue-cli + Webpack、Vue-router、Vuex 以及 Firebase 的相關技術。
          </p>
        </b-col>
        <b-col class="flex-center col-12 col-md-6">
          <img src="./../images/Engine-Lin.jpg" alt="Engine Lin">
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
  import $ from 'jquery'

  export default {
    data() {
      return {
        hasShowBanner2: false,
        hasShowBanner3: false,
      }
    },

    methods: {
      linkToGitHub() {
        window.location.href = 'https://github.com/EngineLin/front-end-climbing';
      }
    },

    mounted() {
      window.addEventListener('scroll', () => {
        let windowScrollY = window.scrollY;
        let windowInnerHeight = window.innerHeight;
        let banner2Top = document.querySelector('.banner-2').offsetTop;
        let banner3Top = document.querySelector('.banner-3').offsetTop;

        if (banner2Top <= windowInnerHeight + windowScrollY / 2 && !this.hasShowBanner2) {
          this.hasShowBanner2 = true;
          $('.banner-2').css('transform', 'translateY(0)');
          $('.banner-2').css('opacity', '1');

        } else if (banner3Top <= windowInnerHeight + windowScrollY && !this.hasShowBanner3) {
          this.hasShowBanner3 = true;
          $('.banner-3').css('transform', 'translateY(0)')
          $('.banner-3').css('opacity', '1');
        }

        if (this.hasShowBanner2 && this.hasShowBanner3) {
          window.removeEventListener('scroll', () => {
            console.log('scroll remove')
          });
        }
      })
    },
  }
</script>

<style scoped>
  img {
    max-width: 20vw;
    min-width: 200px;
  }

  .banner-1 {
    background-image: url('./../images/overview-banner-1.jpg');
    background-size: cover;
    background-position-y: center;
    height: calc(100vh - 100px);
  }

  .banner-2 {
    transition: 1.5s;
    transform: translateY(20px);
    opacity: 0;
  }

  .banner-3 {
    transition: 1.5s;
    transform: translateY(20px);
    opacity: 0;
  }

  .forkme {
    max-width: 20vw;
    position: absolute;
    right: 0;
  }
  .forkme:hover {
    cursor: pointer;
  }

</style>