const { window } = require("vscode");
const { showListBox, applyText, changedFiles } = require("./utils");
const { execCodetools } = require("./base");

const codeRefactoringEmptyMethods = async (editor) => {
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

const codeRefactoringUnusedUnits = async (editor) => {
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

const codeRefactoring = async () => {
    let options = [
        "Remove Empty Methods",
        "Remove Unused Units"
    ];
    let index = options.indexOf(await showListBox("Select an option...", options));
    if (index < 0) {
        return
    };
    let editor = window.activeTextEditor;
    if (!editor) {
        return
    };
    switch (index) {
        case 0:
            codeRefactoringEmptyMethods(editor);
            break;
        case 1:
            codeRefactoringUnusedUnits(editor);
            break;
    };
};

module.exports = {
    codeRefactoring
};