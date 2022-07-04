const fs = require('fs');
const http = require('http');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('HTML file name?', function (htmlName) {
    rl.question('JSON file name? ', function (jsonName) {
        fs.readFile(`./${htmlName}.html`, {encoding: 'utf-8'}, (err, data) => {
            fs.readFile(`./${jsonName}.json`, { encoding: 'utf-8' }, (err, json) => {
                const settings = JSON.parse(json);
                let newData = data;
                Object.keys(settings).forEach(key => {
                    const regex = RegExp(`{{${key}}}`);
                    newData = newData.replace(regex, settings[key]);
                });
                fs.writeFile(`./${htmlName}2.html`, newData, { encoding: 'utf-8'}, () => {
                    rl.close();
                });
            });
        });
    });
});

rl.on('close', function () {
    const server = http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        html = fs.readFileSync('./index2.html');
        res.end(html)
    });

    server.listen(3000, () => {
        console.log(`Server running on localhost:3000`);
    });
});
