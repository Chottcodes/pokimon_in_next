import React from "react";
import PokemonDetails from "./PokemonDetails";

const PokemonDescription = () => {
  return (
    <div className="w-full h-full">
      <section className="w-full h-[10%]">
        <PokemonDetails />
      </section>
    </div>
  );
};

export default PokemonDescription;
