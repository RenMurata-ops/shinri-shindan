import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

function generateSerialCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = 3;
  const segmentLength = 4;

  const code = Array.from({ length: segments }, () => {
    return Array.from({ length: segmentLength }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }).join('-');

  return `SHINRI-${code}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosis_id } = body;

    if (!diagnosis_id) {
      return NextResponse.json(
        { error: '診断IDが必要です' },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    // 診断が存在するか確認
    const { data: diagnosis, error: diagnosisError } = await supabase
      .from('diagnoses')
      .select('id')
      .eq('id', diagnosis_id)
      .single();

    if (diagnosisError || !diagnosis) {
      return NextResponse.json(
        { error: '診断が見つかりません' },
        { status: 404 }
      );
    }

    // 既存のシリアルコードがあるか確認
    const { data: existingCode } = await supabase
      .from('serial_codes')
      .select('code')
      .eq('diagnosis_id', diagnosis_id)
      .single();

    if (existingCode) {
      return NextResponse.json({
        code: existingCode.code,
        message: 'シリアルコードが既に発行されています',
      });
    }

    // 新しいシリアルコードを生成
    let code = generateSerialCode();
    let attempts = 0;
    const maxAttempts = 10;

    // ユニークなコードを生成（衝突回避）
    while (attempts < maxAttempts) {
      const { data: duplicate } = await supabase
        .from('serial_codes')
        .select('id')
        .eq('code', code)
        .single();

      if (!duplicate) break;

      code = generateSerialCode();
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { error: 'シリアルコードの生成に失敗しました' },
        { status: 500 }
      );
    }

    // シリアルコードを保存
    const { error: insertError } = await supabase.from('serial_codes').insert({
      code,
      diagnosis_id,
    });

    if (insertError) {
      console.error('Serial code insert error:', insertError);
      return NextResponse.json(
        { error: 'シリアルコードの保存に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      code,
      message: 'シリアルコードを発行しました',
    });
  } catch (error) {
    console.error('Serial code generation error:', error);
    return NextResponse.json(
      { error: 'シリアルコードの発行に失敗しました' },
      { status: 500 }
    );
  }
}
