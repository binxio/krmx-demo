# Develop a Game with WebSockets in TypeScript
Demo for the XKE session on 'Develop a Game with WebSockets in TypeScript'.

Build a simple game using a TypeScript NodeJS backend and a Typescript React frontend using the krmx library. Krmx is a custom WebSocket protocol specifically build for multiplayer game development with NodeJS backends and React frontends.

## Resources
[@krmx/server on npm](https://www.npmjs.com/package/@krmx/server) · [@krmx/client on npm](https://www.npmjs.com/package/@krmx/client) · [krmx at GitHub](https://github.com/simonkarman/ancient/tree/main/krmx)

## Getting started
This section explains how to get started with using this repository.

First you need to download the required git submodules using the following commands.
```bash
git submodules init
git submodule update
```

## Running the components
Now you can separately run the `slides` and `server` and `client` in their respective directories..

### Slides
The interactive presentation slides. If you make changes to the slides.md, the slides will automatically update.

```bash
cd slides
npm install
npm run dev
# open slides on localhost:3030
```

### Server
The simple server. If you make changes to the server code, the server will automatically restart.

```bash
cd server
npm install
npm run dev
```

### Client
The simple client, including redux. If you make changes to the client code, the client will automatically update.

```bash
cd client
npm install
npm run dev
# open client on localhost:3000
```

## Issues
If you have any questions, feedback, or want to file a bug report then please create a ticket here: [krmx-demo/issues](https://github.com/binxio/krmx-demo/issues)! You can also contact the original author: [Simon Karman](https://www.simonkarman.nl/). 
