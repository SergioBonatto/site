import HomeComponent from '@/components/Home/index'
import { Locale } from '@/i18n'
import { HomePageClient } from './HomePageClient'
import Walker from '@/components/gb';

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  return (
    <HomePageClient>
      <Walker />
      <HomeComponent params={params} />
    </HomePageClient>
  );
}
