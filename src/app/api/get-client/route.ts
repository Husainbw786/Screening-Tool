import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '@/services/clients.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, organizationId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const data = await ClientService.getClientById(userId, email, organizationId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-client API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client data' },
      { status: 500 }
    );
  }
}
