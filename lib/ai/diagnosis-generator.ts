/**
 * Claude APIを使用した統合診断生成
 */

import Anthropic from '@anthropic-ai/sdk';
import type { DiagnosisInput, Stage1Results, Stage2And3Results, FortuneRawData } from '../types/diagnosis';
import { calculateLifePathNumber, calculateNameNumerology } from '../fortune/numerology';
import { getBirthdayColor } from '../fortune/birthday-color';
import { calculateNineStar, calculateAnimalType, calculateNameFortune } from '../fortune/other-fortunes';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * 基本占いの結果を計算
 */
function calculateBasicFortune(input: DiagnosisInput): FortuneRawData {
  const birthDate = new Date(input.birthDate);
  const fullNameKana = (input.lastNameKana || '') + (input.firstNameKana || '');

  return {
    numerologyLifePath: calculateLifePathNumber(birthDate),
    numerologyName: calculateNameNumerology(
      input.lastNameKana || '',
      input.firstNameKana || ''
    ),
    kyuseiKigaku: calculateNineStar(birthDate),
    animalFortune: calculateAnimalType(birthDate).name,
    birthdayColor: {
      name: getBirthdayColor(birthDate).name,
      hex: getBirthdayColor(birthDate).hex,
    },
    nameFortune: {
      total: calculateNameFortune(input.lastName, input.firstName).total,
      heaven: calculateNameFortune(input.lastName, input.firstName).heaven,
      earth: calculateNameFortune(input.lastName, input.firstName).earth,
    },
  };
}

/**
 * Claude APIで統合診断を生成
 */
