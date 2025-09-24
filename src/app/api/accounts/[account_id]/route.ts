import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { account_id: string } }
) {
  try {
    const { account_id } = await params;

    const res = await fetch(`http://localhost:8860/accounts/${account_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      return NextResponse.json(
        { message: errorData || 'Failed to retrieve account' },
        { status: res.status }
      );
    }

    const account = await res.json();
    return NextResponse.json(account);
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
