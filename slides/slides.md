---
theme: ./presentation-templates/slidev-theme-xebia
favicon: 'https://xebia.com/wp-content/themes/xebia-theme/images/favicon.png'
highlighter: shiki
lineNumbers: false
info: |
      Develop a Game with WebSockets in TypeScript - Presentation by Simon Karman. Build a simple game using a TypeScript NodeJS backend and a Typescript React frontend using the krmx library. Krmx is a custom WebSocket protocol specifically build for multiplayer game development with NodeJS backends and React frontends. Find more info on krmx here: https://www.npmjs.com/package/@krmx/server and https://www.npmjs.com/package/@krmx/client
transition: fade
title: Develop a Game with WebSockets in TypeScript
---

# Develop a game with WebSockets in TypeScript
By Simon Karman
<style>
.slidev-layout.cover h1 {
    max-width: 20rem;
    font-size: 2.5rem;
}
</style>

---

# Content

- Showcase
- WebSockets
- Krmx
- Build your own game!
  - Start from Scratch
  - My First Server
  - My First Client

---
layout: center
class: text-center
---

# Showcase
```md
Visit [http://172.168.0.2:3000]
```

---

# WebSockets

WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.

![WebSockets](https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Websocket_connection.png/220px-Websocket_connection.png)

---

# WebSocket in Node
A simple example.

<div class="flex">
<div>

```javascript {none|1|3-7|9-11|all}
let socket = new WebSocket("ws://localhost:8080/websocket/demo");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert("[message] Data received from server:", event.data);
};
```

</div>
<div>

```javascript {none|1|3|5-13|all}
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
      ws.on('error', console.error);

      ws.on('message', function message(data) {
            console.log('received: %s', data);
      });

      ws.send('something');
});
```

</div>
</div>

---

# Why isn't plain WebSocket good enough?

- API is based on single client to server connection
  - While... clients should know which other clients are connected
  - While... server should know which clients are connected
- WebSocket connection can be interrupted
  - While... we want to wait for a client to reconnect
- No features
  - While... we want basic game feature immediately

## ==> `krmx` to the rescue!

---

# krmx - Architecture
<img src='/krmx-overview.png' class='h-100' />

---

# krmx - Multiple Clients
<img src='/krmx-multiple-clients.png' class='h-100' />

---

# Connections vs Users
TODO, fix this slide and add an image.

- Linking vs Unlinking
- Authentication
- ...

---

# Getting started

<div class="flex">
<div class="border-r">

```bash {none|1-4|all}
# project
mkdir my-krmx-demo
cd my-krmx-demo
git init

# server
mkdir server
cd server
npm init -y
npm install @krmx/server typescript nodemon ts-node
touch server.ts
```

```javascript {none|all}
// server/package.json
...
"scripts": {
  "dev": "nodemon --exec \"ts-node server.ts\" server.ts"
}
...
```

</div>
<div>

```typescript {none|1-2|4-5|6-10|11-13|14|all}
// server/server.ts (https://www.npmjs.com/package/@krmx/server)
import { createServer, Props } from '@krmx/server';

const props: Props = { /* configure here */ }
const server = createServer(props);
server.on('authenticate', (username, isNewUser, reject) => {
  if (isNewUser && server.getUsers().length > 4) {
    reject('server is full');
  }
});
server.on('message', (username, message) => {
  console.debug(`[my-krmx-demo] ${username} sent ${message.type}`);
});
server.listen(8082);
```

```bash {none|all}
# client
cd ..
npx create-next-app client --npm --ts --src-dir --eslint
cd client
npm install @krmx/client
# follow instruction on
# https://www.npmjs.com/package/@krmx/client
```

</div>
</div>

---
layout: center
class: text-center
---

# Quick start!
```bash
git clone https://github.com/binxio/krmx-demo
cd krmx-demo && cat README.md
```

[@krmx/server on npm](https://www.npmjs.com/package/@krmx/server) · [@krmx/client on npm](https://www.npmjs.com/package/@krmx/client) · [GitHub](https://github.com/simonkarman/ancient/tree/main/krmx) · [Author](https://www.simonkarman.nl/)
