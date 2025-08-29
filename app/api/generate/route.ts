import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { missingPrompt } from '../../consts';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req){
  try{
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: missingPrompt }, { status: 400 });
    }

    const p = `You are a React + TypeScript assistant. Produce a single React functional component named Component that satisfies: ${prompt}. Return ONLY the component code.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: p }],
      temperature: 0.2
    });

    let raw = completion.choices?.[0]?.message?.content || '';
    raw = raw.replace(/^```(?:tsx|ts|jsx|js)?\n?|\n?```$/g, '');

    return NextResponse.json({ code: raw });
  }catch(e){
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
