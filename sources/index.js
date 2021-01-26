const { languages, commands, workspace } = require("vscode");
const { log } = require("./utils");
const { updateSettings } = require("./base"); 
const { projectNew } = require("./projectnew");
const { projectBuild } = require("./projectbuild");  
const { projectLoadSettings } = require("./projectload");
const { codeCompletion } = require("./codecompletion");
const { CodeDefinition } = require("./codedefinition");
const { codeIndentation } = require("./codeindentation");
const { codeRefactoring } = require("./coderefactoring");
const { CodeSuggestion } = require("./codesuggestion"); 

const activate = (context) => {
    log("Pas2JS-VSCode active");

    // update
    updateSettings();

    // events
    context.subscriptions.push([
        workspace.onDidChangeConfiguration(() => {
            updateSettings();
        }),
    ]);

    // command
    context.subscriptions.push([
        commands.registerCommand("pas2js.projectNew", projectNew),
        commands.registerCommand("pas2js.projectBuild", projectBuild),
        commands.registerCommand("pas2js.projectLoadSettings", projectLoadSettings), 
        commands.registerCommand('pas2js.codeCompletion', codeCompletion),
        commands.registerCommand('pas2js.codeIndentation', codeIndentation),
        commands.registerCommand('pas2js.codeRefactoring', codeRefactoring)
    ]);

    // language
    let language = "objectpascal";
    context.subscriptions.push([
        languages.registerDefinitionProvider(language, new CodeDefinition),
        languages.registerCompletionItemProvider(language, new CodeSuggestion, ".")
    ]);
};

const deactivate = () => { };

module.exports = {
    activate,
    deactivate
};