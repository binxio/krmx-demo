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

- WebSocket API is based on single client to server connection
  - While... server should know which other clients are available
  - While... clients should know which other clients are connected
- A WebSocket connection can be interrupted
  - While... we want to allow a client to reconnect
- WebSocket API has no addons
  - While... we want basic user features
  - While... we want custom features

## ==> `krmx` to the rescue!

---

# krmx - Architecture
<img src='/krmx-overview.png' class='h-100' />

---

# krmx - Multiple Clients
<img src='/krmx-multiple-clients.png' class='h-100' />

---

# Event Emitters
Events are emitted on key moments and are streamlined on server and client side.

<img src='/krmx-events.png' class="h-100" />

---

# Event Structure
All events have a type and payload.

<div class="flex gap-15">
<div class="flex flex-col gap-10">

```json
{
  "type": "user/joined",
  "payload": {
    "username": "simon"
  }
}
```

```json
{
  "type": "user/linked",
  "payload": {
    "username": "simon"
  }
}
```

</div>
<div class="flex flex-col gap-10">

```json
{
  "type": "user/rejected",
  "payload": {
    "reason": "invalid link request"
  }
}
```

```json {none|all}
{
  "type": "dungeon/monster",
  "payload": {
    "level": 6,
    "type": "dragon"
  }
}
```

</div>
<div class="flex flex-col gap-10">

```json {none|all}
{
  "type": "dice/roll",
  "payload": {
    "value": 4
  }
}
```

```json {none|all}
{
  "type": "card/played",
  "payload": {
    "rank": "King",
    "suit": "Hearts"
  }
}
```
</div>
</div>

<style>
pre.slidev-code {
 @apply border;
}
</style>

---

# Getting Started - Project & Server

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

```typescript {none|1-2|4-5|6-8|9-11|12|all}
// server/server.ts (https://www.npmjs.com/package/@krmx/server)
import { createServer, Props } from '@krmx/server';

const props: Props = { /* configure here */ }
const server = createServer(props);
server.on('join', (username) => {
  console.debug(`[debug] [my-app] ${username} joined!`);
});
server.on('message', (username, message) => {
  console.debug(`[debug] [my-app] ${username} sent ${message.type}`);
});
server.listen(8082);
// now start with npm run dev!
```

</div>
</div>

---

# Getting Started - Client

```bash {none|1-3|4-5|all}
# client
cd ..
npx create-next-app client --npm --ts --src-dir --eslint
cd client
npm install @krmx/client
```

```markdown {none|1-2|all}
Following instructions
1. Copy example from https://www.npmjs.com/package/@krmx/client to `src/page.tsx`
2. Add `"use client";` to top of `src/page.tsx`
3. Add `default export` to MyApp in `src/page.tsx`
4. Run `npm run dev` in `client/`
```


---

# Getting Started - Result
Now it should look a little something like this.

<div class="flex gap-10 my-15">
<div>

<img src='/krmx-basic-example-client.png' class="h-12" />

</div>
<div>

<img src='/krmx-basic-example-server.png' class="h-30" />

</div>
</div>

### Quick Start

```bash
git clone https://github.com/binxio/krmx-demo
cd krmx-demo && cat README.md
```

---

# Using Redux
Attach incoming events to a Redux store.

<div class="flex">
<div class="border-r">

```bash {none|all}
cd client
npm install @reduxjs/toolkit react-redux
```

```typescript {none|all}
import { krmxSlice } from '@krmx/client';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector
} from 'react-redux';

export const store = configureStore({
  reducer: {
    krmx: krmxSlice.reducer,
    // are your custom slice(s) here...
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState>
        = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
```

</div>
<div>

```typescript {none|all}
import { KrmxProvider } from '@krmx/client';
import { AppState, useAppDispatch } from '@/app/store';

function MyApp() {
  const [serverUrl] = useState('ws://localhost:8082');
  const dispatch = useAppDispatch();
  return (
    <KrmxProvider
      serverUrl={serverUrl}
      onMessage={dispatch}
      krmxStateSelector={(state: AppState) => state.krmx}
    >
      <MyComponent/>
    </KrmxProvider>
  );
}
```

</div>
</div>

---
layout: center
class: text-center
---

# Questions?
It's a wrap!

<div class="border mb-2 pt-2 px-2">

## Quick Start

```bash
git clone https://github.com/binxio/krmx-demo
cd krmx-demo && cat README.md
```
</div>

<div class="border mb-10 pt-2 px-2">

## Documentation
[@krmx/server on npm](https://www.npmjs.com/package/@krmx/server) · [@krmx/client on npm](https://www.npmjs.com/package/@krmx/client) · [ancient/krmx at GitHub](https://github.com/simonkarman/ancient/tree/main/krmx)

</div>

## Thank you for joining!
