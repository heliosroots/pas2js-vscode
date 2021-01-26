const { showErrorMessage, execTask } = require("./utils");
const { settings, execCodetools } = require("./base");

const projectBuild = async () => { 
    if (!settings.projectSettings) {
        return showErrorMessage("No Project Settings selected");
    };
    let resp = await execCodetools({
        action: "projectCommandLine"
    });
    if (!resp.success) {
        return showErrorMessage("Project building failed => " + (resp.data ? resp.data : resp));
    };
    // build
    execTask("Build", "Pas2JS", resp.data, ["$pas2js"]);
};

module.exports = {
    projectBuild
};