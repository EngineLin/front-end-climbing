<template>
  <b-container fluid class="border border-dark">
    <b-row class="justify-content-md-center">
      <b-col class="text-center mb-3">
        <h2>功能教學小教室</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center mb-2">
        <h3>建立帳號</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          點選右上方的 Log-In 標籤或者未登入的使用者頭像，便可以登入或建立帳號。<br><br>
          建立帳號便可以使用專案清單的儲存功能，也能夠同時建立複數的專案。
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-account.png" alt="Manual account">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>使用開發者清單</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          左上方依序有完成勾選選單，紅色英文代表該選項的重要程度。<br><br>
          點選下方藍色箭頭(有資料才會是藍色)可以開啟項目的詳細資料: <sapn class="text-danger">筆記、範例與連結</sapn>。<br><br>
          其中連結依照類型區分成三類，會以圖示標住在連結前方，分別是:<br><br>
          📖: 文檔或文章<br><br>
          🛠: 網路工具 / 測試工具<br><br>
          📹: 媒體或影片內容
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img centerd class="img-fluid" src="./../images/manual-checkItem.png" alt="Manual check item">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>項目的刪除</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          專案、個別項目與筆記都可以刪除。<br><br>
          為了避免您誤刪，需要<sapn class="text-danger">雙擊滑鼠左鍵</sapn>才會刪除資料。
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-deleteBtn.png" alt="Manual delete button">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>資料保存</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          系統本身每 60 秒會為您儲存一次檔案(如果您是登入狀態)，<br><br>
          進行新增與刪除專案時會立即儲存檔案，<br><br>
          當點選右下方的 SAVE 按鈕也會立即儲存檔案。<br><br>
          除此之外，所有的操作都在電腦本地端，<sapn class="text-danger">沒有按儲存的話是不會保留下來的喔!</sapn>
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-save.png" alt="Manual save button">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>項目拖曳</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          當您按住滑鼠左鍵點選項目右方的綠色拉霸，並且<sapn class="text-danger">上下拖曳</sapn>，就能改變項目的順序。<br><br>
          同時左方的導覽列也會同步更新。
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-draggable.png" alt="Manual draggable bar">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>快速導覽</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          當您需要快速尋找項目時，使用左方的導覽列表，<br><br>
          點選左方導覽列表後，會自動幫您找到對應項目的位置。<br><br><br>
          <span class="text-info">此功能只平板或桌面電腦可以使用。</span>
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-navigator.png" alt="Manual navigator">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>新增專案</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          點選左上方的 +New Project 按鈕可以為您新增一個專案，<br><br>
          專案名稱直接在清單的最上方修改。<br><br>
          新增的專案會顯示在左上方，<sapn class="text-danger">點選即可以切換</sapn>。
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-newProject.png" alt="Manual new project">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>增加筆記</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          點選項目中央下方的雙箭頭，可以開啟新增筆記功能。<br><br>
          紀錄對於該項目的細節吧!
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/manual-newNote.png" alt="Manual new note">
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col class="text-center mb-2">
        <h3>勳章</h3>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col class="flex-center" lg="6">
        <p class="text-center">
          ...努力施工中...<br><br>
          當您完成專案中所有項目後，會得到一個 front-end checklist 的獎勵勳章，<br><br>
          您可以放在 .md 或 markdown 寫成的文件中，表示您遵照高標準完成您的網站。
        </p>
      </b-col>
      <b-col lg="6" class="flex-center">
        <img class="img-fluid" src="./../images/coding.png" alt="Coding">
      </b-col>
    </b-row>
  </b-container>
</template>
