import { NextRequest, NextResponse } from 'next/server';
import { InterviewerService } from '@/services/interviewers.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewerId } = body;

    if (!interviewerId) {
      return NextResponse.json({ error: 'Interviewer ID is required' }, { status: 400 });
    }

    const data = await InterviewerService.getInterviewer(interviewerId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-interviewer API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviewer' },
      { status: 500 }
    );
  }
}
