/**
 * POST /api/diagnose
 * 診断を実行し、結果をSupabaseに保存
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/client';
import { generateCompleteDiagnosis } from '@/lib/ai/diagnosis-generator';
import type { DiagnosisInput } from '@/lib/types/diagnosis';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60秒のタイムアウト

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body: DiagnosisInput = await request.json();

    // バリデーション
    if (!body.lastName || !body.firstName || !body.birthDate || !body.gender) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '必須項目が入力されていません。',
          },
        },
        { status: 400 }
      );
    }

    // 生年月日の妥当性チェック
    const birthDate = new Date(body.birthDate);
    const today = new Date();
    if (birthDate > today) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: '生年月日が未来の日付です。',
          },
        },
        { status: 400 }
      );
    }

    // IPアドレスとUser-Agentを取得
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 診断を生成（Claude API呼び出し）
    console.log('Generating diagnosis...');
    const diagnosisResult = await generateCompleteDiagnosis(body);
    console.log('Diagnosis generated successfully');

    // Supabaseに保存
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from('diagnoses')
      .insert({
        last_name: body.lastName,
        first_name: body.firstName,
        last_name_kana: body.lastNameKana || null,
        first_name_kana: body.firstNameKana || null,
        birth_date: body.birthDate,
        birth_time: body.birthTime || null,
        birth_prefecture: body.birthPrefecture || null,
        gender: body.gender,
        core_value: body.coreValue || null,
        stage1_results: diagnosisResult.stage1 as any,
        stage2_and_3_results: diagnosisResult.stage2And3 as any,
        fortune_raw_data: diagnosisResult.fortuneRawData as any,
        ip_address: ipAddress,
        user_agent: userAgent,
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'データベースへの保存に失敗しました。',
            details: error.message,
          },
        },
        { status: 500 }
      );
    }

    // レスポンスを返す
    return NextResponse.json({
      success: true,
      diagnosisId: (data as any).id,
      redirectUrl: `/diagnosis/${(data as any).id}`,
    });
  } catch (error) {
    console.error('Diagnosis error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: error.message || '診断の生成に失敗しました。',
          },
        },
        { status: 500 }
      );
    }

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
