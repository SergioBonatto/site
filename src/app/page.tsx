import Navbar from "@/components/Nav";
import SolarSystem from "@/components/solarSystem";
import MusicPlayer from "@/components/musicPlayer";

export default function Home() {
  return (
    <div className="bg-teal-600">
      <Navbar />
      <MusicPlayer />
      <SolarSystem />
    </div>
  );
}
