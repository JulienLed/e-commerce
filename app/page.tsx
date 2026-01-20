import About from "@/components/server/home/About";
import Hero from "@/components/server/home/Hero";

export default async function Page() {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
    </div>
  );
}
