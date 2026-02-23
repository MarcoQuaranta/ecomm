import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, networkParams, formData } = body;

    if (!endpoint) {
      return NextResponse.json({ error: 'No endpoint' }, { status: 400 });
    }

    // Get client IP from headers (forwarded by Vercel/proxy)
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // Get User-Agent from client-provided value or request headers
    const clientUa = formData?.ua || req.headers.get('user-agent') || '';

    // Build form-urlencoded body with the network's expected field names
    const params = new URLSearchParams();
    params.append('uid', networkParams?.uid || '');
    params.append('key', networkParams?.key || '');
    params.append('offer', networkParams?.offerId || '');
    params.append('lp', networkParams?.lpId || '');
    params.append('name', formData?.name || '');
    params.append('street-address', formData?.address || '');
    params.append('tel', formData?.phone || '');

    // Fingerprint (tmfp) or IP+UA fallback
    if (formData?.tmfp) {
      params.append('tmfp', formData.tmfp);
    } else {
      params.append('ip', clientIp);
      params.append('ua', clientUa);
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const text = await res.text();
    return NextResponse.json({ status: res.status, response: text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
