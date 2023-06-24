"use client";

export default function Home() {
  return <main>
    <h1>My App</h1>
    <MyApp />
  </main>
};
import {KrmxProviderWithStore, useKrmx} from '@krmx/client';
import {useState} from 'react';

const { Krmx } = KrmxProviderWithStore();

function MyApp() {
  const [serverUrl] = useState('ws://localhost:8082');
  return (
    <Krmx
      serverUrl={serverUrl}
      onMessage={(message) => console.info(message)}
    >
      <MyComponent/>
    </Krmx>
  );
}
function MyComponent() {
  const { isConnected, isLinked, link, rejectionReason, send, leave, users, username } = useKrmx();
  if (!isConnected) {
    // Your logic for when you're not connected to the server goes here
    return <p>No connection to the server...</p>;
  }
  if (!isLinked) {
    // Your logic for linking your connection with a user goes here
    return (
      <div>
        <button onClick={() => link('simon')}>Join!</button>
        {rejectionReason && <p>Rejected: {rejectionReason}</p>}
      </div>
    );
  }
  // Your logic for when you're ready to go goes here
  return (
    <div>
      <p>
        Welcome <strong>{username}</strong>!
      </p>
      <button onClick={() => send({ type: 'custom/hello' })}>Send custom/hello</button>
      <button onClick={leave}>Leave</button>
      <h2>Users</h2>
      <ul>
        {Object.entries(users)
          .map(([otherUsername, { isLinked }]) => (
            <li key={otherUsername}>
              {isLinked ? '🟢' : '🔴'} {otherUsername}
            </li>)
          )}
      </ul>
    </div>
  );
}
