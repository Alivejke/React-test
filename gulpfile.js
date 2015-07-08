var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    webServer = require('gulp-webserver'),
    util = require('gulp-util'),
    webpack = require('webpack'),
    appConfig = require('./app.config.js'),
    webpackConfig = require('./webpack.config.js');

gulp.task('html', function () {
    var config = Object.create(appConfig);
    gulp.src(config.HTML)
        .pipe(gulp.dest(config.DST));
        //.pipe(connect.reload());
});

gulp.task('server', function () {
    var config = Object.create(appConfig);
    gulp.src(config.DST)
        .pipe(webServer({
                port : 9000,
                livereload: true,
                fallback: 'index.html',
                open: true
            }
        ));
});

gulp.task('webpack', function () {
    var config = Object.create(webpackConfig);
    webpack(config, function(err, stats){
        if(err)
            throw new util.PluginError("webpack", err);
        util.log('[webpack]', stats.toString({
            colors: true
        }));
    })
});

gulp.task('less', function () {
    var config = Object.create(appConfig);
    gulp.src(path.join(config.LESS, '*.less' ))
        .pipe(less({
            paths : [path.join(__dirname, config.LESS, 'less', 'includes')]
        }))
        .pipe(gulp.dest(path.join(config.DST, 'css')));
});

gulp.task('watch', function() {
    var config = Object.create(appConfig);
    gulp.watch(config.HTML, ['html']);
    gulp.watch(path.join(config.LESS, '**', '*.less' ), ['less']);
    gulp.watch(path.join(config.SRC, '**', '*.*'), ['webpack']);
});

gulp.task('default', ['html', 'less', 'webpack', 'server', 'watch']);