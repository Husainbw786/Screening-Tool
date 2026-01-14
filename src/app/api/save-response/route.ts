import { NextRequest, NextResponse } from 'next/server';
import { ResponseService } from '@/services/responses.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { payload, callId } = body;

    const data = await ResponseService.saveResponse(payload, callId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in save-response API:', error);
    return NextResponse.json(
      { error: 'Failed to save response' },
      { status: 500 }
    );
  }
}
