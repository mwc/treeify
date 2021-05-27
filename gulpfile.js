const gulp = require("gulp")
const babel = require("gulp-babel")
const rollup = require("gulp-rollup")
const mocha = require("gulp-mocha")
const uglify = require("gulp-uglify")

const { task, src, dest, series } = gulp

task("rollup", function () {
	return src("./src/treeify.js")
		.pipe(
			rollup({
				input: "./src/treeify.js",
				output: {
					format: "umd",
					name: "treeify"
				}
			})
		)
		.pipe(dest("./build"))
})

task("test", series("rollup"), function () {
	return src("./tests/*").pipe(mocha())
})

task("build", series("rollup"), function () {
	return src("./build/treeify.js")
		.pipe(
			babel({
				presets: ["env"]
			})
		)
		.pipe(uglify())
		.pipe(dest("./dist"))
})

task("default", series("build"))