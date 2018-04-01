/**
 * Created by ozknemoy on 05.04.2017.
 */
const gulp = require('gulp'),
    replace = require('gulp-replace-task'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    historyApiFallback = require('connect-history-api-fallback'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

    allAssets = [
        'src/assets/css/*.*',
        'src/assets/fonts/*.*',
        'src/assets/img/*.*',
        'src/assets/js/*.*'
    ];
const postcss = require('gulp-postcss'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('autoprefixer');
const processors = [
    autoprefixer({browsers: ['last 5 version']})
];

//  аотплагин коверкает сборки и в ней нет строк из дев билда
gulp.task('replace-prod', function () {
    var commonUrl = [{
        match: /\/testservice\.prioriticlub\.ru/g,// rest
        replacement: function () {
            return '/service.prioriticlub.ru'
        }
    },{
        match: /\/test1\.prioriticlub\.ru/g,// домен
        replacement: function () {
            return '/prioriticlub.ru'
        }
    }];
    var front = commonUrl;
    var back = commonUrl;
    var indexHtmlProd = [{
        match: /(<meta name="ROBOTS" content="NOINDEX,NOFOLLOW">)/i,
        replacement: function () {
            return ''
        }
    }];

    return gulp.src("./dist/client.js")
            .pipe(replace({patterns: front}))
            .pipe(gulp.dest('dist'))
        &&
        gulp.src("./dist/server.js")
            .pipe(replace({patterns: back}))
            .pipe(gulp.dest('dist'))
        &&
        gulp.src("./dist/index.html")
            .pipe(replace({patterns: indexHtmlProd}))
            .pipe(gulp.dest('dist'))
});
// на случай если забуду поменять урлы
gulp.task('replace-test', function () {
    var commonUrl = [{
        match: /\/service\.prioriticlub\.ru/g,// rest
        replacement: function () {
            return '/testservice.prioriticlub.ru'
        }
    }];
    var front = commonUrl;
    var back = commonUrl;

    return gulp.src("./dist/client.js")
            .pipe(replace({patterns: front}))
            .pipe(gulp.dest('dist'))
        &&
        gulp.src("./dist/server.js")
            .pipe(replace({patterns: back}))
            .pipe(gulp.dest('dist'))
});
gulp.task('css-afterbuild', function () {
    return gulp.src('dist/assets/css/*.css')
        .pipe(postcss(processors))
        .pipe(cleanCSS({debug: true,specialComments: false}, function (details) {
            console.log(`${details.name} :  ${details.stats.minifiedSize},       saved ${Math.floor(100 * (details.stats.originalSize - details.stats.minifiedSize) / details.stats.originalSize)}%`);
        }))
        .pipe(gulp.dest('dist/assets/css/'))
});

gulp.task('styles-dev', function () {
    return gulp.src('./src/assets/scss/screen.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('styles-prod', function () {
    return gulp.src('./src/assets/scss/screen-kit.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(cleanCSS({debug: true,specialComments: false}, function (details) {
            console.log(`${details.name} :  ${details.stats.minifiedSize},       saved ${Math.floor(100 * (details.stats.originalSize - details.stats.minifiedSize) / details.stats.originalSize)}%`);
        }))
        .pipe(gulp.dest('./src/assets/css'))
});

/*gulp.task('_watch', function () {
    return gulp.src('./dist/client.js')
        .pipe(livereload());
});
gulp.task('watch-slow', function () {
    // полноценно с бексервером но 23sec refresh
    gulp.watch('./dist/client.js', ['_watch']);
    livereload.listen();
});*/

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./dist",
            middleware: [historyApiFallback()]
        },
        notify: false
    });
});
gulp.task('_watch-bs', function () {
    // оптимально для дев разработки
    // бексервер не участвует поэтому 10-12sec refresh
    gulp.watch('./dist/client.js').on("change", browserSync.reload);

    gulp.watch('./src/assets/scss/screen-kit/**/*.scss', ['styles-dev']);
});
gulp.task('watch', ['styles-dev','browser-sync', '_watch-bs']);

gulp.task('moveAssets', function () {
    return gulp.src(allAssets, {base: 'src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('install-test', function () {
    runSequence(['replace-test', 'styles-prod', 'css-afterbuild']);
});

gulp.task('install-prod', function () {
    runSequence(['replace-prod', 'styles-prod','css-afterbuild']);
});