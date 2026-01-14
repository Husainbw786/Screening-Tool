import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '@/services/clients.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, organizationName } = body;

    const data = await ClientService.getOrganizationById(organizationId, organizationName);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-organization API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization' },
      { status: 500 }
    );
  }
}
