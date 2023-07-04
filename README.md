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

### Optional: Using docker
If you don't have or don't want to install (specific versions of) npm, npx, TypeScript or git on your machine. You can use the provided docker image in this repository for development purposes.

> Note: this setup is slightly more complex as it requires running a Docker image. If you already have npm, npx, TypeScript and git installed on your machine, then you can choose to skip this step.

```bash
docker build . -t krmx-demo-worker && docker run --rm --entrypoint /bin/bash -it -v $(pwd):/app krmx-demo-worker
```

### Running the components
Now you can run the `slides` and `server` and `client`.

For slides:
```bash
cd slides
npm install
npm run dev
# open slides on localhost:3030
```

For server:
```bash
cd server
npm install
npm run dev
```

For client:
```bash
cd client
npm install
npm run dev
# open client on localhost:3000
```

## Issues
If you have any questions, feedback, or want to file a bug report then please create a ticket here: [krmx-demo/issues](https://github.com/binxio/krmx-demo/issues)! You can also contact the original author: [Simon Karman](https://www.simonkarman.nl/). 
