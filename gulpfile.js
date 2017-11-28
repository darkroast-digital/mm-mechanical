// gulpfile.js
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var postcss = require('gulp-postcss');
var gulp = require('gulp');
var sass = require('gulp-sass');
var ant = require('postcss-ant');
var flexibility = require('postcss-flexibility');
var autoprefixer = require('autoprefixer');

var places = {
	scss: './scss/*.scss',
	css: 'css',
	html: '*.html',
	js: 'js/*.js'
};

gulp.task('styles', function () {
	return gulp.src(places.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ant, flexibility, autoprefixer]))
		.pipe(gulp.dest('./css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('serve', ['styles'], function () {

		browserSync({
			server: "./"
		});

		gulp.watch(places.scss, ['styles']);
		gulp.watch(places.js).on('change', reload);
		gulp.watch(places.html).on('change', reload);
}); 

gulp.task('default', ['serve']);
