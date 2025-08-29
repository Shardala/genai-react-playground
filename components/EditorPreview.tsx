'use client';
import { useEffect, useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

const defaultCode = `import React from 'react'; export default function Component(){ return <div style={{padding:12}}><button style={{background: 'red'}}>{'counter: 0'}</button></div>; }`;

export default function EditorPreview(){
  const [code, setCode] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('ai_playground_code') || defaultCode) : defaultCode);

  useEffect(()=>{
    const handler = ()=> setCode(localStorage.getItem('ai_playground_code') || defaultCode);
    window.addEventListener('ai_playground:update', handler);
    return ()=> window.removeEventListener('ai_playground:update', handler);
  },[]);

  const files = {
    '/App.tsx': { code: `import React from 'react'; import Component from './Component'; export default function App(){ return <div style={{padding:12}}><Component/></div>; }`, active: true },
    '/Component.tsx': { code, active: false },
    '/styles.css': { code: 'body{ font-family: Inter, system-ui, sans-serif; }' }
  };

  return (
    <div style={{borderRadius:12, overflow:'hidden', marginTop: '1rem'}}>
      <Sandpack template="react" files={files} options={{ showLineNumbers: true, showConsole: true, editorWidthPercentage: 60 }} />
    </div>
  );
}
