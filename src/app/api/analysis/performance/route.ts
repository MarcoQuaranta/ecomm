import { NextResponse } from 'next/server';
import { measureBasicPerformance } from '@/lib/analysis-utils';

export async function GET() {
  try {
    const performanceData = await measureBasicPerformance();
    return NextResponse.json(performanceData);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json({ error: 'Failed to fetch performance data' }, { status: 500 });
  }
}