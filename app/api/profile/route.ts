// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('http://localhost:8000/auth/api/profile/', {
      credentials: 'include',
    });
    const data = await response.json();
    return NextResponse.json({ profile: data.profile || null });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ profile: null });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 🔥 CLIENT से CSRF HEADER भेजो, यहाँ extract करो
    const csrfToken = request.headers.get('x-csrf-token');
    
    // FormData या JSON दोनों handle करो
    let body: any;
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('multipart/form-data')) {
      // File upload के लिए FormData
      const formData = await request.formData();
      body = formData;
    } else {
      // Normal JSON data
      body = await request.json();
    }

    const djangoResponse = await fetch('http://localhost:8000/auth/api/profile/', {
      method: 'POST',
      headers: { 
        'X-CSRFToken': csrfToken || '',  // Client से आया CSRF
      },
      credentials: 'include',
      body: contentType?.includes('multipart/form-data') 
        ? body 
        : JSON.stringify(body),
    });
    
    const data = await djangoResponse.json();
    return NextResponse.json({ profile: data.profile || data });
  } catch (error) {
    console.error('Profile POST error:', error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
