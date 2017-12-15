<template>
  <div class="container js-container">
    <img src="./../images/forkme.png" class="forkme" alt="fork me" @click="linkToGitHub">
    <div class="info-column">

      <div class="row row-container banner-1">
        <div id="info-project">
          <div class="row row-fd-column">
            <h2 class="text-light">What is Front-end Climbing？</h2>
            <p class="text-dark">
              參考 Github 上最近特別熱門的 Front-end checklist 製作而成的網頁 APP。<br>
              讓你面對專案使用這分清單時的不方便，有一個便利且可管理的幫手。<br>
              輕鬆建立帳戶與專案，清單提供豐富資訊且全面囊括網頁開發時的所有細節，<br>
              使你的網頁開發細膩度更上一層樓。
            </p>
          </div>
        </div>
      </div>

      <div class="row row-container banner-2">
        <div id="info-origin-author">
          <img src="./../images/David-Dias.jpg" alt="David Dias">
          <div class="row row-fd-column">
            <h2>Who is author of this checklist？</h2>
            <p class="text-secondary">
              這份清單的作者是 David Dias，專案發表在他的 <a href='https://github.com/thedaviddias/Front-End-Checklist'>GitHub 帳號</a>。<br>
              他的個人帳號 <a href="https://github.com/thedaviddias">thedaviddias</a> 還有許多超棒的專案。目前這一份開發清單在 GitHub 非常火熱。
            </p>
          </div>
        </div>
      </div>

      <div class="row row-container banner-3">
        <div id="info-webapp-author">
          <div class="row row-fd-column">
            <h2>Who made this webapp？</h2>
            <p class="text-secondary">
              小弟是剛進入前端業界的新人 Engine Lin，之前翻譯了 David Dias 的前端開發清單有興趣可以點 <a href="https://github.com/EngineLin/Front-End-Checklist">這個連結</a> 看我的翻譯。<br>
              有鑑於這份列表詳細豐富卻不便於使用，所以開發了一個針對專案方便使用與控管的應用網頁。<br>
              另一方面，也是累積第三方框架的使用經驗。<br>
              該應用使用了 Vue.js、Vue-cli + Webpack、Vue-router、Vuex 以及 Firebase 的相關技術。
            </p>
          </div>
          <img src="./../images/Engine-Lin.jpg" alt="Engine Lin">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    methods: {
      linkToGitHub: function() {
        window.location.href = 'https://github.com/twbs/bootstrap/blob/v4-dev/dist/css/bootstrap.css';
      }
    },
    data: function() {
      return {
        hasShowBanner2: false,
        hasShowBanner3: false,
      }
    },
    mounted: function() {
      let hasShowBanner2 = this.hasShowBanner2;
      let hasShowBanner3 = this.hasShowBanner3;
      $('.js-container').scroll(function() {
        if ($('.banner-2').offset().top <= this.clientHeight * 0.8 && !hasShowBanner2) {
          hasShowBanner2 = true;
          $('.banner-2').css('transform', 'translateY(0px)');
          $('.banner-2').css('opacity', '1');
        } else if ($('.banner-3').offset().top <= this.clientHeight && !hasShowBanner3) {
          hasShowBanner3 = true;
          $('.banner-3').css('transform', 'translateY(0px)')
          $('.banner-3').css('opacity', '1');
        }
      })
    },
  }
</script>

<style scoped>
  .container {
    overflow-y: scroll;
  }
  .row-container {
    justify-content: center;
    align-items: center;
  }

  .row-fd-column {
    flex-direction: column;
  }

  h2 {
    font-weight: bold;
    font-size: 40px;
  }

  p {
    font-size: 18px;
    line-height: 32px;
    font-weight: bold;
  }

  img {
    position: relative;
    left: 0;
    top: calc( 50% - 75px);
    width: 150px;
    height: 150px;
    margin: 40px
  }

  .banner-1 {
    background-image: url('./../images/overview-banner-1.jpg');
    background-size: cover;
    background-position-y: center;
    height: calc(100vh - 130px);
  }

  .banner-2 {
    transition: 1.5s;
    height: 50vh;
    transform: translateY(20px);
    opacity: 0;
  }

  .banner-3 {
    transition: 1.5s;
    height: 50vh;
    transform: translateY(20px);
    opacity: 0;
  }

  .forkme {
    position: absolute;
    left: auto;
    right: 0;
    top: 0;
    width: 150px;
    height: 150px;
    margin: 0;
  }
  .forkme:hover {
    cursor: pointer;
  }

  .info-column {
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }

  #info-project {
    padding: 5px;
    display: flex;
  }

  #info-origin-author {
    padding: 5px;
    display: flex;
    width: 80%;
    height: 20vh;
    justify-content: center;
  }

  #info-webapp-author {
    padding: 5px;
    display: flex;
    width: 80%;
    height: 40vh;
    justify-content: center;
  }

</style>