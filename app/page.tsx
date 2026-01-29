import Categories from "@/components/server/home/Categories";
import Hero from "@/components/server/home/Hero";

export default async function Page() {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>
      <section id="categories">
        <h2 className="text-lg md:text-2xl font-bold my-5 md:ml-20 p-1">
          {"Nos Catégories"}
        </h2>
        <Categories />
      </section>
    </div>
  );
}
