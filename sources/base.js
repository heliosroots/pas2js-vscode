const { workspace } = require("vscode");
const { rootFolder, execProcess } = require("./utils");

const settings = {
    codetools: "",
    compiler: "",
    compilerSources: "",
    projectFolder: "",
    projectSettings: ""
};

const updateSettings = () => {
    let config = workspace.getConfiguration("pas2js").get;
    settings.codetools = config("codetools");
    settings.compiler = config("compiler");
    settings.compilerSources = config("compilerSources");
    settings.projectFolder = rootFolder();
};

const execCodetools = (args) => {
    return new Promise((resolve) => {
        if (!settings.codetools) {
            resolve("Settings => Path to the \"CodeTools\" executable is undefined.");
            return
        };
        if (!settings.compiler) {
            resolve("Settings => Path to the \"Pas2JS\" executable is undefined.");
            return
        };
        if (!settings.compilerSources) {
            resolve("Settings => Path to the source code \"Pas2JS\" is undefined.");
            return
        }
        // Base
        let base = {
            compiler: settings.compiler,
            compilerSources: settings.compilerSources,
            projectFolder: settings.projectFolder,
            projectSettings: settings.projectSettings,
            version: "1.0.1"
        };
        // Merger (base + args)
        let stdin = Object.assign(base, args);
        let bin = settings.codetools;
        execProcess(bin, JSON.stringify(stdin))
            .then((stdout) => {
                resolve(JSON.parse(stdout));
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