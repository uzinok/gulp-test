const {
	src,
	dest,
	parallel,
	series,
	watch
} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

function html() {
	return src('src/*.html')
		.pipe(dest('build/'))
}

function styles() {
	return src('src/styles/**/*.scss')
		// .pipe(sass().on('error', sass.logError))
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(dest('css/'))
}

function scripts() {
	return src('src/js/*.js')
		.pipe(dest('build/js/'))
}

function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: {
			baseDir: 'src/'
		}, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

exports.scripts = scripts;
exports.html = html;
exports.browsersync = browsersync;
exports.styles = styles;
