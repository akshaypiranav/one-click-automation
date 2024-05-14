const dependencies = require("./dependencies")
const folderCreation = require("./folderCreation")

function oneclickAutomation(Tool,Language,TestRunner,DirectoryName,DirectoryPath){
    if (Tool==='selenium' && Language === 'Python'){
        if (TestRunner==='unittest'){
            dependencies.installDependenciesPython(['selenium'])
    
        }
        else if (TestRunner==='pytest'){
            dependencies.installDependenciesPython(['selenium', 'pytest'])
    
        }
        else if (TestRunner==='nose2'){
            dependencies.installDependenciesPython(['selenium', 'nose2'])
        }
    
      }else if(Tool==='playwright' && Language === 'Python'){
        if (TestRunner==='pytest'){
            dependencies.installDependenciesPython(['playwright', 'pytest'])
    
        }
        else if (TestRunner==='unittest'){
            dependencies.installDependenciesPython(['playwright'])
    
        }
        else if (TestRunner==='nose2'){
            dependencies.installDependenciesPython(['playwright', 'nose2'])
    
        }
      }

}

module.exports={
    oneclickAutomation
}