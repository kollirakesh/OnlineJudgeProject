const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const output_filename = `${jobId}.out`;
    const outPath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        exec(`gcc "${filepath}" -o "${outPath}" && "${outPath}"`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            });
    });
};

module.exports = {
    executeC,
};
