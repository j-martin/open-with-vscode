'use strict';

import * as vscode from 'vscode';
import * as child from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('open-with.open', (command: string) => {
    if (!command) {
      vscode.window.setStatusBarMessage("No command specified.");
      return;
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

    vscode.window.setStatusBarMessage(`Opening: ${cmd}`);
    child.exec(cmd);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}
