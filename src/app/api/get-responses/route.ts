import { NextRequest, NextResponse } from 'next/server';
import { ResponseService } from '@/services/responses.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewId } = body;

    if (!interviewId) {
      return NextResponse.json({ error: 'Interview ID is required' }, { status: 400 });
    }

    const data = await ResponseService.getAllResponses(interviewId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-responses API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch responses' },
      { status: 500 }
    );
  }
}
