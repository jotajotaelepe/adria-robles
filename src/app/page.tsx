import Collage from "@/components/Collage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Header title="Adria Robles." />
      <main>
        <Hero />
        <Collage />
      </main>
      <Footer />
    </>
  );
}
