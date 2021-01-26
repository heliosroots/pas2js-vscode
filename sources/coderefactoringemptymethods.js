const { window } = require("vscode");
const { applyText, changedFiles } = require("./utils");
const { execCodetools } = require("./base");

const codeRefactoringEmptyMethods = async () => {
    let editor = window.activeTextEditor;
    if (!editor) {
        return
    };
    let resp = await execCodetools({
        action: "codeRefactoringEmptyMethods",
        path: editor.document.uri.fsPath,
        line: editor.selection.anchor.line + 1,
        column: editor.selection.anchor.character + 1,
        updates: await changedFiles()
    });
    if (!resp.success || !resp.data.modifield) {
        return
    };
    applyText(editor, resp.data.source, 0, 0); 
};

module.exports = {
    codeRefactoringEmptyMethods
};