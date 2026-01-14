export default async function Home() {
  return (
    <div className="flex justify-center w-full h-full mx-auto">
      <section id="hero w-screen">
        <div className="relative w-screen h-[60vh] overflow-hidden">
          <video
            src={"/hero-e-liquid.webm"}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
