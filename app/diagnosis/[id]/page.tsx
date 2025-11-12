import { notFound, redirect } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase/client';
import DiagnosisResult from '@/components/diagnosis/DiagnosisResult';

interface PageProps {
  params: {
    id: string;
  };
}

async function getDiagnosis(id: string) {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('diagnoses')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function DiagnosisPage({ params }: PageProps) {
  const diagnosis = await getDiagnosis(params.id);

  if (!diagnosis) {
    notFound();
  }

  return <DiagnosisResult diagnosis={diagnosis} />;
}

export async function generateMetadata({ params }: PageProps) {
  const diagnosis = await getDiagnosis(params.id);

  if (!diagnosis) {
    return {
      title: '診断結果が見つかりません | 真理診断',
    };
  }

  const stage1 = (diagnosis as any).stage1_results as any;

  return {
    title: `あなたは「${stage1.archetype}」です | 真理診断`,
    description: stage1.archetypeDescription?.substring(0, 150),
  };
}
