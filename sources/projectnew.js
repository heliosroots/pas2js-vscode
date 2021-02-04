const { showError, showInputBox, showListBox, showFile } = require("./utils");
const { settings, execCodetools } = require("./base");

const projectNewSettings = async (projectName) => {
    let resp = await execCodetools({
        action: "projectNewSettings",
        projectName: projectName
    });
    if (!resp.success) {
        return showError("Failed to create then project settings => " + (resp.data ? resp.data : resp));
    };
    settings.projectSettings = resp.data.projectSettings;
};

const projectNewAppNodeJS = async (projectName) => {
    let resp = await execCodetools({
        action: "projectNewAppNodeJS",
        projectName: projectName
    });
    if (!resp.success) {
        return showError("Failed to create then project => " + (resp.data ? resp.data : resp));
    };
    settings.projectSettings = resp.data.projectSettings;
    if (resp.data.project) {
        showFile(resp.data.project);
    };
};

const projectNewAppWebBrowser = async (projectName) => {
    let resp = await execCodetools({
        action: "projectNewAppWebBrowser",
        projectName: projectName
    });
    if (!resp.success) {
        return showError("Failed to create then project => " + (resp.data ? resp.data : resp));
    };
    settings.projectSettings = resp.data.projectSettings;
    if (resp.data.project) {
        showFile(resp.data.project);
    };
};

const projectNew = async () => {
    if (!settings.projectFolder) {
        showError("No folder selected. Create or Select a folder before!");
        return
    };
    let options = [
        "Web Browser Application",
        "NodeJS Application",
        "Project Settings"
    ];
    let index = options.indexOf(await showListBox("Select a project template...", options));
    if (index < 0) {
        return
    };
    let name = await showInputBox("Project name", "Enter the project name...", "project1");
    if (!name) {
        return
    }; 
    switch (index) {
        case 0:
            projectNewAppWebBrowser(name);
            break;
        case 1:
            projectNewAppNodeJS(name);
            break;
        case 2:
            projectNewSettings(name);
            break;
    };
};

module.exports = {
    projectNew
};