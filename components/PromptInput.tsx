'use client';

import { useState } from 'react';
import { generateTxt, generating, noCodeReturned } from '../app/consts';

export default function PromptInput(){
  const [q, setQ] = useState('Create a red button that increments a counter');
  const [loading, setLoading] = useState(false);

  const generate = async ()=>{
    setLoading(true);

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: q })
    });

    const data = await res.json();

    if (data.code) {
      localStorage.setItem('ai_playground_code', data.code);
      window.dispatchEvent(new Event('ai_playground:update'));
    } else {
      alert(data.error || noCodeReturned);
    }

    setLoading(false);
  };

  return (
    <div className="flex py-5">
      <input value={q} onChange={(e)=>setQ(e.target.value)} className="flex-1 input-area flex items-center justify-start gap-6 space-y-3 p-6 bg-black/20 rounded-l-lg border border-deactive" />
      <button onClick={generate} className="bg-slate-500 hover:bg-slate-600 cursor-pointer text-white px-8 py-2 rounded-r-lg">
        {loading ? generating : generateTxt}
      </button>
    </div>
  );
}
