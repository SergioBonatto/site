import HomeComponent from '@/components/Home/index'
import { Locale } from '@/i18n'
import { HomePageClient } from './HomePageClient'

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  return (
    <HomePageClient>
      <HomeComponent params={params} />
    </HomePageClient>
  );
}
