let data = {
    clients: [],
    name: 'WebSocket',
    init: () => {
        const ws = require('ws');
        const { Logger } = require('./logger.js')
        const logger = new Logger('WebSocket');

        let server = new ws.Server({ port: 8080 });
        this.server = server;

        server.on('connection', socket => {
            logger.info('Client Connected');
            data.clients.push(socket);

            socket.on('message', message => {
                logger.info('Message Received:', message);
            })

            socket.on('close', () => {
                logger.info('Client Disconnected');
                data.clients = data.clients.filter(x => x !== socket);
            })
        })
    },
    requirements: [ 'Logger' ],
}

module.exports = data