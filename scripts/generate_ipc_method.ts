import { Project } from 'ts-morph'
import * as path from 'path';

const project = new Project({
    tsConfigFilePath: "./tsconfig.json",
})

const sourceFiles = project.addSourceFilesAtPaths("./src/services/**/*.ts")

const alias = '@/'
const aliasPath = './src/*'

let script:string = 'import { ipcRenderer } from "electron" \nexport const invokeMethods = {\n'

sourceFiles.forEach(sourceFile => {
    const classes = sourceFile.getClasses()
    classes.forEach(cls => {
        const className = cls.getName()
        if (!className) return

        const methods = cls.getMethods()

        const functions = []
        for (const method of methods) {
            const decorator = method.getDecorators().find(decorator => decorator.getName() == 'IpcChannel')

            if(decorator && method.isAsync()){
                const methodName = method.getName()
                const returnType = getRelativeType(method.getReturnType().getText())

                const parameters = method.getParameters().map(param => {
                    const paramName = param.getName()
                    const paramType = getRelativeType(param.getType().getText())
                    return `${paramName}: ${paramType}`
                }).join(', ')

                const parameters_ = method.getParameters().map(param => param.getName()).join(", ")

                functions.push(`${' '.repeat(4)}${methodName}: async (${parameters}):${returnType} =>`+
                       ` await ipcRenderer.invoke('${methodName}', ${parameters_}),`)
            }
        }

        if(functions.length > 0){
            const _className = className.split('')
            _className[0] = _className[0].toLocaleLowerCase()
            script += `${' '.repeat(2)}${_className.join('')}:{\n${functions.join("\n")}\n${' '.repeat(2)}},\n`
        }

    });
});

script += '\n}'

const newSourceFile = project.createSourceFile(`./src/infra/ipcInvoke.ts`, script, { overwrite: true })
newSourceFile.saveSync()

console.log("Functions generated successfully.")

function getRelativeType(typeText: string): string {
    const a = typeText.replace(/\("(.+?)"\)/g, (_, absolutePath) => {
        return `("${replacePathAlias(absolutePath, aliasPath.replaceAll('*', ''), alias)}")`
    });
    return a
}

function replacePathAlias(filePath: string, toReplace: string, alias: string): string {
    const normalizedFilePath = path.normalize(filePath);
    const normalizedToReplace = path.normalize(toReplace);

    const index = normalizedFilePath.indexOf(normalizedToReplace);
    if (index === -1) {
        throw new Error(`O caminho "${normalizedFilePath}" não contém a string para substituição "${normalizedToReplace}".`);
    }

    const newPath = normalizedFilePath.substring(index + normalizedToReplace.length);
    const resultPath = path.join(alias, newPath);

    return resultPath.replace(/\\/g, '/');
}
