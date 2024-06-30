import { Project } from 'ts-morph';

const project = new Project({
    tsConfigFilePath: "./tsconfig.json",
});

const sourceFiles = project.addSourceFilesAtPaths("./src/services/**/*.ts");

let script:string = 'import { ipcRenderer } from "electron" \n export const invokeMethods = {'

sourceFiles.forEach(sourceFile => {
    const classes = sourceFile.getClasses();
    classes.forEach(cls => {
        const className = cls.getName();
        if (!className) return;

        const methods = cls.getMethods();

        const functions = methods.map(method => {
            const methodName = method.getName();
            const returnType = method.getReturnType().getText();
            const parameters = method.getParameters().map(param => {
                const paramName = param.getName();
                const paramType = param.getType().getText();
                return `${paramName}: ${paramType}`;
            }).join(", ");
            const parameters_ = method.getParameters().map(param => param.getName()).join(", ");

            return `    async ${methodName}(${parameters}): Promise<${returnType}> { return await ipcRenderer.invoke('${methodName}', [${parameters_}]) },`;
        }).join("\n");

        script += `${functions}\n`

    });
});

script += '\n}'

const newSourceFile = project.createSourceFile(`generated/MethodsIPC.ts`, script, { overwrite: true });
newSourceFile.saveSync();

console.log("Functions generated successfully.");
