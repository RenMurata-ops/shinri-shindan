import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase';
import DiagnosisResultClient from './DiagnosisResultClient';

export default async function DiagnosisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: diagnosis, error } = await supabase
    .from('diagnoses')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !diagnosis) {
    notFound();
  }

  return <DiagnosisResultClient diagnosis={diagnosis} />;
}
