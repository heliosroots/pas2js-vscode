const { languages, commands, workspace } = require("vscode"); 
const { updateSettings } = require("./base"); 
const { projectBuild } = require("./projectbuild");  
const { projectNew } = require("./projectnew");
const { projectLoad } = require("./projectload");
const { codeCompletion } = require("./codecompletion");
const { CodeDefinition } = require("./codedefinition");
const { codeIndentation } = require("./codeindentation");
const { codeRefactoring } = require("./coderefactoring");
const { CodeSuggestion } = require("./codesuggestion"); 

const activate = (context) => { 
    console.log("Pas2JS-VSCode active");

    // Initialize
    updateSettings();
    projectLoad();

    // events
    context.subscriptions.push([
        workspace.onDidChangeConfiguration(() => {
            updateSettings();
        }),
    ]);

    // command
    context.subscriptions.push([
        commands.registerCommand("pas2js.projectBuild", projectBuild),
        commands.registerCommand("pas2js.projectLoad", projectLoad), 
        commands.registerCommand("pas2js.projectNew", projectNew),
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