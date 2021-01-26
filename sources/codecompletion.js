const { window } = require("vscode");
const { applyText, changedFiles } = require("./utils");
const { execCodetools } = require("./base");

const codeCompletion = async () => {
    let editor = window.activeTextEditor;
    if (!editor) {
        return
    };
    let resp = await execCodetools({
        action: "codeCompletion", 
        path: editor.document.uri.fsPath,
        line: editor.selection.anchor.line + 1,
        column: editor.selection.anchor.character + 1,
        updates: await changedFiles()
    });
    if (!resp.success) {
        return
    }; 
    applyText(editor, resp.data.source, resp.data.line - 1, resp.data.column - 1);
};

module.exports = {
    codeCompletion
};