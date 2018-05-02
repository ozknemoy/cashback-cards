/**
 * Created by ozknemoy on 05.04.2017.
 */
const gulp = require('gulp'),
  replace = require('gulp-replace-task'),
  del = require('del'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create(),
  historyApiFallback = require('connect-history-api-fallback'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('autoprefixer');
const processors = [autoprefixer({browsers: ['last 5 version']})];

const portCrimeaTest = '4100';
const portArenasportTest = '4200';
const portCrimeaProd = '5100';
const portArenasportProd = '5200';
const portReg = /(4100|4200|5100|5200)/i;

const apiArenasportTest = 'service.card.prioriticlub.ru';
const apiArenasportTestReg = /service\.card\.prioriticlub\.ru/g;
const apiArenasportProd = 'back.arenasportcard.ru';
const apiCrimeaProd = 'back.crimeacard.ru';
const apiCrimeaTest = 'service.crim.prioriticlub.ru';
const apiCrimeaTestReg = /service\.crim\.prioriticlub\.ru/g;

const styleSuffix = '?v=1.1.';
const styleCrimea = 'crimea-screen-kit.css';
const styleCrimeaReg = /crimea-screen-kit\.css/g;
const styleArenasport = 'arenasport-screen-kit.css';
const styleArenasportReg = /arenasport-screen-kit\.css/g;

const gMapsArenasport = 'gMapsArenasport';
const gMapsCrimea = 'gMapsCrimea';

gulp.task('replace-crimea-to-Prod', function () {
  return replaceProd({
    port:[portReg, portCrimeaProd],
    api: [apiCrimeaTestReg, apiCrimeaProd],
    style: [styleCrimeaReg, styleCrimea]
  })
});

gulp.task('replace-arenasport-to-Prod', function () {
  return replaceProd({
    port:[portReg, portArenasportProd],
    api: [apiArenasportTestReg, apiArenasportProd],
    style: [styleArenasportReg, styleArenasport]
  })
});

function replaceProd({port, api, style}) {
  const common = [{
    match: api[0],
    replacement: function () {
      return api[1]
    }
  }];
  const _port = [{
    match: port[0],
    replacement: function () {
      return port[1]
    }
  }];

  const _styles = [{
    match: style[0],
    replacement: function () {
      return style[1] + styleSuffix + Math.floor(Math.random() * 10000000)
    }
  }];
  const front = common;
  const back = common;

  return gulp.src("./dist/browser/*.bundle.js").pipe(replace({patterns: front})).pipe(gulp.dest('dist/browser'))
    && gulp.src("./dist/server/main.bundle.js").pipe(replace({patterns: back})).pipe(gulp.dest('dist/server'))
    && gulp.src("./dist/server.js").pipe(replace({patterns: back.concat(_port)})).pipe(gulp.dest('dist'))
    && gulp.src("./dist/prerender.js").pipe(replace({patterns: back})).pipe(gulp.dest('dist'))
    && gulp.src("./dist/browser/index.html").pipe(replace({patterns: _styles})).pipe(gulp.dest('dist/browser'))
}

gulp.task('replace-test-arenasport-to-crimea', function () {
  return replaceTest({
    port:[portReg, portCrimeaTest],
    api: [apiArenasportTestReg, apiCrimeaTest],
    style: [styleArenasportReg, styleCrimea],
    map: [new RegExp(gMapsArenasport, 'g'), gMapsCrimea],
    isArenasport: false
  })
});

gulp.task('replace-test-crimea-to-arenasport', function () {
  return replaceTest({
    port:[portReg, portArenasportTest],
    api: [apiCrimeaTestReg, apiArenasportTest],
    style: [styleCrimeaReg, styleArenasport],
    map: [new RegExp(gMapsCrimea, 'g'), gMapsArenasport],
    isArenasport: true
  })
});

function replaceTest({port,  api, style, map, isArenasport}) {
  const _api = [{
    match: api[0],
    replacement: function () {
      return api[1]
    }
  }];
  const _port = [{
    match: port[0],
    replacement: function () {
      return port[1]
    }
  }];
  const _style = [{
    match: style[0],
    replacement: function () {
      return style[1]
    }
  }];
  const _map = [{
    match: map[0],
    replacement: function () {
      return map[1]
    }
  }];
  const _isArenasport = [{
    match: new RegExp(!isArenasport, 'i'),
    replacement: function () {
      return isArenasport
    }
  }];
  return gulp.src("./server.ts").pipe(replace({patterns: _port})).pipe(gulp.dest(''))
    && gulp.src("./src/config/is-arenasport.config.ts").pipe(replace({patterns: _isArenasport})).pipe(gulp.dest('./src/config'))
    && gulp.src("./src/config/base_url.ts").pipe(replace({patterns: _api})).pipe(gulp.dest('src/config'))
    && gulp.src("./src/index.html").pipe(replace({patterns: _style})).pipe(gulp.dest('src'))
    && gulp.src("./src/app/vendor.modules.ts").pipe(replace({patterns: _map})).pipe(gulp.dest('src/app'))
    && del(['src/assets/img', '!assets', '!src'], {force:true})
      .then(function() {
        setTimeout(function () {
          gulp.src('./img-' + (isArenasport? 'arenasport' : 'crimea') + '/*.*').pipe(gulp.dest('./src/assets/img'))
        }, 1000)
      })
}

gulp.task('css-before-build-prod', function () {
  return gulp.src('src/assets/css/*.css')
    .pipe(postcss(processors))
    .pipe(cleanCSS({debug: true, specialComments: false}, function (details) {
      console.log(`${details.name} :  ${details.stats.minifiedSize},       saved ${Math.floor(100 * (details.stats.originalSize - details.stats.minifiedSize) / details.stats.originalSize)}%`);
    }))
    .pipe(gulp.dest('src/assets/css'))
});

gulp.task('styles-dev', function () {
  return gulp.src('./src/assets/scss/screen-kit.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('styles-build-scss', function () {
  return gulp.src('./src/assets/scss/screen-kit.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cleanCSS({debug: true, specialComments: false}, function (details) {
      console.log(`${details.name} :  ${details.stats.minifiedSize},       saved ${Math.floor(100 * (details.stats.originalSize - details.stats.minifiedSize) / details.stats.originalSize)}%`);
    }))
    .pipe(gulp.dest('./src/assets/css'))
});

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
gulp.task('watch', ['styles-dev', 'browser-sync', '_watch-bs']);

gulp.task('moveAssets', function () {
  return gulp.src([
    'src/assets/css/*.*',
    'src/assets/fonts/*.*',
    'src/assets/img/*.*'
  ], {base: 'src'})
    .pipe(gulp.dest('dist'));
});

gulp.task('install-test', function () {
  runSequence(['replace-test', 'styles-prod', 'css-afterbuild']);
});

/*
gulp.task('install-prod-crimea', function () {
  runSequence(['', '']);
});

gulp.task('install-prod-arenasport', function () {
  runSequence(['', '']);
});*/
