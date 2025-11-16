import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase';
import SerialCodeClient from './SerialCodeClient';

export default async function SerialCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const supabase = createServerSupabaseClient();

  const { data: serialCode, error } = await supabase
    .from('serial_codes')
    .select('*, diagnoses(*)')
    .eq('code', code)
    .single();

  if (error || !serialCode) {
    notFound();
  }

  return <SerialCodeClient serialCode={serialCode} />;
}
