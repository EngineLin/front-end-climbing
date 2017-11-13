var gulp = require('gulp'); //Gulp主要插件
var $ = require('gulp-load-plugins')(); //將gulp開頭的插件自動插入，不需要再寫require
var autoprefixer = require('autoprefixer'); //自動為CSS加入前綴詞(符合瀏覽器版本)
var mainBowerFiles = require('main-bower-files'); //將bower的主要插件檔案輸出
var browserSync = require('browser-sync').create(); //websever可以開啟虛擬主機以及網頁自動更新功能
var minimist = require('minimist');
var gulpSequence = require('gulp-sequence');
var envOptions = {
    string: 'env',
    default: {env: 'develop'}
};
var options = minimist(process.argv.slice(2), envOptions); 
//process.argv.slice(2) 意思為跳過前兩個 -- 字元直接讀取 env 這個字串

gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    gulp.src('./source/**/!(_)*.jade') //輸入位置 P.S.可以使用(./source/**/!(_)*.jade)的語法篩掉'_'開頭的檔案
        .pipe($.plumber()) //出現ERROE不中斷運行
        .pipe($.if(options.env !== 'production' , $.jade({
            pretty:true //是否展開HTML
        }))) //jade編譯
        .pipe($.if(options.env === 'production' , $.jade({
            pretty:false //是否展開HTML
        }))) //jade編譯
        //判斷env字串決定是否展開HTML
        .pipe(gulp.dest('./public/')) //輸出位置
        .pipe(browserSync.stream()) //瀏覽器自動重新整理
});

gulp.task('sass', function () {
    var plugins = [
        autoprefixer({browsers: ['last 2 version','>5%']})
        // postCSS其中一個插件:autoprefixer自動插入前綴詞({針對瀏覽器:['最先的幾版(1最新)']})
    ];
    return gulp.src('./source/sass/**/!(_)*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init()) //製作一份編譯後的source.map檔案
        .pipe($.sass().on('error', $.sass.logError)) //sass編譯
        // SASS編譯完成
        .pipe($.postcss(plugins)) //postcss中的autoprefixer功能
        .pipe($.if(options.env === 'production' , $.cleanCss()))
        .pipe($.concat('all.css')) //合併所有檔案為all.css
        .pipe($.sourcemaps.write('.')) //將路徑寫入sourcemap的init??
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream())
    });

gulp.task('babel', () => //ES6的function寫法
    gulp.src('./source/js/**/!(_)*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({
        presets: ['es2015'] //設定要編譯的ES版本
        })) //編譯JS
    .pipe($.concat('all.js'))
    .pipe($.if(options.env === 'production' , $.uglify({
        compress: {
            drop_console: true //是否將壓縮過後的檔案中的consloe都拔除
        }
    }))) //壓縮檔案
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream())
);

gulp.task('image-min', () =>
    gulp.src('./source/images/**/*')
    .pipe($.if(options.env === 'production' , $.imagemin()))
    .pipe(gulp.dest('./public/images/'))
);
//壓縮照片檔案

gulp.task('watch', function () {
        gulp.watch('source/sass/**/!(_)*.scss', ['sass']);
        gulp.watch('source/**/!(_)*.jade', ['jade']);
        gulp.watch('source/js/**/!(_)*.js',['js']); //去除path最前面的'./'似乎可以避免偵測不到新增檔案的動作
    });
// 監聽更新

gulp.task('bower', function(){
    return gulp.src(mainBowerFiles()) //會以bower.json內的list為準抓取必要檔案??
    .pipe(gulp.dest('./.tmp/vendors'))
});
// Bower輸出註冊在init內的主要JS檔案

gulp.task('vendorJS',['bower'],function(){ //'[]'內的指令會在這個function進行之前先進行一次，並且會等到它完成
    return gulp.src('./.tmp/vendors/**/!(_)*.js')
    .pipe($.concat('vendors.js'))
    .pipe($.if(options.env === 'production' , $.uglify())) //壓縮檔案
    .pipe(gulp.dest('./public/'))
});

gulp.task('browser-sync', function(){
    browserSync.init({  
        server: {
            baseDir: './public' 
        }
    }); //應該是在borwserSync的init文件中改設定，指定輸出的位置(但是我在這份init上找不到server or baseDir的Key...)
});

gulp.task('clean', function(){
    return gulp.src(['./.tmp','./public'], {read: false})
    .pipe($.clean())
});
//清除指定資料夾的指令

gulp.task('default',['jade','sass','babel','vendorJS','image-min','browser-sync','watch']);
// 綁定 cmd上gulp指定會啟動'[]'內所有的指令

gulp.task('build', gulpSequence('clean','jade','sass','babel','image-min','vendorJS'));
// 綁定 cmd上build指令會按照順序啟動'[]'內所有的指令 (用於發表前)

gulp.task('deploy', function(){
    return gulp.src('./public/**/*')
    .pipe($.ghPages())
}); //快速上傳檔案到Github