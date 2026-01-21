import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className="grid-cols-3">
        <section id="about" className="flex flex-col gap-2">
          <Image alt="logo" src={"/logo.png"} width={50} height={50} />
          <span>{"Votre shop vape en ligne"}</span>
        </section>
        <section id="navigation">
          <Link href={"/E-cigarette"}></Link>
        </section>
        <section id="legal"></section>
      </div>
      <section id="signature" className="w-sreen">
        <p>© 2026 Smoke - Tous droits réservés</p>
      </section>
    </div>
  );
}
