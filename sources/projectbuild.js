const { showError, execTask } = require("./utils");
const { settings, execCodetools } = require("./base");

const projectBuild = async () => { 
    if (!settings.projectSettings) {
        return showError("No project settings selected.");
    };
    let resp = await execCodetools({
        action: "projectCommandLine"
    });
    if (!resp.success) {
        return showError("Project building failed => " + (resp.data ? resp.data : resp));
    };
    // Compile
    execTask("Build", "Pas2JS", resp.data, ["$pas2js"]);
};

module.exports = {
    projectBuild
};