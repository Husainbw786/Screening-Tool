import { NextRequest, NextResponse } from 'next/server';
import { InterviewerService } from '@/services/interviewers.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    const data = await InterviewerService.getAllInterviewers(userId || '');

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-interviewers API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviewers' },
      { status: 500 }
    );
  }
}
