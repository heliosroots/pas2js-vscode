const { showQuickPick } = require("./utils");
const { projectNewAppWebBrowser } = require("./projectnewappwebbrowser");
const { projectNewAppNodeJS } = require("./projectnewappnodejs");
const { projectNewSettings } = require("./projectnewsettings");

const projectNew = async () => {
    let options = [
        "Web Browser Application",
        "NodeJS Application",
        "Project Settings"
    ];
    switch (options.indexOf(await showQuickPick("Select an option...", options))) {
        case 0:
            projectNewAppWebBrowser();
            break;
        case 1:
            projectNewAppNodeJS();
            break;
        case 2:
            projectNewSettings();
            break;
    };
};

module.exports = {
    projectNew
};