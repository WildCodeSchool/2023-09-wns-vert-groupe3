import { useEffect, useRef, useState } from "react";

export default function HomeIntroSection() {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;
      const newOpacity = 1 - scrollTop / window.innerHeight;
      setScrollOpacity(Math.min(Math.max(newOpacity, 0), 1));
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold uppercase">
          Bienvenue sur WILDRENT,
        </h1>
        <p className="opacity-70">Que souhaitez-vous louer aujourd’hui ?</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-full rounded-xl bg-gradient-to-t from-black to-transparent opacity-70">
          <video
            ref={videoRef}
            className="h-full w-full rounded-xl object-cover"
            autoPlay
            loop
            muted
            style={{ opacity: scrollOpacity }}
          >
            <source src="/videos/wildrent-landing-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative flex min-h-[600px] items-center justify-center">
          <div className="py-20">
            <h2 className="max-w-[800px] text-center text-6xl font-bold text-white">
              Louez aujourd&apos;hui, venez le récupérer dans l&apos;heure
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
