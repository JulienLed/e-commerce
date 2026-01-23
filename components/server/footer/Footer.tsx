import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";
import { PhoneIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="grid grid-cols-3 bg-fuchsia-200/80">
      <section
        id="about"
        className="col-span-3 flex flex-col gap-2 items-center w-full pb-5"
      >
        <Image alt="logo" src={"/logo.png"} width={50} height={50} />
        <span>{"Votre shop vape en ligne"}</span>
      </section>
      <section
        id="navigation"
        className="justify-self-center flex flex-col gap-2 border-l-2 border-fuchsia-950 pl-2"
      >
        <h3 className="font-bold">Navigation</h3>
        <Link href={"/E-Cigarette"} className="text-sm text-fuchsia-950">
          {"E-Cigarettes"}
        </Link>
        <Link href={"/Coil"} className="text-sm text-fuchsia-950">
          {"Résistances"}
        </Link>
        <Link href={"/E-Liquid"} className="text-sm text-fuchsia-950">
          {"E-Liquides"}
        </Link>
      </section>
      <section
        id="contact"
        className="justify-self-center flex flex-col gap-2 border-l-2 border-fuchsia-950 pl-2"
      >
        <h3 className="font-bold">Contact</h3>
        <a href="mailto:smoke@smoke.com" className="flex gap-2">
          <MailIcon />
          {"smoke@smoke.com"}
        </a>
        <a href="tel:+3223331234" className="flex gap-2">
          <PhoneIcon />
          {"02/333.12.34"}
        </a>
      </section>
      <section
        id="legal"
        className="justify-self-center flex flex-col gap-2 border-l-2 border-fuchsia-950 pl-2"
      >
        <h3 className="font-bold">Smoke</h3>
        <Link
          href={"/legals#mentions-legales"}
          className="text-sm text-fuchsia-950"
        >
          Mentions légales
        </Link>
        <Link href={"/legals#cgv"} className="text-sm">
          Conditions générales de vente
        </Link>
        <Link
          href={"/legals#confidentialite"}
          className="text-sm text-fuchsia-950"
        >
          Confidentialité
        </Link>
      </section>
      <section
        id="signature"
        className="col-span-3 w-full flex justify-center pt-5"
      >
        <p>{"© 2026 Smoke - Tous droits réservés"}</p>
      </section>
    </div>
  );
}
