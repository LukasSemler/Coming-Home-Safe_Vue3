import { WebSocketServer } from 'ws';

//WebsocketVariablen
let connections = [];

function wsServer(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });
  wss.on('connection', (ws) => {
    console.log('Neuer User hat sich verbunden');

    let email = ws._protocol;
    email = email.replace('|', '@');

    connections.push({ ws, email });

    connections.forEach((elem) => {
      elem.ws.send(JSON.stringify({ type: 'newConnection', data: email }));
    });

    //Wenn der WebsocketServer Nachrichten bekommt
    ws.on('message', (data) => {
      const { daten: positionData, type } = JSON.parse(data);

      if (type == 'alarm') {
        console.log('ALARM----------------------------------------------------------------');
      }

      if (type == 'alarm') {
        connections.forEach((elem) =>
          elem.ws.send(JSON.stringify({ type: 'alarm', data: positionData })),
        );
      } else if (type == 'sendPosition') {
        //console.log(`Nachrichtentyp: ${type} --> IM CASE`);

        connections.forEach((elem) =>
          elem.ws.send(JSON.stringify({ type: 'getPosition', data: positionData })),
        );
      } else if (type == 'Message') {
        console.log(type);
        console.log(positionData);
      }
    });

    //Wenn sich der User vom Websocket trennt
    ws.on('close', () => {
      console.log(`User: ${connections.find((elem) => elem.ws == ws).email} left`);

      // den anderen Verbindeungen sagen das ein User gegangen ist
      connections.forEach((elem) =>
        elem.ws.send(
          JSON.stringify({
            type: 'userLeft',
            data: connections.find((elem) => elem.ws == ws).email,
          }),
        ),
      );

      // User aus dem Array löschen
      connections = connections.filter((elem) => elem.ws != ws);
    });
  });
}

// setInterval(() => {
//   console.log('Länge: ' + connections.length);
// }, 3000);

export default wsServer;
