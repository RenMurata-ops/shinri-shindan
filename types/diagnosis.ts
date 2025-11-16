// 診断フォームデータ
export interface DiagnosisFormData {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  birthDate: string;
  birthTime?: string;
  birthPrefecture?: string;
  gender: string;
  coreValue: string;
}

// 第一段階診断結果
export interface Stage1Results {
  archetype: string;
  archetype_description: string;
  archetype_icon: string;
  truth_star: string;
  truth_star_description: string;
  elements: {
    exploration: number;
    order: number;
    interaction: number;
    harmony: number;
    sensitivity: number;
  };
  destiny_code: string;
  destiny_code_description: string;
  destiny_color_name: string;
  destiny_color_hex: string;
  destiny_color_sub: string;
  talent_domains: Array<{
    name: string;
    stars: number;
    description: string;
  }>;
  compatibility: {
    resonance: string[];
    growth: string[];
    stimulus: string[];
  };
  three_month_fortune: {
    month1: {
      title: string;
      description: string;
      lucky_action: string;
    };
    month2: {
      title: string;
      description: string;
      lucky_action: string;
    };
    month3: {
      title: string;
      description: string;
      lucky_action: string;
    };
  };
  similar_historical_figures: Array<{
    name: string;
    description: string;
    reason: string;
  }>;
  message: string;
}

// 第二・第三段階診断結果
export interface Stage2And3Results {
  deep_psychology: string;
  unconscious_pattern: {
    pattern: string;
    description: string;
    solution: string;
  };
  life_theme: {
    title: string;
    description: string;
    manifestations: string[];
  };
  twelve_waves: Array<{
    name: string;
    status: 'good' | 'neutral' | 'caution';
    description: string;
  }>;
  three_year_forecast: {
    [year: string]: {
      trend: 'rising' | 'peak' | 'adjustment' | 'challenge';
      description: string;
    };
  };
  action_guide: Array<{
    title: string;
    description: string;
  }>;
}

// アーキタイプ
export const ARCHETYPES = [
  { name: '創造者', icon: 'palette', description: '新しい価値を生み出す革新者' },
  { name: '探求者', icon: 'search', description: '真実を追い求める知的冒険家' },
  { name: '賢者', icon: 'book', description: '深い洞察と知恵を持つ導き手' },
  { name: '芸術家', icon: 'brush', description: '美と感性を表現する詩人' },
  { name: '戦士', icon: 'sword', description: '困難に立ち向かう勇敢な戦士' },
  { name: '守護者', icon: 'shield', description: '大切なものを守る保護者' },
  { name: '統率者', icon: 'crown', description: '人々を導くリーダー' },
  { name: '冒険者', icon: 'compass', description: '未知を恐れず挑戦する開拓者' },
  { name: '調和者', icon: 'heart', description: '平和と調和をもたらす仲介者' },
  { name: '支援者', icon: 'hands', description: '他者を助ける思いやりの人' },
  { name: '完璧主義者', icon: 'target', description: '高い理想を追求する達成者' },
  { name: '楽天家', icon: 'sun', description: '喜びと楽しさを分かち合う' },
] as const;

// 真理の星座
export const TRUTH_STARS = [
  { name: '第1星：完璧の星', description: '完璧さと正しさを追求する本質' },
  { name: '第2星：愛情の星', description: '他者への愛と思いやりの本質' },
  { name: '第3星：達成の星', description: '成功と達成を目指す本質' },
  { name: '第4星：独自の星', description: '個性と独自性を大切にする本質' },
  { name: '第5星：知恵の星', description: '知識と理解を深める本質' },
  { name: '第6星：献身の星', description: '忠実さと責任感の本質' },
  { name: '第7星：楽観の星', description: '喜びと楽しさを求める本質' },
  { name: '第8星：力の星', description: '影響力とコントロールの本質' },
  { name: '第9星：平和の星', description: '調和と平和を望む本質' },
] as const;

// 才能の領域
export const TALENT_DOMAINS = [
  { name: '分析領域', description: '論理的思考と問題解決' },
  { name: '創造領域', description: '新しいアイデアと表現' },
  { name: '対人領域', description: 'コミュニケーションと共感' },
  { name: '管理領域', description: '組織化と効率化' },
  { name: '探究領域', description: '知識の習得と研究' },
  { name: '実行領域', description: '行動力と推進力' },
  { name: '調和領域', description: '調整と仲介' },
] as const;
