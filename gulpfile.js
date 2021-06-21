import gulp from "gulp"
import babel from "gulp-babel"
import rollup from "gulp-rollup"
import mocha from "gulp-mocha"
import uglify from "gulp-uglify"

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

task("test", function () {
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