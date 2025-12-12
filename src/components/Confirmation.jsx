import React from 'react';

export default function Confirmation({ data, back, next }) {
  return (
    <div>
      <h2>Check your input:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={back}>Back</button>
      <button onClick={next}>Generate Config</button>
    </div>
  );
}