export async function generateCompleteDiagnosis(input: DiagnosisInput): Promise<{
  stage1: Stage1Results;
  stage2And3: Stage2And3Results;
  fortuneRawData: FortuneRawData;
}> {
  // 基本占いの結果を計算
  const basicFortune = calculateBasicFortune(input);

  // Claude APIに送信するプロンプトを構築
  const prompt = `
あなたは「真理探究占星」という独自の占術システムの専門家です。
以下のユーザー情報と基本的な占い結果を統合して、完全な診断結果を生成してください。

【ユーザー情報】
- 名前: ${input.lastName} ${input.firstName}（${input.lastNameKana || ''} ${input.firstNameKana || ''}）
- 生年月日: ${input.birthDate}
- 生まれた時刻: ${input.birthTime || '不明'}
- 出生地: ${input.birthPrefecture || '不明'}
- 性別: ${input.gender}
- 大切にしている価値観: ${input.coreValue || '未回答'}

【既に計算済みの占い結果】
- ライフパスナンバー: ${basicFortune.numerologyLifePath}
- ソウルナンバー: ${basicFortune.numerologyName.soul}
- パーソナリティナンバー: ${basicFortune.numerologyName.personality}
- デスティニーナンバー: ${basicFortune.numerologyName.destiny}
- 九星気学: ${basicFortune.kyuseiKigaku}
- 動物占い: ${basicFortune.animalFortune}
- バースデーカラー: ${basicFortune.birthdayColor.name} (${basicFortune.birthdayColor.hex})
- 姓名判断 総格: ${basicFortune.nameFortune.total}画

【あなたのタスク】
以下の占術を統合し、「真理探究占星」という独自の体系で診断結果を生成してください：
1. 四柱推命
2. 西洋占星術（ホロスコープ）
3. 算命学
4. 紫微斗数
5. 宿曜占星術
6. 六壬神課
7. ジーニアスコード
8. MBTI推定
9. エニアグラム推定
10. ビッグファイブ推定

【重要な制約】
- 既存の占い用語（四柱推命、ホロスコープなど）は一切使用しないこと
- すべて「真理探究占星」の独自用語で表現すること
- ポジティブで希望が持てる内容にすること
- 具体的で「自分のことだ」と感じられる内容にすること
- 第一段階は簡潔に、第二・第三段階は詳細に記述

【12のアーキタイプ】
創造者、守護者、探求者、調停者、革新者、養育者、戦士、賢者、芸術家、統率者、癒し手、冒険者

【9つの真理の星】
第1星：完璧の星、第2星：愛情の星、第3星：達成の星、第4星：個性の星、第5星：知恵の星、第6星：忠誠の星、第7星：楽観の星、第8星：力の星、第9星：調和の星

【出力形式】必ずJSON形式で出力してください（コードブロックなし、純粋なJSONのみ）:

{
  "stage1": {
    "archetype": "12アーキタイプのいずれか",
    "archetypeDescription": "そのアーキタイプの説明（300文字）",
    "archetypeIcon": "アイコン名（例: seeker）",
    "truthStar": "第X星：〇〇の星",
    "truthStarDescription": "その星の説明（200文字）",
    "elements": {
      "exploration": 85,
      "order": 72,
      "interaction": 45,
      "harmony": 68,
      "sensitivity": 55
    },
    "destinyCode": "X-Y-Z形式（例: 7-3-11）",
    "destinyCodeDescription": "運命コードの意味（200文字）",
    "destinyColorName": "天命の色彩の名前（例: 深紫の叡智）",
    "destinyColorHex": "#5B4F8F",
    "destinyColorSub": "#8B7FC7",
    "talentDomains": [
      {
        "name": "領域名（創造領域、分析領域、統率領域、交流領域、技術領域、支援領域、革新領域のいずれか）",
        "stars": 5,
        "description": "その領域での才能（100文字）"
      }
    ],
    "compatibility": {
      "resonance": ["アーキタイプ名1", "アーキタイプ名2"],
      "growth": ["アーキタイプ名1", "アーキタイプ名2"],
      "stimulus": ["アーキタイプ名1", "アーキタイプ名2"]
    },
    "message": "あなたへのメッセージ（500文字）"
  },
  "stage2And3": {
    "deepPsychology": "深層心理の分析（1000文字）",
    "unconsciousPattern": {
      "pattern": "パターンの名前",
      "description": "詳細な説明（800文字）",
      "solution": "解決策（500文字）"
    },
    "lifeTheme": {
      "title": "人生のテーマ",
      "description": "詳細な説明（1500文字）",
      "manifestations": ["具体例1", "具体例2", "具体例3"]
    },
    "twelveWaves": [
      {
        "name": "自己の波動",
        "status": "good",
        "description": "詳細な説明（300文字）",
        "advice": "アドバイス（200文字）"
      },
      {
        "name": "財の波動",
        "status": "neutral",
        "description": "詳細な説明（300文字）",
        "advice": "アドバイス（200文字）"
      }
    ],
    "threeYearForecast": {
      "2025": {
        "trend": "rising",
        "description": "運勢の詳細（500文字）"
      },
      "2026": {
        "trend": "peak",
        "description": "運勢の詳細（500文字）"
      },
      "2027": {
        "trend": "adjustment",
        "description": "運勢の詳細（500文字）"
      }
    },
    "actionGuide": [
      {
        "title": "実践項目のタイトル",
        "description": "詳細な説明（200文字）"
      }
    ]
  },
  "fortuneRawData": {
    "shichusuimei": "四柱推命の結果（例: 壬申・戊午・甲子・乙亥）",
    "horoscope": {
      "sun": "太陽星座",
      "moon": "月星座",
      "rising": "上昇星座"
    },
    "sanmeigaku": "算命学の結果",
    "shibiTosu": "紫微斗数の結果",
    "shukuyo": "宿曜占星術の結果",
    "rikujinShinka": "六壬神課の結果",
    "geniusCode": "ジーニアスコードの結果",
    "mbtiEstimation": "MBTIタイプ",
    "enneagramEstimation": 5,
    "bigfiveEstimation": {
      "O": 85,
      "C": 72,
      "E": 45,
      "A": 68,
      "N": 55
    },
    "socionicsEstimation": "ソシオニクスタイプ",
    "lovetypeEstimation": "Lovetypeタイプ"
  }
}

純粋なJSONのみを出力してください。コードブロック（\`\`\`json）は使用しないでください。
`.trim();

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // レスポンスからJSONを抽出
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Invalid response type from Claude API');
    }

    const text = content.text;

    // JSONをパース（コードブロックがある場合は除去）
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const result = JSON.parse(jsonText);

    // 基本占いのデータをマージ
    result.fortuneRawData = {
      ...basicFortune,
      ...result.fortuneRawData,
    };

    return {
      stage1: result.stage1,
      stage2And3: result.stage2And3,
      fortuneRawData: result.fortuneRawData,
    };
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('診断の生成に失敗しました。もう一度お試しください。');
  }
}

/**
 * シリアルコード生成
 */
export function generateSerialCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 混同しやすい文字を除外
  let code = 'SHINRI';

  for (let i = 0; i < 3; i++) {
    code += '-';
    for (let j = 0; j < 4; j++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  return code;
}
