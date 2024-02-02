import Link from "next/link";
import Image from "next/image";

export default function MainHeader() {
  return (
    <header className="px-10 py-5">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          src="/wildrent-logo.png"
          alt="Wildrent logo"
          width={56}
          height={56}
        />
        <h1 className="text-3xl font-bold uppercase">Wildrent</h1>
      </Link>
    </header>
  );
}