const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const babel = require('gulp-babel');

let path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        style: 'dist/css/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/css/*.css'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.css'
    },
    clean: './dist'
};

let config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "Frontend_Gulp"
};

gulp.task('pages', () => {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

gulp.task('styles', () => {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(concatCss('style.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.style))
        .pipe(reload({stream: true}));
});

gulp.task('watch', () => {
    watch([path.watch.html], (event, cb) => {
        gulp.start('pages');
    });
    watch([path.watch.style], (event, cb) => {
        gulp.start('styles');
    });
    watch([path.watch.js], (event, cb) => {
        gulp.start('scripts');
    });
});

gulp.task('build', [
    'pages',
    'scripts',
    'styles'
]);

gulp.task('webserver', () => {
    browserSync(config);
});

gulp.task('default', ['build', 'webserver', 'watch']);
