import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🚀 API HIT!');
  
  try {
    const formData = await request.formData();
    console.log('📋 Form Data:', Object.fromEntries(formData));

    const campaignData = {
      campaign_name: formData.get('campaignName') as string,
      hashtag: formData.get('hashtag') as string || '',
      brief: formData.get('brief') as string || '',
      min_followers: formData.get('minFollowers') as string || '',
      campaign_type: formData.get('type') as string || 'influencer',
      from_date: formData.get('fromDate') as string || '',
      to_date: formData.get('toDate') as string || '',
      post_requirements: formData.get('postRequirements') as string || '',
      special_requirements: formData.get('specialRequirements') as string || '',
    };

    console.log('📤 Django Data:', campaignData);

    // Django को call करें
    const response = await fetch('http://127.0.0.1:8000/auth/campaign-create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData),
    });

    console.log('📥 Django Status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error('Django Error:', error);
      throw new Error('Django failed');
    }

    console.log('✅ SUCCESS!');
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('💥 ERROR:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
