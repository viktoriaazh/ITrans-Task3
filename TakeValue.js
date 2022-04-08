const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const takeValue = (question) => {
    return new Promise((res, rej) => {
        const rl = readline.createInterface({ input, output });
        rl.question(question, (answer) => {
            rl.close();
            res(answer);
        })
    })
}

module.exports = takeValue;