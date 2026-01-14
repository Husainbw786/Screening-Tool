import { NextRequest, NextResponse } from 'next/server';
import { InterviewService } from '@/services/interviews.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, organizationId } = body;

    console.log('GET-INTERVIEWS API CALLED:', { userId, organizationId });

    if (!userId) {
      console.log('Missing userId');
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Use empty string for organizationId if not provided
    const data = await InterviewService.getAllInterviews(userId, organizationId || '');
    
    console.log('Returning data:', data.length, 'interviews');

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-interviews API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}
