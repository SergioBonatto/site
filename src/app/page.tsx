import Navbar from "@/components/Nav";
import SolarSystem from "@/components/solarSystem";
import MusicPlayer from "@/components/musicPlayer";
import About from "@/components/About/about";
import Contact from "@/components/Contact/contact";

export default function Home() {
  return (
    <div className="bg-teal-600">
      <Navbar />
      <MusicPlayer />
      <SolarSystem />
      <About />
      <Contact />
    </div>
  );
}
