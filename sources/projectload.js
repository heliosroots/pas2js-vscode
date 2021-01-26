const { showMessage, showErrorMessage, showQuickPick } = require("./utils");
const { settings, execCodetools } = require("./base");

const projectLoadSettings = async () => {
    let resp = await execCodetools({
        action: "projectListSettings"
    });
    if (!resp.success) {
        return showErrorMessage("Project settings failed => " + (resp.data ? resp.data : resp));
    };    
    settings.projectSettings = resp.data.length === 1 ? resp.data[0] : await showQuickPick("Select an option...", resp.data);     
    showMessage("Project Settings loaded successfully");
}; 

module.exports = {
    projectLoadSettings
};