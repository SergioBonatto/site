'use client';
import Navbar from '@/components/Nav';
import Footer from '@/components/Footer/footer';

export default function NotFound() {

  // Default 404 page
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center text-white text-center"
        style={{
          backgroundColor: 'grey',
          backgroundImage: 'url(/buzz-no-signs-of-intelligent-life.gif)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center',
        }}
      >
        <div className="mt-auto pb-8">
          <h2 className="text-2xl font-bold">
            Seems like no sign of intelligent life anywhere. 🤨
          </h2>
        </div>
      </main>
      <Footer />
    </div>
  );
}
