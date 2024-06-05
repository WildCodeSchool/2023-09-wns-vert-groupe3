const ContactSection = () => {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="z-10">
        <h4 className="mb-4 text-4xl font-bold text-white">
          Une question ? Une remarque ? Une requête ?
        </h4>
        <a
          href="mailto:support@example.com"
          className="text-blue-300 hover:underline"
        >
          Contactez notre support &rarr;
        </a>
      </div>

      <img
        src="https://www.explorenicecotedazur.com/content/uploads/2021/09/SKI7.jpg"
        alt="ski"
        width={500}
        height={500}
        className="static -ml-24 rounded-lg"
      />
    </div>
  );
};

export default ContactSection;
