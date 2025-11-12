// ユーザー入力データの型
export interface DiagnosisInput {
  lastName: string;
  firstName: string;
  lastNameKana?: string;
  firstNameKana?: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  birthPrefecture?: string;
  gender: string;
  coreValue?: string;
}

// アーキタイプの型
export type ArchetypeType =
  | '創造者'
  | '守護者'
  | '探求者'
  | '調停者'
  | '革新者'
  | '養育者'
  | '戦士'
  | '賢者'
  | '芸術家'
  | '統率者'
  | '癒し手'
  | '冒険者';

// 真理の星座の型
export type TruthStarType =
  | '第1星：完璧の星'
  | '第2星：愛情の星'
  | '第3星：達成の星'
  | '第4星：個性の星'
  | '第5星：知恵の星'
  | '第6星：忠誠の星'
  | '第7星：楽観の星'
  | '第8星：力の星'
  | '第9星：調和の星';

// エレメント
export interface Elements {
  exploration: number; // 探究エレメント (0-100)
  order: number; // 秩序エレメント (0-100)
  interaction: number; // 交流エレメント (0-100)
  harmony: number; // 調和エレメント (0-100)
  sensitivity: number; // 感受エレメント (0-100)
}

// 才能の領域
export interface TalentDomain {
  name: string;
  stars: number; // 1-5
  description: string;
}

// 相性
export interface Compatibility {
  resonance: ArchetypeType[]; // 共鳴型
  growth: ArchetypeType[]; // 成長型
  stimulus: ArchetypeType[]; // 刺激型
}

// 第一段階診断結果
export interface Stage1Results {
  archetype: ArchetypeType;
  archetypeDescription: string;
  archetypeIcon: string;
  truthStar: TruthStarType;
  truthStarDescription: string;
  elements: Elements;
  destinyCode: string; // X-Y-Z
  destinyCodeDescription: string;
  destinyColorName: string;
  destinyColorHex: string;
  destinyColorSub: string;
  talentDomains: TalentDomain[];
  compatibility: Compatibility;
  message: string;
}

// 無意識のパターン
export interface UnconsciousPattern {
  pattern: string;
  description: string;
  solution: string;
}

// 人生のテーマ
export interface LifeTheme {
  title: string;
  description: string;
  manifestations: string[];
}

// 12の波動
export interface Wave {
  name: string;
  status: 'good' | 'neutral' | 'caution';
  description: string;
  advice: string;
}

// 年間予測
export interface YearForecast {
  trend: 'rising' | 'peak' | 'adjustment';
  description: string;
}

// 実践ガイド
export interface ActionGuide {
  title: string;
  description: string;
}

// 第二・第三段階診断結果
export interface Stage2And3Results {
  deepPsychology: string;
  unconsciousPattern: UnconsciousPattern;
  lifeTheme: LifeTheme;
  twelveWaves: Wave[];
  threeYearForecast: {
    '2025': YearForecast;
    '2026': YearForecast;
    '2027': YearForecast;
  };
  actionGuide: ActionGuide[];
}

// 占いの生データ
export interface FortuneRawData {
  numerologyLifePath: number;
  numerologyName: {
    soul: number;
    personality: number;
    destiny: number;
  };
  kyuseiKigaku: string;
  animalFortune: string;
  birthdayColor: {
    name: string;
    hex: string;
  };
  nameFortune: {
    total: number;
    heaven: number;
    earth: number;
  };
  // Claude APIで生成される追加データ
  shichusuimei?: string;
  horoscope?: {
    sun: string;
    moon: string;
    rising: string;
  };
  sanmeigaku?: string;
  shibiTosu?: string;
  shukuyo?: string;
  rikujinShinka?: string;
  geniusCode?: string;
  mbtiEstimation?: string;
  enneagramEstimation?: number;
  bigfiveEstimation?: {
    O: number;
    C: number;
    E: number;
    A: number;
    N: number;
  };
  socionicsEstimation?: string;
  lovetypeEstimation?: string;
}

// 完全な診断結果
export interface DiagnosisResult {
  id: string;
  createdAt: string;
  input: DiagnosisInput;
  stage1Results: Stage1Results;
  stage2And3Results?: Stage2And3Results;
  fortuneRawData?: FortuneRawData;
}
