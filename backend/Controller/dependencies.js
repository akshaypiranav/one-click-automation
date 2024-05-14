const { spawn } = require('child_process');

function installDependenciesPython(packages) {
    const command = ['pip', 'install', ...packages];

    const cmdProcess = spawn('cmd', ['/c', command.join(' ')], { shell: true });

    cmdProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    cmdProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    cmdProcess.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
}

module.exports={
    installDependenciesPython
}