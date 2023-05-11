const NotificationService = require('../business/notification_service');

const { Server } = require("ws");
const sockserver = new Server({ port: 5001 });

//When new client connected
sockserver.on("connection", (ws) => {
    console.log("new client connected!");
    for (const client of sockserver.clients) {
        // client.send("true");
    }
    ws.on("message", (data) => { console.log(data.toString()) });
    ws.on("close", () => console.log("client has disconnected!"));
});

// setInterval(() => {
//     sockserver.clients.forEach((client) => {
//         stream.pipe(process.stdout);
//         // console.log(stream)
//         client.send(stream.toString())
//     });
// }, 1000);

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData() {
    for (const client of sockserver.clients) {
        var service = new NotificationService();
        var data = await service.getServerLogCount();
        client.send(data.data);
    }
};

function sendData(data) {
    for (const client of sockserver.clients) {
        // console.log("send data: ", data)
        client.send(JSON.stringify(data));
    }
    // console.log(data);
}

setInterval(() => {

}, 1000);


// setInterval(() => {
//     sockserver.clients.forEach((client) => {
//         const data = JSON.stringify({ "type": "time", "time": new Date().toTimeString() });
//         client.send(data);
//     });
// }, 1000);

// setInterval(() => {
//     sockserver.clients.forEach((client) => {
//         const messages = ['Hello', 'What do you ponder?', 'Thank you for your time', 'Be Mindful', 'Thank You'];
//         const random = Math.floor(Math.random() * messages.length);
//         let position = { x: Math.floor(Math.random() * 200), y: Math.floor(Math.random() * 150) }
//         const data = JSON.stringify({ 'type': 'message', 'message': messages[random], 'position': position });
//         client.send(data);
//     });
// }, 8000);


module.exports = { Server, sendData };