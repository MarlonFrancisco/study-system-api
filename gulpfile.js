const { src, task, watch, series, dest } = require("gulp");
const clean = require("gulp-clean");
const { createProject } = require("gulp-typescript");

const tsProject = createProject("./tsconfig.json");

task("compile", () => {
    return src("./lib/**/*.ts")
        .pipe(tsProject())
        .pipe(dest("./dist/"));
});

task("clean", () => {
    return src("./dist/")
        .pipe(clean());
});

const tasks = series(["clean", "compile"]);

task("watch", () => {
    return watch("./lib/**/*.ts", { event: "change"}, tasks);
});
