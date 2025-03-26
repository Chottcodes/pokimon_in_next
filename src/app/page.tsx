import Image from "next/image";
import SearchComponent from "./components/SearchComponent";
import DisplayComponent from "./components/DisplayComponent";
import PokemonDescription from "./components/PokemonDescription";

export default function Home() {
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: "url('/assets/images/pokemonbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="w-full h-[100px]">
        <SearchComponent />
      </header>
      <main className="w-full h-[85%] flex flex-col justify-center items-center gap-3">
        <section className="w-[80%] h-[300px] bg-black/60 backdrop-blur-md border-2 border-yellow-600 rounded-2xl">
          <DisplayComponent />
        </section>
        <section className="w-[80%] h-[85%] bg-black/60 backdrop-blur-md border-2 rounded-2xl border-yellow-600 overflow-y-auto">
          <PokemonDescription />
        </section>
      </main>
    </div>
  );
}
