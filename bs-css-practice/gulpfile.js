// var babelify = require('babelify');
// var brfs = require('brfs');
// var browserify = require('browserify');
var webpack = require("webpack");

var bytes = require('bytes');
var chalk = require('chalk');
var del = require('del');
var gutil = require('gulp-util');
var watchify = require('watchify');


var connect = require('gulp-connect');
var less = require('gulp-less');
// var merge = require('merge-stream');
// var source = require('vinyl-source-stream');

// var xtend = require('xtend');
var webpackConfig = require("./webpack.config.js");

//发布版本 
var uglify = require('gulp-uglify'); //JS 压缩混淆
var minify = require('gulp-minify-css'); //CSS 压缩

var gulp = require('gulp');

var productionDir = './assets';
var Development = './www';


var wwwDir = Development;

process.env.NODE_ENV === 'production' ? wwwDir = productionDir : wwwDir = Development






function watchBundle(bundle, name, dest) {
    return watchify(bundle, {
            poll: true
        })
        .on('log', function(message) {
            message = message.replace(/(\d+) bytes/, function() {
                return bytes.format(Number(arguments[1]));
            });
            gutil.log(chalk.grey(message));
        })
        .on('time', function(time) {
            gutil.log(chalk.green('Application built in ' + (Math.round(time / 10) / 100) + 's'));
        })
        .on('update', function(ids) {
            var changed = ids.map(function(x) {
                return chalk.blue(x.replace(__dirname, ''));
            });

            if (changed.length > 1) {
                gutil.log(changed.length + ' scripts updated:\n* ' + changed.join('\n* ') + '\nrebuilding...');

            } else {
                gutil.log(changed[0] + ' updated, rebuilding...');
            }

            doBundle(bundle, name, dest);
        });
}

function plumb(src, transforms, dest) {
    var stream = gulp.src(src);

    transforms.forEach(function(transform) {
        stream = stream.pipe(transform());
    });

    if (dest) {
        stream = stream.pipe(gulp.dest(dest));
    }

    return stream.pipe(connect.reload());
}

// Build
gulp.task('fonts', plumb.bind(null, 'src/fonts/**', [], wwwDir + '/fonts'));
gulp.task('html', plumb.bind(null, 'src/*.html', [], wwwDir));
gulp.task('images', plumb.bind(null, 'src/img/**', [], wwwDir + '/img'));
gulp.task('css', plumb.bind(null, 'src/css/*.css', [], wwwDir + '/css'));
gulp.task('less', plumb.bind(null, 'src/css/*.less', [less], wwwDir + '/css'));
gulp.task('jsvendor', plumb.bind(null, 'src/js/vendor/*', [], wwwDir + '/js/vendor/'));
// gulp.task('scripts', buildApp.bind(null, ['./src/js/app.js'], [babelifyTransform, brfs], wwwDir + '/js', false));

gulp.task('build', ['html', 'images', 'fonts', 'css', 'less']);

gulp.task("webpack", function(callback) {
    // 参考地址：https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
    
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// Clean
gulp.task('clean', function() {
    return del([wwwDir + '/*']);
});

// production
gulp.task('uglify', plumb.bind(null, [wwwDir + '/js/*'], [uglify], wwwDir + '/js'));
gulp.task('minify', plumb.bind(null, [wwwDir + '/css/*'], [minify], wwwDir + '/css'));

gulp.task('watch', ['html', 'images', 'fonts', 'css', 'less','webpack','jsvendor'], function() {
    gulp.watch(['src/*.html'], ['html']);
    gulp.watch(['src/img/**/*.*'], ['images']);
    gulp.watch(['src/fonts/**/*.*'], ['fonts']);
    gulp.watch(['src/css/**/*.css'], ['css']);
    gulp.watch(['src/css/**/*.less'], ['less']);
    gulp.watch(['src/js/*'], ['webpack']);
});

gulp.task('watchless', ['less'], function() {
    gulp.watch(['src/css/**/*.less'], ['less']);
});

gulp.task('serve', function() {
    connect.server({
        root: wwwDir,
        port: 8000,
        livereload: true
    });
});

gulp.task('dev', ['serve', 'watch']);

gulp.task('production', ['build'], function() {
    gulp.start('uglify', 'minify');
});
