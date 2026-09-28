import { redirect } from 'next/navigation';
import { DUAS } from '@/lib/quranData';

export default function DuaIndexPage() {
  const defaultSlug = DUAS[0]?.slug || 'dua-when-starting-any-good-task';
  redirect(`/resources/downloads/dua/${defaultSlug}`);
}
