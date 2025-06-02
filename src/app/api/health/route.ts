import { NextResponse } from 'next/server';
import { logger } from '@/logger';

export async function GET() {
    logger.verbose('I am alive');

    return new NextResponse('I am alive', { status: 200 });
}
