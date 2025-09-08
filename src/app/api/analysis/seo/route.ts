import { NextResponse } from 'next/server';
import { analyzeSEO } from '@/lib/analysis-utils';

export async function GET() {
  try {
    const seoData = await analyzeSEO();
    return NextResponse.json(seoData);
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return NextResponse.json({ 
      score: 0,
      issues: {
        critical: [],
        warnings: [],
        passed: []
      },
      meta: {
        title: false,
        description: false,
        keywords: false,
        ogTags: false,
        twitterCards: false
      },
      content: {
        headingsStructure: false,
        imagesWithAlt: 0,
        imagesWithoutAlt: 0,
        linksWithTitle: 0,
        linksWithoutTitle: 0,
        textLength: 0,
        keywordDensity: 0
      },
      technical: {
        robots: false,
        sitemap: false,
        canonical: false,
        schema: false,
        ssl: false,
        mobileResponsive: false
      }
    }, { status: 500 });
  }
}