var gulp = require('gulp');
var browserify = require('gulp-browserify');
var watch = require('gulp-watch');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var less = require('gulp-less');

var babelify = require("babelify");

var jsDir = './client/js/**/*',
	jsDist = './public/dist/js',

    lessDir = './client/less/**/*.less',
    lessMain = './client/less/main.less',
    lessDist = './public/dist/css';

gulp.task('less', function()
{
    gulp.src(lessMain)
    .pipe(less())
		.on('error', function(){})
    .pipe(gulp.dest(lessDist));
});

gulp.task('scripts', function()
{
	gulp.src(jsDir)
	.pipe(watch(jsDir))
	.pipe(browserify({
		insertGlobals: true,
		transform: [
            ["reactify", {"es6": true}],
            ['babelify']
        ],
	}))
    //.pipe(uglify())
	  .on('error', gutil.log)
	.pipe(gulp.dest(jsDist))
});


gulp.task('default', function(cb)
{
    gulp.start('scripts');
    gulp.start('less');

    gulp.watch(lessDir, function()
    {
        gulp.start('less');
    });
    gulp.watch('./*', function()
    {
        gulp.start('scripts');
    });
    gulp.watch('./react/**/*', function()
    {
    	gulp.start('scripts');
    });
});
