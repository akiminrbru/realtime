const ws = require('ws');

const wss = new ws.Server({
    port: 5000
}, () => console.log('Сервер запушен на порту: 5000...'));

wss.on('connection', function connection(ws) {
    ws.on('message', function(message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    });
});

const message = {
    event: 'message/connection',
    id: 123,
    date: '21.03.2021',
    username: 'oleg',
    message: 'приветик'
}

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}