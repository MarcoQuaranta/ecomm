import { NextResponse } from 'next/server';
import { getColorScheme, updateColorScheme, ColorScheme } from '@/lib/db';

export async function GET() {
  try {
    const colors = await getColorScheme();
    return NextResponse.json(colors);
  } catch (error) {
    console.error('Error fetching color scheme:', error);
    return NextResponse.json({ error: 'Failed to fetch color scheme' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const colors: ColorScheme = await request.json();
    
    // Validate that all required colors are present
    const requiredFields = [
      'primary', 'secondary', 'header', 'footer',
      'buttonPrimary', 'buttonSecondary', 'success', 'danger',
      'warning', 'info', 'text', 'textLight', 'background', 'cardBg'
    ];
    
    for (const field of requiredFields) {
      if (!colors[field as keyof ColorScheme]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    const updatedColors = await updateColorScheme(colors);
    return NextResponse.json(updatedColors);
  } catch (error) {
    console.error('Error updating color scheme:', error);
    return NextResponse.json({ error: 'Failed to update color scheme' }, { status: 500 });
  }
}