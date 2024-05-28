// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

interface ISettings {
	previewHost: string
	previewPort: number
	position: vscode.ViewColumn
}

function strToViewColumn(viewCol: string | undefined): vscode.ViewColumn {
	switch (viewCol) {
		case 'Active':
			return vscode.ViewColumn.Active;
		case 'Beside':
			return vscode.ViewColumn.Beside;
		case 'One':
			return vscode.ViewColumn.One;
		case 'Two':
			return vscode.ViewColumn.Two;
		case 'Three':
			return vscode.ViewColumn.Three;
		case 'Four':
			return vscode.ViewColumn.Four;
		case 'Five':
			return vscode.ViewColumn.Five;
		case 'Six':
			return vscode.ViewColumn.Six;
		case 'Seven':
			return vscode.ViewColumn.Seven;
		case 'Eight':
			return vscode.ViewColumn.Eight;
		case 'Nine':
			return vscode.ViewColumn.Nine;
		default:
			return vscode.ViewColumn.Beside;
	}
}
export function getSettings(): ISettings {
	const config = vscode.workspace.getConfiguration();
	const previewHost: string = config.get('vite-vue-preview.previewHost')!;
	const previewPort: number = config.get('vite-vue-preview.previewPort')!;
	const position: string | undefined = config.get('vite-vue-preview.position');
	const positionAsViewColumn = strToViewColumn(position);
	return {
		position: positionAsViewColumn,
		previewHost,
		previewPort
	};
}
function buildUrl(fileUrl?: string): string {
	const config = getSettings();
	const prefix = `${config.previewHost}:${config.previewPort}/__preview`;
	if (!fileUrl) {
		return prefix;
	}
	return `${prefix}/${fileUrl}`;
}
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	let logger = vscode.window.createOutputChannel("vite-vue-preview");
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	vscode.workspace.onDidSaveTextDocument(async (doc) => {
		const uri = vscode.workspace.asRelativePath(doc.uri);
		const text = doc.getText();
		let includesPreview = text.includes(
			// TODO: Regex to allow other configs
			`<preview lang="md">`
		);
		if (includesPreview) {
			// check if open ....
			const config = getSettings();
			vscode.commands.executeCommand("simpleBrowser.api.open", buildUrl(uri), {
				viewColumn: config.position
			});
		}
	});
	let disposable = vscode.commands.registerCommand('vite-vue-preview.startPreview', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const config = getSettings();
		vscode.commands.executeCommand("simpleBrowser.api.open", buildUrl(), {
			viewColumn: config.position
		});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
