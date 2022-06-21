module.exports = {
    name: 'WebSocket',
    init: () => {
        const { Logger } = require('./logger.js');
        const logger = new Logger('ScreenShot');
        const screenshot = require('screenshot-desktop');
        const ws = require('./websocket.js');

        let fps = 0;
        let fpsCount = 0;
        let screen = null;

        setInterval(() => {
            fps = fpsCount / 10;
            fpsCount = 0;

            logger.info('Current FPS: '+fps);
        }, 10000);

        setInterval(() => {
            if(ws.clients.length > 0){
                screenshot().then(img => {
                    screen = img;
                    fpsCount++;
    
                    ws.clients.forEach(c => {
                        c.send(JSON.stringify({ type: 'screen' }))
                    })
                }).catch(e => {
                    logger.error(e);
                })
            }
        }, 1000 / 15);

        require('http').createServer((req, res) => {
            res.writeHead(200, { 'content-type': 'image/jpg' });
            res.end(screen);
        }).listen(8081);
    },
    requirements: [ 'Logger', 'WebSocket' ],
}