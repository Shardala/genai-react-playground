'use client';

import PromptInput from '../components/PromptInput';
import EditorPreview from '../components/EditorPreview';
import { appName, playground } from './consts';

export default function Page(){
  return (
    <main className="p-6 space-y-6">
      <div className='w-[50%] justify-self-center py-[4rem]'>
        <h1 className="text-2xl font-bold">
          {appName}
        </h1>
        <PromptInput />

        <span style={{ paddingTop: '1rem', display: 'block'}}>
          {playground}
        </span>
        <EditorPreview />
      </div>
    </main>
  );
}
