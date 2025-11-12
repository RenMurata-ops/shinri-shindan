/**
 * POST /api/serial-code/verify
 * シリアルコードを検証し、診断結果を返す
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          errorMessage: 'シリアルコードが入力されていません。',
        },
        { status: 400 }
      );
    }

    // コード形式チェック
    const codePattern = /^SHINRI-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!codePattern.test(code)) {
      return NextResponse.json({
        success: true,
        valid: false,
        errorMessage: '正しい形式で入力してください（SHINRI-XXXX-XXXX-XXXX）',
      });
    }

    const supabase = createServiceClient();

    // シリアルコードを検索
    const { data: serialCodeData, error: serialCodeError } = await supabase
      .from('serial_codes')
      .select('*, diagnoses(*)')
      .eq('code', code)
      .single();

    if (serialCodeError || !serialCodeData) {
      return NextResponse.json({
        success: true,
        valid: false,
        errorMessage: '無効なシリアルコードです。',
      });
    }

    // アクセス情報を記録
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    await (supabase
      .from('serial_codes') as any)
      .update({
        access_count: (serialCodeData as any).access_count + 1,
        last_access_ip: ipAddress,
        last_access_at: new Date().toISOString(),
        is_used: true,
        used_at: (serialCodeData as any).used_at || new Date().toISOString(),
      })
      .eq('id', (serialCodeData as any).id);

    // 診断結果を返す
    return NextResponse.json({
      success: true,
      valid: true,
      diagnosisId: (serialCodeData as any).diagnosis_id,
      stage2And3Results: (serialCodeData as any).diagnoses.stage2_and_3_results,
    });
  } catch (error) {
    console.error('Serial code verification error:', error);
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
