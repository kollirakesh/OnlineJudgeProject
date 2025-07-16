const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');

const outputPath = path.join(__dirname, 'outputs');//this directory folder will take you till root folder suc as till/compiler/cbackend we are appending codes to that /compiler/cbackend/codes

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath) => { //C:\Users\Rakesh Kolli\OneDrive\Desktop\algo_auth\compiler\cbackend\codes\05c90dac-0770-4d83-b05d-77dccb804db9.cpp
    const jobId = path.basename(filepath).split(".")[0]; //05c90dac-0770-4d83-b05d-77dccb804db9" 
    const output_filename = `${jobId}.exe`;//05c90dac-0770-4d83-b05d-77dccb804db9.exe
    const outPath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        exec(`g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "${outPath}"`,
            (error, stdout, stderr) => {
            //      console.log("STDOUT:", stdout);
            // console.log("STDERR:", stderr);
            // console.log("ERROR:", error);
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
    executeCpp,
};