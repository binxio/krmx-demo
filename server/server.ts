import { createServer, Props } from '@krmx/server';

const props: Props = { /* configure here */ }
const server = createServer(props);
server.on('authenticate', (username, isNewUser, reject) => {
  if (isNewUser && server.getUsers().length > 4) {
    reject('server is full');
  }
});
server.on('message', (username, message) => {
  console.debug(`[debug] [my-app] ${username} sent ${message.type}`);
});
server.listen(8082);
