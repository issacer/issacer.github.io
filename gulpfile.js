var gulp 		= require('gulp'),
	less 		= require('gulp-less'),				//编译less
	rename 		= require('gulp-rename'),	
	minHtml		= require('gulp-htmlmin'),	
	minCss 		= require('gulp-minify-css'),
	minJs 		= require('gulp-uglify'),
	notify		= require('gulp-notify'),			//消息提醒
	browserSync	= require('browser-sync').create(),	//实时刷新浏览器
	reload 		= browserSync.reload;

var PRE = pre_suffix = 'less';
var root = {
	htmlRoot: '/',
	src: {
		html: 'src/html/',
		js: 'src/js/',
		precss: function(sender){ return 'src/'+PRE+'/'+sender+'.'+pre_suffix; }
	},
	dist: {
		html: '/',
		css: 'dist/css/',
		js: 'dist/js/'
	}
}

// 生产环境
gulp.task('html', function(){
	var options = {
		collapseWhitespace:true,
		collapseBooleanAttributes:true,
		removeComments:true,
		removeEmptyAttributes:true,
		removeScriptTypeAttributes:true,
		removeStyleLinkTypeAttributes:true,
		minifyJS:true,
		minifyCSS:true
	};
	return gulp.src(root.src.html+'/*.html').
	pipe(minHtml(options))
	.pipe(gulp.dest(root.dist.html))
});
gulp.task('precss', function(){
	return gulp.src('src/less/*.less')
	.pipe(less())
	.pipe(minCss())
	.pipe(gulp.dest('dist/css'))
});
gulp.task('js', function(){
	return gulp.src('src/js/*.js')
	.pipe(minJs())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/js'))
});
gulp.task('build', ['html', 'precss' ,'js']);


// 开发环境
gulp.task('html:dev', function(){
	return gulp.src(root.src.html+'/*.html')
	.pipe(gulp.dest(root.dist.html))
	.pipe(reload({stream: true}))

});
gulp.task('html-watch:dev', ['html:dev'], browserSync.reload);

gulp.task('precss:dev', function(){
	return gulp.src(root.src.precss('/*'))
	.pipe(less())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(root.dist.css))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('js:dev', function(){
	return gulp.src(root.src.js+'/*.js')
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(root.dist.js))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('dev', ['html:dev', 'precss:dev' ,'js:dev'], function(){
	browserSync.init({
		server: { baseDir: root.htmlRoot }
	});
	gulp.watch(root.src.html+'/*.html', ['html:dev']);
	gulp.watch(root.src.js+'/*.js', ['js:dev']);
	gulp.watch([root.src.precss('/*'), root.src.precss('/*/*')], ['precss:dev']);
});