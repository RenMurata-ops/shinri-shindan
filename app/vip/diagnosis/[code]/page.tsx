import { notFound, redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase';
import VIPDiagnosisClient from './VIPDiagnosisClient';

export default async function VIPDiagnosisPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = createServerSupabaseClient();

  const { data: serialCode, error } = await supabase
    .from('serial_codes')
    .select('*, diagnoses(*)')
    .eq('code', code)
    .single();

  if (error || !serialCode || !serialCode.diagnoses) {
    notFound();
  }

  const diagnosis = serialCode.diagnoses;

  // 第二・第三段階の診断が未生成の場合、生成する
  if (!diagnosis.stage2_and_3_results) {
    // 診断生成をトリガー（実装は簡略化）
    // 本来はClaude APIを呼び出して生成
    redirect(`/vip/diagnosis/${code}/generating`);
  }

  return <VIPDiagnosisClient diagnosis={diagnosis} serialCode={serialCode} />;
}
