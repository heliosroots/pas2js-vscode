const { CompletionItem } = require("vscode");
const { changedFiles } = require("./utils");
const { execCodetools } = require("./base");

class CodeSuggestion {
    async provideCompletionItems(document, position) {
        let resp = await execCodetools({
            action: "codeSuggestion",
            path: document.uri.fsPath,
            line: position.line + 1,
            column: position.character + 1,
            updates: await changedFiles()
        });
        if (!resp.success) {
            return [];
        };
        let suggestions = [];
        for (let item of resp.data) {                          
            suggestions.push(new CompletionItem(item, undefined));
            // TODO: kind, detail...  
        };
        return suggestions;
    };
};

module.exports = {
    CodeSuggestion
}; 