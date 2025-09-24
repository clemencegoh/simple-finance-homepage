import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account_id, initial_balance } = body;

    const res = await fetch('http://localhost:8860/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id, initial_balance }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      return NextResponse.json(
        { message: errorData || 'Failed to create account' },
        { status: res.status }
      );
    }

    const newAccount = await res.json();
    return NextResponse.json(newAccount);
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
