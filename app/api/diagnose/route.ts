import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createServerSupabaseClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      last_name,
      first_name,
      last_name_kana,
      first_name_kana,
      birth_date,
      birth_time,
      gender,
      core_value,
    } = body;

    // バリデーション
    if (!last_name || !first_name || !birth_date || !gender) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    // Claude APIで診断を生成
    const diagnosisPrompt = `あなたは13種類の占術（西洋占星術、数秘術、九星気学、動物占い、誕生日占い、姓名判断、四柱推命、タロット、MBTI、エニアグラム、ビッグファイブ、カラー診断、干支占い）を統合した「真理探究占星」の専門家です。

以下の情報に基づいて、第一段階の診断結果を生成してください：

- 名前：${last_name} ${first_name}（${last_name_kana} ${first_name_kana}）
- 生年月日：${birth_date}
${birth_time ? `- 生まれた時間：${birth_time}` : ''}
- 性別：${gender}
${core_value ? `- 大切にしている価値観：${core_value}` : ''}

以下のJSON形式で、詳細で具体的な診断結果を返してください：

{
  "archetype": "12のアーキタイプから選択（創造者/探求者/賢者/芸術家/戦士/守護者/統率者/冒険者/調和者/支援者/完璧主義者/楽天家）",
  "archetype_description": "そのアーキタイプの詳細な説明（200文字程度）",
  "archetype_icon": "アイコン名（palette/search/book/brush/sword/shield/crown/compass/heart/hands/target/sun）",
  "truth_star": "9つの真理の星から選択（第1星：完璧の星 〜 第9星：平和の星）",
  "truth_star_description": "その星の詳細な説明（150文字程度）",
  "elements": {
    "exploration": 0-100の数値,
    "order": 0-100の数値,
    "interaction": 0-100の数値,
    "harmony": 0-100の数値,
    "sensitivity": 0-100の数値
  },
  "destiny_code": "運命コード（例：7-3-11）",
  "destiny_code_description": "運命コードの意味（150文字程度）",
  "destiny_color_name": "天命の色の名前（例：深紫の叡智）",
  "destiny_color_hex": "メインカラー（例：#5B4F8F）",
  "destiny_color_sub": "サブカラー（例：#8B7FC7）",
  "talent_domains": [
    {
      "name": "才能の領域名（分析/創造/対人/管理/探究/実行/調和から2-3個）",
      "stars": 1-5の数値,
      "description": "その領域の説明（100文字程度）"
    }
  ],
  "compatibility": {
    "resonance": ["共鳴タイプ1", "共鳴タイプ2"],
    "growth": ["成長タイプ1", "成長タイプ2"],
    "stimulus": ["刺激タイプ1", "刺激タイプ2"]
  },
  "message": "本人へのメッセージ（300文字程度、具体的で励ましを含む）"
}

JSON以外の文字を含めないでください。`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: diagnosisPrompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const stage1Results = JSON.parse(content.text);

    // データベースに保存
    const supabase = createServerSupabaseClient();
    const diagnosisId = uuidv4();

    const { error: insertError } = await supabase.from('diagnoses').insert({
      id: diagnosisId,
      last_name,
      first_name,
      last_name_kana,
      first_name_kana,
      birth_date,
      birth_time,
      gender,
      core_value,
      stage1_results: stage1Results,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    });

    if (insertError) {
      console.error('Database error:', insertError);
      throw new Error('診断結果の保存に失敗しました');
    }

    return NextResponse.json({
      diagnosis_id: diagnosisId,
      message: '診断が完了しました',
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    return NextResponse.json(
      { error: '診断の生成に失敗しました' },
      { status: 500 }
    );
  }
}
