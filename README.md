Gulp init內插件說明:

    "gulp": "^3.9.1", Glup主文件
    "gulp-load-plugins": "^1.5.0", 將gulp開頭的插件自動插入，不需要再寫require
    "gulp-plumber": "^1.1.0", 發生錯誤時不中斷Gulp的運行
    For Gulp

    "gulp-jade": "^1.1.0", HTML預處理檔案自動編譯
    For HTML

    "gulp-sass": "^3.1.0", CSS預處理檔案自動編譯
    "gulp-postcss": "^7.0.0", CSS使用插件集
    "autoprefixer": "^7.1.3", CSS自動加入前綴詞
    "gulp-clean-css": "^3.7.0",, CSS最大化壓縮
    For CSS

    "gulp-babel": "^7.0.0", JS ES6自動編譯成ES5(符合目前主流)的格式
    "babel-core": "^6.26.0", babel的核心文件
    "babel-preset-es2015": "^6.24.1", babel針對ES5編譯的文件
    "gulp-uglify": "^3.0.0", 壓縮JS，同時可以對壓縮檔進行修改(例如去除所有console.log())
    For JS

    "browser-sync": "^2.18.13", 建立虛擬主機與瀏覽器自動更新功能
    "gulp-concat": "^2.6.1", 將指定檔案壓縮成一個檔案
    "gulp-sourcemaps": "^2.6.1", 標示出合併過後的檔案中，程式碼的來源程式
    "bower": "^1.8.0", 管理前端網頁框架的程式
    "main-bower-files": "^2.13.1", Bower將框架的主要檔案輸出
    "minimist": "^1.2.0" 可選擇區域壓縮的插件
    "gulp-imagemin": "^3.3.0", 壓縮圖片檔案
    "gulp-if": "^2.0.2", minimist使用的子插件
    "gulp-clean": "^0.3.2", 刪除預計指定的資料夾與檔案
    "gulp-sequence": "^0.4.6", 將'[]'內的task指令(按照順序)綁定到指定新task
    "gulp-gh-pages": "^0.5.4", 快速將檔案上傳到Github的插件
    Other function

    Bower init內插件說明:

    "jquery": "^3.2.1", JS框架，建立動畫以及各瀏覽器兼容性
    "bootstrap": "v4.0.0-alpha.6", 網頁框架，為RWD設計提供強力功能，以及大量CSS設計
    "vue": "^2.4.2" 資料驅動型，即時反應式的JS框架

操作流程

    1.安裝Nodejs
    2.npm install -g gulp (產生node_modules)
    3.npm install (安裝Gulp init內的插件至node_modules)
    4.bower install (安裝Bower init內的框架文件至bower_components)
    5.gulp (進行gulpfile.json內的設定，產生'.tmp'(暫時的網頁框架文件)、public(壓縮、編譯過的文件))

    P.S. gulp --env production (以壓縮過後的形式輸出檔案)

發布前:

    gulp build --env production (刪除.tmp&public file，然後重新編譯/壓縮產出public中的檔案。為了在發布前整理一次檔案。)

Git:

    1.cmd-> git init
    2.git status
    3.build .gitignore(enter 不要的檔案/資料夾名)
    4.git add .
    5.git commit -m "git init"
