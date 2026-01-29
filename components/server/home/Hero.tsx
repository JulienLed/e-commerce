import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative flex justify-center w-screen h-[50vh] max-h-100 overflow-hidden mask-y-from-95% mask-y-to-100%">
      <Image
        alt="hero-image"
        src={"/hero-image.jpg"}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-fuchsia-200/40" />
      <h1 className="absolute max-w-[95%] md:max-w-[80%] top-1/4 text-lg md:text-3xl lg:text-5xl font-bold text-shadow-fuchsia-200 text-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
        {"SMOKE, Votre boutique de vape en ligne"}
      </h1>
      <h2 className="absolute max-w-[95%] md:max-w-[80%] top-1/2 text-base md:text-xl lg:text-3xl font-bold text-shadow-fuchsia-200 text-shadow-[0_0_2px_rgba(0,0,0,0.9)]">
        {"Découvrez notre sélection d'e-cigarettes et e-liquides premium"}
      </h2>
      <Button
        className="absolute bottom-1/7 md:bottom-1/6 right-3! md:right-1/10! text-base md:text-xl hover:translate-0.5 hover:bg-fuchsia-200/90!"
        asChild
      >
        <Link href={"/E-Cigarette"}>Voir nos produits</Link>
      </Button>
    </div>
  );
}
