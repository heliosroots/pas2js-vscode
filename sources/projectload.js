const { showListBox } = require("./utils");
const { settings, execCodetools } = require("./base");

const projectLoad = async () => {
    let resp = await execCodetools({
        action: "projectListSettings"
    });
    if (!resp.success) {
        return
    };  
    settings.projectSettings = resp.data.length === 1 ? resp.data[0] : await showListBox("Select a project settings...", resp.data.sort());
};

module.exports = {
    projectLoad
};