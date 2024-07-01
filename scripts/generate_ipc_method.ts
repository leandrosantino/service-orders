import { Project } from 'ts-morph'

const project = new Project({
    tsConfigFilePath: "./tsconfig.json",
})

const alias = '@/'
const aliasPath = 'src/'

const sourceFiles = project.addSourceFilesAtPaths("./src/services/**/*.ts")

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
                       `await ipcRenderer.invoke('${methodName}', [${parameters_}]),`)
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
        return `("${alias + absolutePath.split(aliasPath)[1]}")`;
    });
    return a
}
