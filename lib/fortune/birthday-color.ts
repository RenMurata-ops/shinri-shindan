/**
 * バースデーカラー
 * 生年月日から天命の色を算出
 */

export interface BirthdayColor {
  name: string;
  hex: string;
  subHex: string;
  meaning: string;
}

// 色相環を12分割して、季節ごとに色を割り当てる
const COLOR_PALETTE = [
  // 冬（1月〜3月）
  { hue: 240, saturation: 70, name: '神秘の青' },
  { hue: 270, saturation: 60, name: '叡智の紫' },
  { hue: 300, saturation: 65, name: '直感の菫' },
  // 春（4月〜6月）
  { hue: 330, saturation: 70, name: '愛情の桃' },
  { hue: 0, saturation: 75, name: '情熱の紅' },
  { hue: 30, saturation: 80, name: '創造の橙' },
  // 夏（7月〜9月）
  { hue: 60, saturation: 85, name: '知恵の金' },
  { hue: 90, saturation: 70, name: '調和の翠' },
  { hue: 120, saturation: 65, name: '癒しの緑' },
  // 秋（10月〜12月）
  { hue: 150, saturation: 60, name: '変容の碧' },
  { hue: 180, saturation: 65, name: '真実の藍' },
  { hue: 210, saturation: 70, name: '冷静の青' },
];

/**
 * HSLからHEXに変換
 */
function hslToHex(h: number, s: number, l: number): string {
  const sDecimal = s / 100;
  const lDecimal = l / 100;

  const c = (1 - Math.abs(2 * lDecimal - 1)) * sDecimal;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lDecimal - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, '0');
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, '0');
  const bHex = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

/**
 * 生年月日からバースデーカラーを計算
 */
export function getBirthdayColor(birthDate: Date): BirthdayColor {
  const month = birthDate.getMonth(); // 0-11
  const day = birthDate.getDate(); // 1-31
  const year = birthDate.getFullYear();

  // 年の通算日数を計算（1-366）
  const dayOfYear = Math.floor(
    (birthDate.getTime() - new Date(year, 0, 1).getTime()) / 86400000
  ) + 1;

  // 色相を決定（0-360度）
  const hue = (dayOfYear * 360) / 366;

  // 月に基づいて彩度を調整
  const baseSaturation = COLOR_PALETTE[month]?.saturation || 70;
  const saturation = baseSaturation + (day % 20) - 10; // ±10の変動

  // 明度を計算（日付に基づく）
  const lightness = 40 + (day % 30); // 40-70の範囲

  // メインカラーとサブカラーを生成
  const mainHex = hslToHex(hue, saturation, lightness);
  const subHex = hslToHex(hue, saturation - 15, lightness + 10);

  // 色名を決定
  const colorName = COLOR_PALETTE[month]?.name || '神秘の色';

  // 意味を生成
  const meanings = [
    'あなたは深い洞察力と知性を持ち、真実を見抜く力があります。',
    'あなたには調和を生み出す才能があり、周囲を穏やかにする力があります。',
    'あなたは創造的なエネルギーに満ちており、新しいものを生み出す力があります。',
    'あなたには強い意志と情熱があり、目標を達成する力があります。',
    'あなたは純粋で優しい心を持ち、人々に癒しをもたらします。',
    'あなたには変化を受け入れる柔軟性があり、成長し続ける力があります。',
  ];
  const meaning = meanings[month % meanings.length];

  return {
    name: colorName,
    hex: mainHex,
    subHex: subHex,
    meaning: meaning,
  };
}

/**
 * 色の特性を取得
 */
export function getColorCharacteristics(color: BirthdayColor): string[] {
  const hue = parseInt(color.hex.slice(1, 3), 16);

  // 色相に基づいて特性を返す
  if (hue < 50) {
    return ['情熱的', 'リーダーシップ', '行動力'];
  } else if (hue < 100) {
    return ['創造的', '社交的', '楽観的'];
  } else if (hue < 150) {
    return ['調和', '成長', 'バランス'];
  } else if (hue < 200) {
    return ['冷静', '分析的', '誠実'];
  } else {
    return ['精神的', '直感的', '神秘的'];
  }
}
