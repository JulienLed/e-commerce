import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-screen h-[50vh] max-h-100 overflow-hidden mask-b-from-95% mask-b-to-100% mask-t-from-95% mask-t-to-100%">
      <Image
        alt="hero-image"
        src={"/hero-image.jpg"}
        fill
        priority
        className="object-cover"
      />
      <h1 className="absolute top-[10%] left-[5%] text-5xl text-sky-600 text-shadow-lg font-bold p-3 rounded-md bg-fuchsia-50/90">
        SMOKE, Votre boutique de vape en ligne
      </h1>
      <h2 className="absolute top-[50%] left-[10%] text-3xl text-sky-600 text-shadow-lg font-bold p-3 rounded-md bg-fuchsia-50/90">
        Découvrez notre sélection d'e-cigarettes et e-liquides premium
      </h2>
      <Button
        className="absolute bottom-[10%] right-[10%] text-xl text-sky-600 bg-fuchsia-50/90! hover:translate-0.5 hover:bg-fuchsia-200/90!"
        asChild
      >
        <Link href={"/E-Cigarette"}>Voir nos produits</Link>
      </Button>
    </div>
  );
}
