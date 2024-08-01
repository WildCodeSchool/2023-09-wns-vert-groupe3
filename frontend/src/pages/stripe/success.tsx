import Link from "next/link";

const Success = () => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <h3 className="mb-4 text-4xl font-bold">Paiement Réussi 🎉 !</h3>
      <img
        src="https://i.gifer.com/origin/5f/5fa2b63c40c70da800bf9e7e5195645e_w200.gif"
        alt="gif celebrate"
      />
      <p className="text-lg">
        Votre paiement a été envoyé avec succès. Merci pour votre achat !
      </p>
      <Link
        href="/"
        className="mt-6 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
};

export default Success;
