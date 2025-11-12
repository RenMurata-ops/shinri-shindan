/**
 * その他の占術
 * - 九星気学
 * - 動物占い（簡易版）
 * - 姓名判断
 */

/**
 * 九星気学
 */
const NINE_STARS = [
  '一白水星',
  '二黒土星',
  '三碧木星',
  '四緑木星',
  '五黄土星',
  '六白金星',
  '七赤金星',
  '八白土星',
  '九紫火星',
];

export function calculateNineStar(birthDate: Date): string {
  const year = birthDate.getFullYear();

  // 九星気学の計算式
  // (11 - (西暦年 mod 9)) を使用
  const index = (11 - (year % 9)) % 9;

  return NINE_STARS[index];
}

export function getNineStarMeaning(star: string): string {
  const meanings: Record<string, string> = {
    一白水星: '柔軟性と適応力に優れ、深い思慮を持つ',
    二黒土星: '堅実で粘り強く、サポート力がある',
    三碧木星: '活発で行動的、新しいことにチャレンジする',
    四緑木星: '調和を重んじ、コミュニケーション能力が高い',
    五黄土星: '強いエネルギーを持ち、中心的存在',
    六白金星: 'プライドが高く、完璧主義的',
    七赤金星: '社交的で明るく、楽しむことが得意',
    八白土星: '誠実で真面目、着実に物事を進める',
    九紫火星: '知的で洞察力があり、華やかな存在',
  };

  return meanings[star] || '不明';
}

/**
 * 動物占い（簡易版）
 * 実際は60種類あるが、ここでは12種類に簡略化
 */
const ANIMAL_TYPES = [
  { name: '黒ひょう', group: 'ひょう', traits: ['直感的', '神秘的', '独立心強い'] },
  { name: 'チーター', group: 'ひょう', traits: ['スピード重視', '瞬発力', '集中力'] },
  { name: 'ライオン', group: 'ライオン', traits: ['リーダーシップ', '堂々としている', '自信家'] },
  { name: 'トラ', group: 'トラ', traits: ['情熱的', '行動力', '勇敢'] },
  { name: 'タヌキ', group: 'タヌキ', traits: ['社交的', '愛嬌がある', '柔軟'] },
  { name: '子守熊', group: 'コアラ', traits: ['マイペース', '平和主義', '癒し系'] },
  { name: 'ゾウ', group: 'ゾウ', traits: ['誠実', '穏やか', '優しい'] },
  { name: 'ひつじ', group: 'ひつじ', traits: ['協調性', '思いやり', '献身的'] },
  { name: 'ペガサス', group: 'ペガサス', traits: ['自由', '創造的', '束縛を嫌う'] },
  { name: '猿', group: '猿', traits: ['器用', '頭の回転が速い', '好奇心旺盛'] },
  { name: 'オオカミ', group: 'オオカミ', traits: ['一匹狼', 'クール', '実力主義'] },
  { name: 'こじか', group: 'こじか', traits: ['純粋', '素直', '感受性豊か'] },
];

export interface AnimalFortune {
  name: string;
  group: string;
  traits: string[];
}

export function calculateAnimalType(birthDate: Date): AnimalFortune {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  // 簡易的な計算（年月日の合計を12で割った余り）
  const sum = year + month + day;
  const index = sum % ANIMAL_TYPES.length;

  return ANIMAL_TYPES[index];
}

/**
 * 姓名判断
 * 漢字の画数データベース（簡略版）
 */
const KANJI_STROKES: Record<string, number> = {
  // よくある漢字の画数（一部抜粋）
  一: 1, 二: 2, 三: 3, 四: 5, 五: 4, 六: 4, 七: 2, 八: 2, 九: 2, 十: 2,
  田: 5, 中: 4, 山: 3, 川: 3, 木: 4, 林: 8, 森: 12,
  太: 4, 郎: 9, 子: 3, 美: 9, 花: 7, 雪: 11, 月: 4, 日: 4,
  佐: 7, 藤: 18, 鈴: 13, 高: 10, 橋: 16,
  渡: 12, 辺: 5, 伊: 6, 加: 5,
  井: 4, 上: 3, 小: 3, 野: 11, 大: 3, 和: 8,
  // 追加（代表的な漢字）
  人: 2, 名: 6, 前: 9, 後: 9, 左: 5, 右: 5,
  男: 7, 女: 3, 母: 5, 父: 4, 兄: 5, 弟: 7,
  友: 4, 愛: 13, 心: 4, 想: 13, 思: 9, 考: 6,
  明: 8, 暗: 13, 光: 6, 影: 15, 白: 5, 黒: 11,
  春: 9, 夏: 10, 秋: 9, 冬: 5, 東: 8, 西: 6, 南: 9, 北: 5,
  // 名前でよく使われる漢字
  真: 10, 理: 11, 優: 17, 翔: 12, 陽: 12, 菜: 11, 咲: 9,
  結: 12, 衣: 6, 莉: 10, 奈: 8, 葵: 12, 凛: 15,
  // デフォルト値として平均的な画数
};

function getStrokeCount(char: string): number {
  return KANJI_STROKES[char] || 8; // デフォルトは8画
}

export interface NameFortune {
  total: number; // 総格
  heaven: number; // 天格
  earth: number; // 地格
  personality: number; // 人格
  external: number; // 外格
  evaluation: string;
}

export function calculateNameFortune(
  lastName: string,
  firstName: string
): NameFortune {
  // 苗字と名前の画数を計算
  const lastNameStrokes = lastName
    .split('')
    .map(getStrokeCount)
    .reduce((a, b) => a + b, 0);
  const firstNameStrokes = firstName
    .split('')
    .map(getStrokeCount)
    .reduce((a, b) => a + b, 0);

  // 五格を計算
  const total = lastNameStrokes + firstNameStrokes; // 総格
  const heaven = lastNameStrokes; // 天格（苗字の総画数）
  const earth = firstNameStrokes; // 地格（名前の総画数）

  // 人格（苗字の最後の文字 + 名前の最初の文字）
  const lastNameChars = lastName.split('');
  const firstNameChars = firstName.split('');
  const personality =
    getStrokeCount(lastNameChars[lastNameChars.length - 1] || '') +
    getStrokeCount(firstNameChars[0] || '');

  // 外格（総格 - 人格）
  const external = total - personality;

  // 評価（簡易版）
  let evaluation = '';
  if (total % 2 === 0) {
    evaluation = '吉数。バランスの取れた運勢です。';
  } else {
    evaluation = '奇数。個性的で独創的な運勢です。';
  }

  return {
    total,
    heaven,
    earth,
    personality,
    external,
    evaluation,
  };
}

/**
 * 画数の吉凶判定
 */
export function judgeStrokeNumber(strokes: number): string {
  const luckyNumbers = [1, 3, 5, 6, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 38, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68, 73, 75, 81];

  if (luckyNumbers.includes(strokes)) {
    return '大吉';
  } else if (strokes % 2 === 0) {
    return '中吉';
  } else {
    return '小吉';
  }
}
