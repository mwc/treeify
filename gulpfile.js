const gulp = require("gulp")
const babel = require("gulp-babel")
const rollup = require("gulp-rollup")
const mocha = require("gulp-mocha")
const uglify = require("gulp-uglify")

gulp.task("rollup", function () {
	return gulp.src("./src/treeify.js")
		.pipe(
			rollup({
				input: "./src/treeify.js",
				output: {
					format: "umd",
					name: "treeify"
				}
			})
		)
		.pipe(gulp.dest("./build"))
})

gulp.task("test", ["rollup"], function () {
	return gulp.src("./tests/*").pipe(mocha())
})

gulp.task("build", ["rollup"], function () {
	return gulp.src("./build/treeify.js")
		.pipe(
			babel({
				presets: ["env"]
			})
		)
		.pipe(uglify())
		.pipe(gulp.dest("./dist"))
})

gulp.task("default", ["build"])