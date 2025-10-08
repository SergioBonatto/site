import { Nav } from '@/components/Nav/Nav';

export default function NotFound() {
  // Default 404 page
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
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
    </div>
  );
}
