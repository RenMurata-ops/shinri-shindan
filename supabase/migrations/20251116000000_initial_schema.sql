-- 1. diagnoses テーブル
CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  core_value VARCHAR(50),

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

-- 2. serial_codes テーブル
CREATE TABLE IF NOT EXISTS serial_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(23) UNIQUE NOT NULL,
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

-- 3. line_integrations テーブル
CREATE TABLE IF NOT EXISTS line_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_code_id UUID REFERENCES serial_codes(id) ON DELETE SET NULL,

  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  line_user_id VARCHAR(100),
  integrated_at TIMESTAMPTZ,

  -- トラッキング
  ip_address INET,
  user_agent TEXT
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_line_integrations_serial_code ON line_integrations(serial_code_id);
CREATE INDEX IF NOT EXISTS idx_line_integrations_line_user ON line_integrations(line_user_id);

-- 4. app_settings テーブル（管理画面用）
CREATE TABLE IF NOT EXISTS app_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by VARCHAR(100)
);

-- 初期データ挿入
INSERT INTO app_settings (key, value, description) VALUES
('line_official_url', '', 'LINE公式アカウントのURL'),
('line_qr_code_url', '', 'LINE QRコードの画像URL'),
('vip_page_enabled', 'true', 'VIPページの有効/無効'),
('maintenance_mode', 'false', 'メンテナンスモード')
ON CONFLICT (key) DO NOTHING;

-- インデックス作成
CREATE UNIQUE INDEX IF NOT EXISTS idx_app_settings_key ON app_settings(key);

-- RLS（Row Level Security）設定
-- diagnoses テーブル
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "診断結果は誰でも作成可能" ON diagnoses;
CREATE POLICY "診断結果は誰でも作成可能" ON diagnoses
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "診断結果は誰でも閲覧可能" ON diagnoses;
CREATE POLICY "診断結果は誰でも閲覧可能" ON diagnoses
  FOR SELECT USING (true);

-- serial_codes テーブル
ALTER TABLE serial_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "シリアルコードは誰でも作成可能" ON serial_codes;
CREATE POLICY "シリアルコードは誰でも作成可能" ON serial_codes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "シリアルコードは誰でも閲覧可能" ON serial_codes;
CREATE POLICY "シリアルコードは誰でも閲覧可能" ON serial_codes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "シリアルコードは誰でも更新可能" ON serial_codes;
CREATE POLICY "シリアルコードは誰でも更新可能" ON serial_codes
  FOR UPDATE USING (true);

-- line_integrations テーブル
ALTER TABLE line_integrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "LINE連携は誰でも作成可能" ON line_integrations;
CREATE POLICY "LINE連携は誰でも作成可能" ON line_integrations
  FOR INSERT WITH CHECK (true);

-- app_settings テーブル
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "設定は誰でも閲覧可能" ON app_settings;
CREATE POLICY "設定は誰でも閲覧可能" ON app_settings
  FOR SELECT USING (true);
