import Image from "next/image";

export default function About() {
  return (
    <div className="relative flex flex-col item-center w-[60%] mx-auto h-[50vh] overflow-y-hidden mt-10">
      <Image alt="paf" src={"/paf.png"} fill priority />
      <p className="absolute w-[50%] top-1/5 left-1/4 text-3xl text-center text-shadow-sky-700 text-shadow-lg font-extrabold text-sky-500">
        Bienvenue dans l'univers Smoke. Ici, pas de blabla : que du matos de
        qualité, des saveurs intenses et une livraison ultra-rapide. Tu vapes,
        on assure. Le reste, c'est du détail.
      </p>
    </div>
  );
}
