import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'シリアルコードが必要です' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const { data: serialCode, error } = await supabase
      .from('serial_codes')
      .select('*, diagnoses(*)')
      .eq('code', code)
      .single();

    if (error || !serialCode) {
      return NextResponse.json(
        { error: 'シリアルコードが見つかりません' },
        { status: 404 }
      );
    }

    // アクセスカウントを更新
    await supabase
      .from('serial_codes')
      .update({
        access_count: (serialCode.access_count || 0) + 1,
        last_access_at: new Date().toISOString(),
        last_access_ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      })
      .eq('id', serialCode.id);

    return NextResponse.json({
      valid: true,
      message: 'シリアルコードが確認されました',
    });
  } catch (error) {
    console.error('Serial code verification error:', error);
    return NextResponse.json(
      { error: 'シリアルコードの検証に失敗しました' },
      { status: 500 }
    );
  }
}
