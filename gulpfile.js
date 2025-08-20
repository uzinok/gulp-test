const fs = require("fs");

const {
	src,
	dest,
	parallel,
	series,
	watch
} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

function reset(done) {
	fs.rm('./build', { recursive: true, }, () => console.log('Директория успешно удалена.'));
	done();
}

function copy() {
	return src([
		"./src/fonts/*.{woff2,woff}",
		"./src/*.ico",
		"./src/img/**/*.{svg,jpg,jpeg,png,webp,avif}",
		"./src/video/**/*.{mp4,webm}",
		"./src/static/**/*.{css,js}",
	], {
		base: 'src/'
	})
		.pipe(dest('build/'));
}

function html() {
	return src('src/*.html')
		.pipe(dest('build/'))
}

function styles() {
	return src('src/styles/**/*.scss')
		// .pipe(sass().on('error', sass.logError))
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(dest('build/styles/'))
}

function scripts() {
	return src('src/js/*.js')
		.pipe(dest('build/js/'))
}

function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: {
			baseDir: 'build/'
		}, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function server() {
	browsersync();
}

function start(done) {
	return series(reset, copy, parallel(scripts, styles, html), server)(done);
}

function build(done) {
	return series(reset, copy, parallel(scripts, styles, html))(done);
}

exports.start = start;
exports.build = build;
