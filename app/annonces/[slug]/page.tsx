import AnnonceDetail from '@/components/AnnonceDetail/AnnonceDetailPage';

export default async function AnnonceDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  return <AnnonceDetail slug={slug} />;
}