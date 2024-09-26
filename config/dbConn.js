const http = require('http');
const app = require('../server');
const { mongoConnect } = require('../services/mongo');


const PORT = process.env.PORT || 3500;

const server = http.createServer(app);


async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });

}

startServer();



