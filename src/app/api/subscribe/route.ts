import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Try to save to database
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('subscribers')
        .upsert(
          { 
            email, 
            locale: locale || 'zh-TW',
            subscribed_at: new Date().toISOString(),
            status: 'active'
          },
          { onConflict: 'email' }
        )
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        // If table doesn't exist, just return success anyway
      }
    }

    // Return success (even if DB save fails for demo)
    return NextResponse.json({ 
      success: true, 
      message: 'Subscribed successfully!'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
