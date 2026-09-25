import { NextRequest, NextResponse } from 'next/server';

const API_KEY   = process.env.CHAT_WITH_LEAD_API_KEY;
const CLIENT_ID = process.env.CHAT_WITH_LEAD_CLIENT_ID;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      'https://api.chatwithlead.com/api/v1/chat/message',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,   // ← chatKey goes here
          Origin: request.headers.get('origin') || 'https://cornortech.com', // ← ChatWithLead requires an Origin header
        },
        body: JSON.stringify({
          message: message,
          clientId: CLIENT_ID,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('ChatWithLead error:', data);
      return NextResponse.json(
        { error: 'Chat service error' },
        { status: response.status }
      );
    }

    // ✅ Assistant reply lives at data.message.content
    return NextResponse.json({
      reply: data.data.message.content,
      conversationId: data.data.message.conversationId,
      success: true,
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // ChatWithLead's public POST API automatically tracks session logic based on origin/cookie internally or doesn't support resuming from custom frontend without their script.
    // For now, we will return an empty array to avoid crashing the widget.
    return NextResponse.json({ success: true, messages: [] });
  } catch (error) {
    console.error('Chat API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch chat history' }, { status: 500 });
  }
}