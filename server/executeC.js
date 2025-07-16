const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = async (filepath, input = "") => {
    const jobId = path.basename(filepath).split(".")[0];
    const output_filename = `${jobId}.exe`;
    const outPath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        // Compile
        exec(`gcc "${filepath}" -o "${outPath}"`, (compileErr, _, compileStderr) => {
            if (compileErr) {
                return reject(compileStderr || compileErr.message);
            }
            // Run
            const run = spawn(outPath, [], { stdio: ['pipe', 'pipe', 'pipe'] });
            let stdout = '';
            let stderr = '';

            run.stdout.on('data', (data) => {
                stdout += data.toString();
            });
            run.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            run.on('error', (err) => {
                reject(err.message);
            });
            run.on('close', (code) => {
                if (code !== 0) {
                    return reject(stderr || `Process exited with code ${code}`);
                }
                resolve(stdout);
            });

            if (input) {
                run.stdin.write(input);
            }
            run.stdin.end();
        });
    });
};

module.exports = {
    executeC,
};
