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
    const diagnosisPrompt = `あなたは13種類の占術を統合した「真理探究占星」の専門家です。ユーザーを深く肯定し、励まし、元気づけ、自分自身をもっと深く知りたいと思わせる診断を行います。

以下の情報に基づいて、第一段階の診断結果を生成してください：

- 名前：${last_name} ${first_name}（${last_name_kana} ${first_name_kana}）
- 生年月日：${birth_date}
${birth_time ? `- 生まれた時間：${birth_time}` : ''}
- 性別：${gender}
${core_value ? `- 大切にしている価値観：${core_value}` : ''}

【重要な指示】
1. アーキタイプの説明は、ユーザーの特別さを強調し、具体的な行動や感情に触れてください
2. メッセージは500文字程度で、以下を必ず含めてください：
   - 「あなたは特別な存在である」という強い肯定
   - 日常生活で実際に感じているであろう具体的な感情や悩み（「周りと違う」「理解されない」「孤独を感じる」など）
   - その感情や悩みが実は才能の証であるという励まし
   - 具体的な強みや魅力を3つ以上挙げる
   - 「あなたの魂にはまだ明らかになっていない深い秘密がある」という神秘性
   - 「もっと深く自分を知ることで、人生が劇的に変わる」という誘導
   - 温かく、希望に満ちた未来像

以下のJSON形式で診断結果を返してください：

{
  "archetype": "12のアーキタイプから選択（創造者/探求者/賢者/芸術家/戦士/守護者/統率者/冒険者/調和者/支援者/完璧主義者/楽天家）",
  "archetype_description": "そのアーキタイプの詳細な説明（250文字程度）。ユーザーの特別さを強調し、具体的な行動パターンや感情に触れる。",
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
      "description": "その領域の説明（120文字程度）。具体的な能力を肯定的に描写。"
    }
  ],
  "compatibility": {
    "resonance": ["共鳴タイプ1", "共鳴タイプ2"],
    "growth": ["成長タイプ1", "成長タイプ2"],
    "stimulus": ["刺激タイプ1", "刺激タイプ2"]
  },
  "three_month_fortune": {
    "month1": {
      "title": "1ヶ月目のテーマ（例：覚醒の月）",
      "description": "1ヶ月目の運勢の詳細（120文字程度）。具体的な出来事や感情の変化を予測。",
      "lucky_action": "この月に取るべき具体的な行動（50文字程度）"
    },
    "month2": {
      "title": "2ヶ月目のテーマ（例：飛躍の月）",
      "description": "2ヶ月目の運勢の詳細（120文字程度）。具体的な出来事や感情の変化を予測。",
      "lucky_action": "この月に取るべき具体的な行動（50文字程度）"
    },
    "month3": {
      "title": "3ヶ月目のテーマ（例：収穫の月）",
      "description": "3ヶ月目の運勢の詳細（120文字程度）。具体的な出来事や感情の変化を予測。",
      "lucky_action": "この月に取るべき具体的な行動（50文字程度）"
    }
  },
  "similar_historical_figures": [
    {
      "name": "偉人の名前（例：スティーブ・ジョブズ）",
      "description": "その偉人の簡潔な説明（50文字程度）",
      "reason": "なぜこの診断結果と似ているか、どの特性が共通しているか（100文字程度）"
    },
    {
      "name": "偉人の名前2",
      "description": "その偉人の簡潔な説明（50文字程度）",
      "reason": "なぜこの診断結果と似ているか（100文字程度）"
    },
    {
      "name": "偉人の名前3",
      "description": "その偉人の簡潔な説明（50文字程度）",
      "reason": "なぜこの診断結果と似ているか（100文字程度）"
    }
  ],
  "core_philosophy": {
    "title": "核とする考え方のタイトル（例：自由と真実への探究）",
    "description": "この人の根本的な思考パターンや人生哲学の詳細な説明（200文字程度）。なぜそう考えるのか、どのように行動に現れるかを含める。",
    "key_beliefs": [
      "核となる信念1（50文字程度）",
      "核となる信念2（50文字程度）",
      "核となる信念3（50文字程度）"
    ]
  },
  "message": "本人への深く感動的なメッセージ（500文字程度）。必ず以下を含める：①強い肯定と「あなたは特別」という確信、②日常で感じる具体的な悩みや感情への共感、③その悩みが才能の証である励まし、④具体的な強み3つ以上、⑤魂の深い秘密の存在を示唆、⑥もっと深く知ることで人生が変わるという誘導、⑦希望に満ちた未来像。温かく、スピリチュアルで、心に響く言葉で。"
}

JSON以外の文字を含めないでください。`;

    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
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
      console.error('Unexpected response type:', content.type);
      throw new Error('Unexpected response type from Claude');
    }

    console.log('Claude API Response:', content.text);

    let stage1Results;
    try {
      stage1Results = JSON.parse(content.text);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw response:', content.text);
      throw new Error('診断結果のパースに失敗しました');
    }

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
    const errorMessage = error instanceof Error ? error.message : '診断の生成に失敗しました';
    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.stack : String(error)
      },
      { status: 500 }
    );
  }
}
