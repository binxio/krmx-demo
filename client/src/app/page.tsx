"use client";

export default function Home() {
  return <main>
    <h1 className='border-b px-4 py-2 text-lg font-bold'>My First Krmx Game!</h1>
    <div className='px-4 py-2'>
      <MyApp />
    </div>
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
    return <p className='text-red-800'>No connection to the server...</p>;
  }
  if (!isLinked) {
    // Your logic for linking your connection with a user goes here
    return (<>
      <h2 className='mb-1'>Join server as</h2>
      <div className='flex gap-2 mb-1'>
        {['david', 'hernani', 'koen', 'sander', 'simon', '!nv@liD'].map(name => (
          <button key={name} className='border px-2 py-1 rounded' onClick={() => link(name)}>{name}</button>
        ))}
      </div>
      {rejectionReason && <p className='text-red-800'>Rejected: {rejectionReason}</p>}
    </>);
  }
  // Your logic for when you're ready to go goes here
  return (
    <>
      <p className='mb-1'>
        Welcome <strong>{username}</strong>!
      </p>
      <div className='flex gap-2'>
        <button className='border px-2 py-1 rounded' onClick={() => send({ type: 'custom/hello' })}>Send custom/hello</button>
        <button className='border px-2 py-1 rounded' onClick={leave}>Leave</button>
      </div>
      <h2 className='mt-2 mb-1'>Users</h2>
      <ul>
        {Object.entries(users)
          .map(([otherUsername, { isLinked }]) => (
            <li key={otherUsername}>
              {isLinked ? '🟢' : '🔴'} {otherUsername}
            </li>)
          )}
      </ul>
    </>
  );
}
