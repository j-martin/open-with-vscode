"use strict";

import * as vscode from "vscode";
import * as child from "child_process";
import * as path from "path";

const commands: { [key: string]: string } = {
  "Emacs (Client)": "emacsclient +{line}:{column} '{filename}'",
  Sublime: "subl '{filename}:{line}:{column}'",
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "open-with.open",
    async (command: string) => {
      if (!command) {
        let i = 0;
        const result = await vscode.window.showQuickPick(
          Object.keys(commands),
          {
            placeHolder: "one, two or three",
            onDidSelectItem: (item) =>
              vscode.window.showInformationMessage(`Focus ${++i}: ${item}`),
          }
        );
        if (!result) {
          return;
        }
        command = commands[result];
      }
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.setStatusBarMessage("No active editor.");
        return;
      }
      const position = editor.selection.active;
      const cmd = command
        .replace("{filename}", editor.document.fileName)
        .replace("{dir}", path.dirname(editor.document.fileName))
        .replace("{line}", `${position.line + 1}`)
        .replace("{column}", `${position.character + 1}`);

      vscode.window.setStatusBarMessage(`Launching: ${cmd}`);
      try {
        child.exec(cmd);
      } catch (error) {
        vscode.window.setStatusBarMessage(`Error running ${cmd}: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
