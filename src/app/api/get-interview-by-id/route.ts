import { NextRequest, NextResponse } from 'next/server';
import { InterviewService } from '@/services/interviews.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewId } = body;

    if (!interviewId) {
      return NextResponse.json({ error: 'Interview ID is required' }, { status: 400 });
    }

    const data = await InterviewService.getInterviewById(interviewId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-interview-by-id API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview' },
      { status: 500 }
    );
  }
}
