const { window, workspace, tasks, Task, TaskScope, TaskRevealKind, TaskPanelKind, Location, Selection, Position, Range, Uri, ShellExecution } = require("vscode");
const { spawn } = require("child_process");

const log = console.log;

const showMessage = (message) => {
    window.showInformationMessage(message);
};

const showErrorMessage = (error) => {
    window.showErrorMessage(error)
};

const showInputBox = (prompt, placeHolder, value) => {
    return window.showInputBox({
        placeHolder: placeHolder,
        prompt: prompt,
        value: value
    });
};

const showQuickPick = (placeHolder, values) => {
    return window.showQuickPick(values, {
        matchOnDescription: true,
        placeHolder: placeHolder
    });
};

const applyText = (editor, text, newLine, newColumn) => {
    return editor.edit((builder) => {
        builder.replace(new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE), text);
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

const createLocation = (path, line, column) => {
    return new Location(Uri.file(path), new Position(line, column));
};

const openFile = (fileName) => {
    return workspace.openTextDocument(fileName)
        .then((doc) => {
            return window.showTextDocument(doc);
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

const rootDir = () => {
    return workspace.workspaceFolders === undefined ? "" : workspace.workspaceFolders[0].uri.fsPath;
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

const execTask = async (name, description, cmd, problemMatchers) => {
    let task = new Task(
        { type: "shell" },
        TaskScope.workspace,
        name,
        description,
        new ShellExecution(cmd),
        problemMatchers
    );
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

module.exports = {
    log,
    showMessage,
    showErrorMessage,
    showInputBox,
    showQuickPick,
    applyText,
    createLocation,
    openFile,
    changedFiles,
    rootDir,
    execProcess,
    execTask
};