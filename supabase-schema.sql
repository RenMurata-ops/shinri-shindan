-- ============================================
-- 真理診断 Supabaseデータベーススキーマ
-- ============================================

-- UUID拡張を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. diagnoses テーブル（診断結果）
-- ============================================

CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 入力情報（6問の質問）
  last_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name_kana VARCHAR(100),
  first_name_kana VARCHAR(100),
  birth_date DATE NOT NULL,
  birth_time TIME,
  birth_prefecture VARCHAR(50),
  gender VARCHAR(20) NOT NULL,
  core_value VARCHAR(50), -- 質問6: 最も大切にしている価値観

  -- 真理探究占星の診断結果（第一段階）
  stage1_results JSONB NOT NULL,

  -- 深層診断結果（第二・第三段階）
  stage2_and_3_results JSONB,

  -- 裏側の占い結果（SEO用、ユーザーには非表示）
  fortune_raw_data JSONB,

  -- メタ情報
  ip_address INET,
  user_agent TEXT
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_diagnoses_created_at ON diagnoses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnoses_birth_date ON diagnoses(birth_date);

-- ============================================
-- 2. serial_codes テーブル（シリアルコード）
-- ============================================

CREATE TABLE IF NOT EXISTS serial_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(23) UNIQUE NOT NULL, -- SHINRI-XXXX-XXXX-XXXX
  diagnosis_id UUID NOT NULL REFERENCES diagnoses(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ,
  is_used BOOLEAN DEFAULT FALSE,

  -- セキュリティ・トラッキング
  access_count INTEGER DEFAULT 0,
  last_access_ip INET,
  last_access_at TIMESTAMPTZ
);

-- インデックス作成
CREATE UNIQUE INDEX IF NOT EXISTS idx_serial_codes_code ON serial_codes(code);
CREATE INDEX IF NOT EXISTS idx_serial_codes_diagnosis_id ON serial_codes(diagnosis_id);
CREATE INDEX IF NOT EXISTS idx_serial_codes_is_used ON serial_codes(is_used);

-- ============================================
-- 3. line_integrations テーブル（LINE連携）
-- ============================================

CREATE TABLE IF NOT EXISTS line_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serial_code_id UUID REFERENCES serial_codes(id) ON DELETE SET NULL,

  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  line_user_id VARCHAR(100), -- LINE連携後に更新される
  integrated_at TIMESTAMPTZ,

  -- トラッキング
  ip_address INET,
  user_agent TEXT
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_line_integrations_serial_code ON line_integrations(serial_code_id);
CREATE INDEX IF NOT EXISTS idx_line_integrations_line_user ON line_integrations(line_user_id);

-- ============================================
-- 4. app_settings テーブル（管理画面用）
-- ============================================

CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by VARCHAR(100)
);

-- インデックス作成
CREATE UNIQUE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(key);

-- 初期データ挿入
INSERT INTO app_settings (key, value, description) VALUES
('line_official_url', '', 'LINE公式アカウントのURL'),
('line_qr_code_url', '', 'LINE QRコードの画像URL'),
('vip_page_enabled', 'true', 'VIPページの有効/無効'),
('maintenance_mode', 'false', 'メンテナンスモード')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 5. image_assets テーブル（画像管理用）
-- ============================================

CREATE TABLE IF NOT EXISTS image_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(50) NOT NULL, -- 'hero', 'archetype', 'star', 'other'
  key VARCHAR(100) UNIQUE NOT NULL, -- 'hero_background', 'archetype_seeker', etc.
  display_name VARCHAR(200) NOT NULL, -- 管理画面での表示名
  file_name VARCHAR(255) NOT NULL, -- 実際のファイル名
  storage_url TEXT NOT NULL, -- Supabase Storageの完全URL
  file_size INTEGER, -- バイト単位
  mime_type VARCHAR(50),
  width INTEGER,
  height INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス作成
CREATE UNIQUE INDEX IF NOT EXISTS idx_image_assets_key ON image_assets(key);
CREATE INDEX IF NOT EXISTS idx_image_assets_category ON image_assets(category);

