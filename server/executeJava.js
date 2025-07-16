const path = require('path');
const { exec } = require('child_process');

const executeJava = async (filepath) => {
    const dir = path.dirname(filepath);
    return new Promise((resolve, reject) => {
        exec(
            `javac Main.java && java -cp "${dir}" Main`,
            { cwd: dir },
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeJava,
};
