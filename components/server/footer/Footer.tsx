import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";
import { PhoneIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="grid grid-cols-3 bg-fuchsia-200/80">
      <section
        id="about"
        className="col-span-3 flex flex-col gap-2 items-center w-full"
      >
        <Image alt="logo" src={"/logo.png"} width={50} height={50} />
        <span>{"Votre shop vape en ligne"}</span>
      </section>
      <section
        id="navigation"
        className="justify-self-center flex flex-col gap-2"
      >
        <Link href={"/E-Cigarette"}>{"E-Cigarettes"}</Link>
        <Link href={"/Coil"}>{"Résistances"}</Link>
        <Link href={"/E-Liquid"}>{"E-Liquides"}</Link>
      </section>
      <section id="contact" className="justify-self-center flex flex-col gap-2">
        <a href="mailto:smoke@smoke.com" className="flex gap-2">
          <MailIcon />
          {"smoke@smoke.com"}
        </a>
        <a href="tel:+3223331234" className="flex gap-2">
          <PhoneIcon />
          {"02/333.12.34"}
        </a>
      </section>
      <section id="legal" className="justify-self-center flex flex-col gap-2">
        <Link href={"/legals#mentions-legales"}>Mentions légales</Link>
        <Link href={"/legals#cgv"}>Conditions générales de vente</Link>
        <Link href={"/legals#confidentialite"}>Confidentialité</Link>
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
