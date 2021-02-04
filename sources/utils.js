const { window, workspace, tasks, Task, TaskScope, TaskRevealKind, TaskPanelKind, Location, Selection, Position, Range, Uri, ShellExecution } = require("vscode");
const { spawn } = require("child_process");

const showMessage = (message) => window.showInformationMessage(message);

const showError = (error) => window.showErrorMessage(error);

const showInputBox = (title, placeHolder, value) => window.showInputBox({
    placeHolder: placeHolder,
    prompt: title,
    value: value
});

const showListBox = (placeHolder, values) => window.showQuickPick(values, {
    matchOnDescription: true,
    placeHolder: placeHolder
});

const showFile = (fileName) => {
    return workspace.openTextDocument(fileName)
        .then((document) => {
            return window.showTextDocument(document);
        });
};

const changedFiles = () => {
    return new Promise((resolve) => {
        let files = [];
        let documents = workspace.textDocuments;
        for (let document of documents) {
            if (document.isDirty) {
                files.push({
                    path: document.fileName,
                    source: document.getText()
                });
            };
        };
        resolve(files);
    });
};

const rootFolder = () => !workspace.workspaceFolders ? undefined : workspace.workspaceFolders[0].uri.fsPath;
 
const createLocation = (path, line, column) => new Location(Uri.file(path), new Position(line, column));

const applyText = (editor, newText, newLine, newColumn) => {
    return editor.edit((builder) => {
        builder.replace(new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE), newText);
    }).then((value) => {
        // Move to
        if (newLine > -1 && newColumn > -1) {
            let position = new Position(newLine, newColumn);
            editor.selection = new Selection(position, position);
            editor.revealRange(new Range(position, position));
        };
        return value;
    });
};

const execTask = async (name, description, command, problemMatchers) => {
    let task = new Task({ type: "shell" }, TaskScope.workspace, name, description);
    task.execution = new ShellExecution(command);
    task.problemMatchers = problemMatchers;
    task.presentationOptions = {
        echo: false,
        reveal: TaskRevealKind.Always,
        panel: TaskPanelKind.Shared,
        clear: true,
        focus: false,
        showReuseMessage: false
    };
    if (tasks.taskExecutions.length === 0) {
        tasks.executeTask(task);
    };
};

const execProcess = (bin, stdin) => {
    return new Promise((resolve, reject) => {
        let stdout = "";
        let stderr = "";
        let process = spawn(bin);
        process.stdin.write(stdin, "utf8");
        process.stdin.end();
        process.stdout.on("data", (data) => {
            stdout += data.toString();
        });
        process.stderr.on("data", (data) => {
            stderr += data.toString();
        });
        process.on("close", (code) => {
            code === 0 ? resolve(stdout) : reject(stderr);
        });
    });
};

module.exports = {
    showMessage,
    showError,
    showInputBox,
    showListBox,  
    showFile,
    changedFiles,
    rootFolder, 
    createLocation, 
    applyText,
    execTask,
    execProcess
};