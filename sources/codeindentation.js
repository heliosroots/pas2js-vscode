const { window, workspace } = require("vscode");
const { showErrorMessage, applyText, changedFiles } = require("./utils");
const { execCodetools } = require("./base");

const codeIndentation = async () => {
    let editor = window.activeTextEditor;
    if (!editor) {
        return
    };  
    let config = workspace.getConfiguration("editor").get;
    let resp = await execCodetools({
        action: "codeIndentation",
        path: editor.document.uri.fsPath,
        //maxColumn: config("wordWrapColumn"),
        //tabSize: config("tabSize"),
        updates: await changedFiles()
    }); 
    if (!resp.success) { 
        return showErrorMessage("Code indentation failed => " + (resp.data ? resp.data : resp));
    };
    applyText(editor, resp.data, 0, 0); 
};

module.exports = {
    codeIndentation
}; 