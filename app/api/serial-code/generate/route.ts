/**
 * POST /api/serial-code/generate
 * シリアルコードを生成
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/client';
import { generateSerialCode } from '@/lib/ai/diagnosis-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diagnosisId } = body;

    if (!diagnosisId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '診断IDが指定されていません。',
          },
        },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // 診断IDの存在確認
    const { data: diagnosis, error: diagnosisError } = await supabase
      .from('diagnoses')
      .select('id')
      .eq('id', diagnosisId)
      .single();

    if (diagnosisError || !diagnosis) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DIAGNOSIS_NOT_FOUND',
            message: '診断結果が見つかりません。',
          },
        },
        { status: 404 }
      );
    }

    // 既にシリアルコードが発行されていないかチェック
    const { data: existingCode } = await supabase
      .from('serial_codes')
      .select('code')
      .eq('diagnosis_id', diagnosisId)
      .single();

    if (existingCode) {
      return NextResponse.json({
        success: true,
        serialCode: (existingCode as any).code,
        redirectUrl: `/serial/${(existingCode as any).code}`,
      });
    }

    // ユニークなコードを生成
    let code = generateSerialCode();
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      const { data: existing } = await supabase
        .from('serial_codes')
        .select('id')
        .eq('code', code)
        .single();

      if (!existing) {
        isUnique = true;
      } else {
        code = generateSerialCode();
        attempts++;
      }
    }

    if (!isUnique) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'ユニークなコードの生成に失敗しました。',
          },
        },
        { status: 500 }
      );
    }

    // シリアルコードを保存
    const { data, error } = await supabase
      .from('serial_codes')
      .insert({
        code,
        diagnosis_id: diagnosisId,
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Serial code insert error:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'シリアルコードの保存に失敗しました。',
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      serialCode: (data as any).code,
      redirectUrl: `/serial/${(data as any).code}`,
    });
  } catch (error) {
    console.error('Serial code generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '予期しないエラーが発生しました。',
        },
      },
      { status: 500 }
    );
  }
}
