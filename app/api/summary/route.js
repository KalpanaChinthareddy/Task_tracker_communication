import { NextResponse } from 'next/server';
import openai from '@/app/lib/openaiclient'; 

export async function POST(request) {
  const { content } = await request.json();

  try {
    // Fetch summarization from AI model
    const response = await openai.Completion.create({
      model: "text-davinci-003", 
      prompt: `Summarize the following project and task details: ${content}`,
      max_tokens: 100,
    });
    
    const summary = response.choices[0].text.trim();
    
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: 'Summarization failed' }, { status: 500 });
  }
}


