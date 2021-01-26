const { workspace } = require("vscode");
const { rootDir, execProcess } = require("./utils");

const settings = {
    codetools: "",
    compiler: "",
    compilerSourceDir: "",
    projectDir: "",
    projectSettings: ""
};

const updateSettings = () => {
    let config = workspace.getConfiguration("pas2js").get;
    settings.codetools = config("codetools");
    settings.compiler = config("compiler");
    settings.compilerSourceDir = config("compilerSourceDir");
    settings.projectDir = rootDir();
};

const execCodetools = (args) => {
    return new Promise((resolve) => {
        if (!settings.codetools) {
            resolve("Path to the \"CodeTools\" executable is undefined");
            return
        };
        if (!settings.compiler) {
            resolve("Path to the \"Pas2JS\" executable is undefined");
            return
        };
        if (!settings.compilerSourceDir) {
            resolve("Path to then \"Pas2JS\" source files directory is undefined");
            return
        }
        let bin = settings.codetools;
        let stdin = Object.assign(
            {
                compiler: settings.compiler,
                compilerSourceDir: settings.compilerSourceDir,
                projectDir: settings.projectDir,
                projectSettings: settings.projectSettings
            },
            args
        );
        execProcess(bin, JSON.stringify(stdin))
            .then((resp) => {  
                resolve(JSON.parse(resp));
            }).catch((error) => {
                resolve("Failed to execute \"CodeTools\" => " + error.message);
            });
    });
};

module.exports = {
    settings,
    updateSettings,
    execCodetools
};