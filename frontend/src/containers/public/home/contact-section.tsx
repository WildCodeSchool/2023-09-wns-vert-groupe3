import Image from "next/image";
import Link from "next/link";

const ContactSection = () => {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="z-10">
        <h4 className="mb-4 text-4xl font-bold text-white">
          Une question ? Une remarque ? Une requête ?
        </h4>
        <Link
          href="mailto:support@example.com"
          className="text-blue-300 hover:underline"
        >
          Contactez notre support &rarr;
        </Link>
      </div>
      <Image
        src="/images/home/Ski-image-contact-section.jpg"
        alt="Ski Image"
        width={500}
        height={500}
        className="static -ml-24 h-auto w-auto rounded-lg"
      />
    </div>
  );
};

export default ContactSection;
