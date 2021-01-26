const { showErrorMessage, showInputBox, openFile } = require("./utils");
const { settings, execCodetools } = require("./base"); 

const projectNewAppWebBrowser = async () => {
    let resp = await execCodetools({
        action: "projectNewAppWebBrowser",
        projectName: await showInputBox("Project Name", "Enter the Project name...", "project1")
    });
    if (!resp.success) {
        return showErrorMessage("Project failed => " + (resp.data ? resp.data : resp));        
    }; 
    openFile(resp.data.project); 
    settings.projectSettings = resp.data.projectSettings;
};

module.exports = {
    projectNewAppWebBrowser
};  