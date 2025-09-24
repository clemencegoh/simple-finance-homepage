import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { source_account_id, destination_account_id, amount } = body;

    const reqBody = JSON.stringify({ source_account_id, destination_account_id, amount });

    const res = await fetch('http://localhost:8860/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: reqBody,
    });


    if (!res.ok) {
      const errorData = await res.text();
      return NextResponse.json(
        { message: errorData || 'Failed to create transaction' },
        { status: res.status }
      );
    }
    
    // Returning the body instead of response - Discovered that response doesn't actually return a body but just 200 OK
    return NextResponse.json(body);
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
