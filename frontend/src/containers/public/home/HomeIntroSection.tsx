import Image from "next/image";

export default function HomeIntroSection() {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold uppercase">Bienvenue sur WILDRENT,</h1>
        <p className="opacity-70">Que souhaitez vous louer aujourd’hui ?</p>
      </div>
      <div className="relative">
        <Image
          fill
          alt=""
          className="object-cover w-full h-full rounded-xl"
          src="/images/home/intro-bg.jpg"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-70 rounded-xl"></div>
        <div className="relative min-h-[600px] flex justify-center items-center">
          <div className="py-20">
            <h2 className="max-w-[800px] text-6xl text-center font-bold text-white">Louez aujourd&apos;hui, venez le récupérer dans l&apos;heure</h2>
          </div>
        </div>
      </div>
    </section>
    
  );
}