-- 初期データ挿入（デフォルト画像パスの定義）
INSERT INTO image_assets (category, key, display_name, file_name, storage_url) VALUES
-- ヒーロー・背景
('hero', 'hero_background', 'ヒーロー背景', '', ''),
('hero', 'gradient_1', 'グラデーション背景1', '', ''),
('hero', 'particle_field', 'パーティクルフィールド', '', ''),

-- アーキタイプ（12種）
('archetype', 'archetype_creator', '創造者（The Creator）', '', ''),
('archetype', 'archetype_guardian', '守護者（The Guardian）', '', ''),
('archetype', 'archetype_seeker', '探求者（The Seeker）', '', ''),
('archetype', 'archetype_mediator', '調停者（The Mediator）', '', ''),
('archetype', 'archetype_innovator', '革新者（The Innovator）', '', ''),
('archetype', 'archetype_nurturer', '養育者（The Nurturer）', '', ''),
('archetype', 'archetype_warrior', '戦士（The Warrior）', '', ''),
('archetype', 'archetype_sage', '賢者（The Sage）', '', ''),
('archetype', 'archetype_artist', '芸術家（The Artist）', '', ''),
('archetype', 'archetype_leader', '統率者（The Leader）', '', ''),
('archetype', 'archetype_healer', '癒し手（The Healer）', '', ''),
('archetype', 'archetype_adventurer', '冒険者（The Adventurer）', '', ''),

-- 星座（9種）
('star', 'star_1', '第1星：完璧の星', '', ''),
('star', 'star_2', '第2星：愛情の星', '', ''),
('star', 'star_3', '第3星：達成の星', '', ''),
('star', 'star_4', '第4星：個性の星', '', ''),
('star', 'star_5', '第5星：知恵の星', '', ''),
('star', 'star_6', '第6星：忠誠の星', '', ''),
('star', 'star_7', '第7星：楽観の星', '', ''),
('star', 'star_8', '第8星：力の星', '', ''),
('star', 'star_9', '第9星：調和の星', '', ''),

-- その他
('other', 'loading_animation', 'ローディングアニメーション', '', ''),
('other', 'line_qr', 'LINE QRコード', '', ''),
('other', 'ogp_image', 'OGP画像', '', ''),
('other', 'favicon', 'ファビコン', '', '')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- Row Level Security (RLS) ポリシー設定
-- ============================================

-- diagnoses テーブル
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "診断結果は誰でも作成可能" ON diagnoses
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "診断結果は誰でも閲覧可能" ON diagnoses
  FOR SELECT USING (true);

-- serial_codes テーブル
ALTER TABLE serial_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "シリアルコードは誰でも閲覧可能" ON serial_codes
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "シリアルコードは誰でも作成可能" ON serial_codes
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "シリアルコードは誰でも更新可能" ON serial_codes
  FOR UPDATE USING (true);

-- line_integrations テーブル
ALTER TABLE line_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "LINE連携データは誰でも作成可能" ON line_integrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "LINE連携データは誰でも閲覧可能" ON line_integrations
  FOR SELECT USING (true);

-- app_settings テーブル
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "設定は誰でも読み取り可能" ON app_settings
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "設定の更新は誰でも可能" ON app_settings
  FOR UPDATE USING (true);

-- image_assets テーブル
ALTER TABLE image_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "画像は誰でも閲覧可能" ON image_assets
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "画像は誰でも作成可能" ON image_assets
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "画像は誰でも更新可能" ON image_assets
  FOR UPDATE USING (true);

CREATE POLICY IF NOT EXISTS "画像は誰でも削除可能" ON image_assets
  FOR DELETE USING (true);

-- ============================================
-- トリガー：updated_at自動更新
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_diagnoses_updated_at BEFORE UPDATE ON diagnoses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_settings_updated_at BEFORE UPDATE ON app_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_image_assets_updated_at BEFORE UPDATE ON image_assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 完了メッセージ
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '===========================================';
  RAISE NOTICE '真理診断データベースのセットアップが完了しました！';
  RAISE NOTICE '===========================================';
END $$;
