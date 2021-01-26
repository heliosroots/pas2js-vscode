const { showErrorMessage, showInputBox, openFile } = require("./utils");
const { execCodetools } = require("./base");

const projectNewSettings = async () => {
    let resp = await execCodetools({
        action: "projectNewSettings",
        projectName: await showInputBox("Project Name", "Enter the name of the Project Settings...", "project1") 
    }); 
    if (!resp.success) {
        return showErrorMessage("Project Settings failed => " + (resp.data ? resp.data : resp));        
    }; 
    openFile(resp.data.projectSettings);
}; 

module.exports = {
    projectNewSettings
}; 