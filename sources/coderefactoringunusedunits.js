const { window } = require("vscode");
const { applyText, changedFiles } = require("./utils");
const { execCodetools } = require("./base");

const codeRefactoringUnusedUnits = async () => {
    let editor = window.activeTextEditor;
    if (!editor) {
        return
    };
    let resp = await execCodetools({
        action: "codeRefactoringUnusedUnits",
        path: editor.document.uri.fsPath,
        updates: await changedFiles()
    });
    if (!resp.success || !resp.data.modifield) {
        return
    };
    applyText(editor, resp.data.source, 0, 0); 
};

module.exports = {
    codeRefactoringUnusedUnits
};