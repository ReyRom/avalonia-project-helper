import * as vscode from 'vscode';
import { exec } from "child_process";
import * as util from "util";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('avalonia-project-helper.createProject', async () => {

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Select folder to save project',
            canSelectFiles: false,
            canSelectFolders: true
        };
       
        var path = "";
        await vscode.window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
               path = fileUri[0].fsPath;
            }
        });

        // Ввод имени проекта
        const projectName = await vscode.window.showInputBox({
            prompt: "Enter the project name",
            placeHolder: "MyAvaloniaApp"
        });
        if (!projectName) { return; }

		// Ввод типа проекта
        const projectType = await vscode.window.showQuickPick(
            [
                {label: "avalonia.app", description:"Basic Avalonia application"}, 
                {label: "avalonia.mvvm", description:"Avalonia app with MVVM architecture"}, 
                {label: "avalonia.xplat", description:"Cross-platform Avalonia project"}
            ], 
            { placeHolder: "Select project type" }
        );
        if (!projectType) { return; }

        // Выбор версии .NET
        const dotnetVersion = await vscode.window.showQuickPick(
            ["net9.0", "net8.0"], 
            { placeHolder: "Select .NET version" }
        );
        if (!dotnetVersion) { return; }
		
		
		var mvvmFramework;
		var removeViewLocator;
		if (projectType.label === "avalonia.mvvm" || projectType.label === "avalonia.xplat"){
			// Выбор MVVM-фреймворка
			mvvmFramework = await vscode.window.showQuickPick(
				["CommunityToolkit", "ReactiveUI"], 
				{ placeHolder: "Select MVVM framework" }
			);
			if (!mvvmFramework) { return; }

			// Удалить ViewLocator
			removeViewLocator = await vscode.window.showQuickPick(
				[
                    {label:"false", description:"Use default ViewLocator by Avalonia Team"}, 
                    {label:"true", description:"Use custom ViewLocator"}
                ], 
				{ placeHolder: "Remove ViewLocator?" }
			);
			if (!removeViewLocator) { return; }
		}
        
		// Скомпилированные привязки
        const compiledBindings = await vscode.window.showQuickPick(
            [
                {label:"false", description:"Use default bindings"}, 
                {label:"true", description:"Use compiled bindings (If binding property to is not found throws compile-time error)"}
            ], 
            { placeHolder: "Use compiled bindings?" }
        );
        if (!compiledBindings) { return; }



        // Формирование команды
        let command = `dotnet new ${projectType.label} -o ${projectName} -f ${dotnetVersion} -cb ${compiledBindings.label}`;
        if (mvvmFramework) {
            command += ` -m ${mvvmFramework}`;
        }
		if (removeViewLocator){
			command += ` -rvl ${removeViewLocator.label}`;
		}

        const execPromise = util.promisify(exec);

        // Запуск команды
        await vscode.window.withProgress(
        {
            location: vscode.ProgressLocation.Window, // Индикатор в строке состояния
            title: "Execute command: ",
            cancellable: false
        },
        async (progress) => {
            try{
                progress.report({ message: `Creating project...` });
                await execPromise(`cd ${path} && ${command}`);
                progress.report({ message: "Open project..." });
                let uri = vscode.Uri.file(`${path}/${projectName}`);
                await vscode.commands.executeCommand(`vscode.openFolder`,uri);
            }catch (error) {
                await vscode.window.showErrorMessage(`Error while command executing: ${error}`);
            }
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
