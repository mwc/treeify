var gulp = require('gulp');
var babel = require('gulp-babel');
var rollup = require('gulp-rollup');
var mocha = require('gulp-mocha');

gulp.task('rollup', function () {
    return gulp.src('./src/treeify.js')
        .pipe(rollup({
            input: './src/treeify.js',
            output: {
                format: 'umd',
                name: 'treeify'
            }
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('test', ['rollup'], function () {
    return gulp.src('./tests/test.js')
        .pipe(mocha());
});

gulp.task('build', ['rollup'], function () {
    return gulp.src('./build/treeify.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);