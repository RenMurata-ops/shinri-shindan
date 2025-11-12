/**
 * 数秘術（Numerology）
 * ライフパスナンバー、ソウルナンバー、パーソナリティナンバーの計算
 */

// ひらがなから数字への変換テーブル
const HIRAGANA_TO_NUMBER: Record<string, number> = {
  // あ行
  'あ': 1, 'い': 1, 'う': 3, 'え': 5, 'お': 6,
  // か行
  'か': 2, 'き': 2, 'く': 2, 'け': 2, 'こ': 2,
  // さ行
  'さ': 3, 'し': 3, 'す': 3, 'せ': 3, 'そ': 3,
  // た行
  'た': 4, 'ち': 4, 'つ': 4, 'て': 4, 'と': 4,
  // な行
  'な': 5, 'に': 5, 'ぬ': 5, 'ね': 5, 'の': 5,
  // は行
  'は': 6, 'ひ': 6, 'ふ': 6, 'へ': 6, 'ほ': 6,
  // ま行
  'ま': 7, 'み': 7, 'む': 7, 'め': 7, 'も': 7,
  // や行
  'や': 8, 'ゆ': 8, 'よ': 8,
  // ら行
  'ら': 9, 'り': 9, 'る': 9, 'れ': 9, 'ろ': 9,
  // わ行
  'わ': 1, 'を': 6, 'ん': 5,
  // 濁音・半濁音
  'が': 2, 'ぎ': 2, 'ぐ': 2, 'げ': 2, 'ご': 2,
  'ざ': 3, 'じ': 3, 'ず': 3, 'ぜ': 3, 'ぞ': 3,
  'だ': 4, 'ぢ': 4, 'づ': 4, 'で': 4, 'ど': 4,
  'ば': 6, 'び': 6, 'ぶ': 6, 'べ': 6, 'ぼ': 6,
  'ぱ': 6, 'ぴ': 6, 'ぷ': 6, 'ぺ': 6, 'ぽ': 6,
  // 小文字
  'ぁ': 1, 'ぃ': 1, 'ぅ': 3, 'ぇ': 5, 'ぉ': 6,
  'ゃ': 8, 'ゅ': 8, 'ょ': 8, 'っ': 4,
};

/**
 * 数字の各桁を合計する
 */
function sumDigits(num: number): number {
  return num
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

/**
 * 1桁になるまで数字を足し続ける（マスターナンバー除く）
 */
function reduceToSingleDigit(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = sumDigits(num);
  }
  return num;
}

/**
 * ライフパスナンバー（生年月日から計算）
 */
export function calculateLifePathNumber(birthDate: Date): number {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  // 各要素を1桁に還元
  const yearSum = reduceToSingleDigit(sumDigits(year));
  const monthSum = reduceToSingleDigit(month);
  const daySum = reduceToSingleDigit(day);

  // 合計して最終的な数字を得る
  const total = yearSum + monthSum + daySum;

  return reduceToSingleDigit(total);
}

/**
 * 文字列から数値を計算する
 */
function calculateValueFromKana(kana: string): number {
  let sum = 0;
  for (const char of kana) {
    const value = HIRAGANA_TO_NUMBER[char];
    if (value !== undefined) {
      sum += value;
    }
  }
  return sum;
}

/**
 * 母音を判定する
 */
function isVowel(char: string): boolean {
  const vowels = ['あ', 'い', 'う', 'え', 'お', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ'];
  return vowels.includes(char);
}

/**
 * ソウルナンバー（名前の母音から計算）
 */
export function calculateSoulNumber(kana: string): number {
  let sum = 0;
  for (const char of kana) {
    if (isVowel(char) && HIRAGANA_TO_NUMBER[char] !== undefined) {
      sum += HIRAGANA_TO_NUMBER[char];
    }
  }
  return reduceToSingleDigit(sum);
}

/**
 * パーソナリティナンバー（名前の子音から計算）
 */
export function calculatePersonalityNumber(kana: string): number {
  let sum = 0;
  for (const char of kana) {
    if (!isVowel(char) && HIRAGANA_TO_NUMBER[char] !== undefined) {
      sum += HIRAGANA_TO_NUMBER[char];
    }
  }
  return reduceToSingleDigit(sum);
}

/**
 * デスティニーナンバー（名前全体から計算）
 */
export function calculateDestinyNumber(kana: string): number {
  const total = calculateValueFromKana(kana);
  return reduceToSingleDigit(total);
}

/**
 * 名前の数秘術を一括で計算
 */
export interface NameNumerology {
  soul: number;
  personality: number;
  destiny: number;
}

export function calculateNameNumerology(
  lastNameKana: string,
  firstNameKana: string
): NameNumerology {
  const fullName = lastNameKana + firstNameKana;

  return {
    soul: calculateSoulNumber(fullName),
    personality: calculatePersonalityNumber(fullName),
    destiny: calculateDestinyNumber(fullName),
  };
}

/**
 * 数秘術の意味を取得
 */
export function getNumerologyMeaning(number: number): string {
  const meanings: Record<number, string> = {
    1: 'リーダーシップ、独立心、開拓者精神',
    2: '協調性、感受性、バランス',
    3: '創造性、表現力、社交性',
    4: '安定性、実用性、勤勉さ',
    5: '自由、変化、冒険心',
    6: '調和、責任感、愛情深さ',
    7: '精神性、分析力、内省',
    8: '権力、野心、物質的成功',
    9: '人道主義、理想主義、完成',
    11: '直感、霊性、ビジョン（マスターナンバー）',
    22: 'マスタービルダー、偉大な創造（マスターナンバー）',
    33: 'マスターティーチャー、無条件の愛（マスターナンバー）',
  };

  return meanings[number] || '不明';
}
