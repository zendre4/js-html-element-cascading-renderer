var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp/', { recurse: true });

gulp.task('default',['generateDistJs']);

