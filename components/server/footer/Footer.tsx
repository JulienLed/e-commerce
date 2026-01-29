import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";
import { PhoneIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="grid grid-cols-3 bg-fuchsia-200">
      <section
        id="about"
        className="col-span-3 flex flex-col gap-2 items-center w-full pb-5"
      >
        <Image alt="logo" src={"/logo.png"} width={50} height={50} />
        <span className="text-xs md:text-sm">{"Votre shop vape en ligne"}</span>
      </section>
      <section
        id="navigation"
        className="justify-self-center flex flex-col gap-2 md:border-l-2 border-fuchsia-950 md:pl-2"
      >
        <h3 className="font-bold text-sm md:text-base">Navigation</h3>
        <Link
          href={"/E-Cigarette"}
          className="text-xs md:text-sm text-fuchsia-950"
        >
          {"E-Cigarettes"}
        </Link>
        <Link href={"/Coil"} className="text-xs md:text-sm text-fuchsia-950">
          {"Résistances"}
        </Link>
        <Link
          href={"/E-Liquid"}
          className="text-xs md:text-sm text-fuchsia-950"
        >
          {"E-Liquides"}
        </Link>
      </section>
      <section
        id="contact"
        className="justify-self-center flex flex-col gap-2 md:border-l-2 border-fuchsia-950 pl-2"
      >
        <h3 className="font-bold text-sm md:text-base">Contact</h3>
        <a
          href="mailto:smoke@smoke.com"
          className="flex gap-1 md:gap-2 items-center text-xs md:text-sm"
        >
          <MailIcon className="w-3 h-3 md:w-7 md:h-7" />
          {"smoke@smoke.com"}
        </a>
        <a
          href="tel:+3223331234"
          className="flex gap-1 md:gap-2 items-center text-xs md:text-sm"
        >
          <PhoneIcon className="w-3 h-3 md:w-7 md:h-7" />
          {"02/333.12.34"}
        </a>
      </section>
      <section
        id="legal"
        className="justify-self-center flex flex-col gap-2 md:border-l-2 border-fuchsia-950 pl-2"
      >
        <h3 className="font-bold text-sm md:text-base">Smoke</h3>
        <Link
          href={"/legals#mentions-legales"}
          className="text-xs md:text-sm text-fuchsia-950"
        >
          Mentions légales
        </Link>
        <Link
          href={"/legals#cgv"}
          className="text-xs md:text-sm text-fuchsia-950"
        >
          Conditions générales de vente
        </Link>
        <Link
          href={"/legals#confidentialite"}
          className="text-xs md:text-sm text-fuchsia-950"
        >
          Confidentialité
        </Link>
      </section>
      <section
        id="signature"
        className="col-span-3 w-full flex justify-center pt-5 text-xs md:text-sm"
      >
        <p>{"© 2026 Smoke - Tous droits réservés"}</p>
      </section>
    </div>
  );
}
