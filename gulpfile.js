var gulp = require('gulp'),
     connect = require('gulp-connect'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass');
 
    

// livereloud
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//css
gulp.task('css', function () {
//gulp.src('app/css/*.css')
gulp.src('app/scss/style.scss') //путь к папке с цсс

    .pipe(sass())
    .pipe(autoprefixer({
			browsers: ['last 12 versions', 'ie 8'], //для каких браузеров префиксы
			cascade: false
		}))
    .pipe(minifyCss(''))
    .pipe(rename('bundle.min.css')) //как будет называться минифицированная версия
    .pipe(gulp.dest('app/cssmin')) // создаётся папка для минифицированной версии
    //.pipe(concatCss('bundle.css')) //конкат  
    
    .pipe(notify('so good work!')) //текст всплывающей заметки
    .pipe(connect.reload());
});

//html
gulp.task('html', function() {
	gulp.src('app/index.html')
	.pipe(connect.reload());
})

//watch
gulp.task('watch', function() {
	gulp.watch('app/css/style.css', ['css'])
	gulp.watch('app/index.html', ['html'])
    gulp.watch('app/scss/style.scss', ['css'])
})
gulp.task('default', ['connect', 'html', 'css', 'watch']);

