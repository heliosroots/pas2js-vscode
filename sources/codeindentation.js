const { window } = require("vscode");
const { showError, changedFiles, applyText } = require("./utils");
const { execCodetools } = require("./base");

const codeIndentation = async () => {
    let editor = window.activeTextEditor;
    if (!editor) {
        return
    };   
    let resp = await execCodetools({
        action: "codeIndentation",
        path: editor.document.uri.fsPath, 
        updates: await changedFiles()
    }); 
    if (!resp.success) { 
        return showError("Failed to indent code => " + (resp.data ? resp.data : resp));
    };
    applyText(editor, resp.data, 0, 0); 
};

module.exports = {
    codeIndentation
}; 