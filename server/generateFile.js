const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes');//this directory folder will take you till root folder suc as till/compiler/cbackend we are appending codes to that /compiler/cbackend/codes

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (language, code) => {
    const jobId = uuid();
    let filename;
    let finalCode = code;
    if (language === 'java') {
        filename = `Main.java`;
        // Replace any public class name with Main
        finalCode = code.replace(/public\s+class\s+\w+/g, 'public class Main');
    } else {
        filename = `${jobId}.${language}`;
    }
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, finalCode);
    return filepath;
};

module.exports = {
    generateFile,
};