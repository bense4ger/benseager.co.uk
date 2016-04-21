const http = require('http');
const static = require('node-static');

const PORT = 8080;
const file = new static.Server('./');

http.createServer((req, res) => {
    req.addListener('end', () => {
        file.serve(req, res);
    })
    .resume();
})
.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});