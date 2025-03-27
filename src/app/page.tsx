"use client";
import SearchComponent from "./components/SearchComponent";
import DisplayComponent from "./components/DisplayComponent";
import PokemonDetails from "./components/PokemonDetails";
import React, { useEffect, useState } from "react";
import { GetAPI } from "@/utils/DataService";

export default function Home() {
  const [searchInput, setSearchInput] = useState<string | number>("");
  const [pokemonName, setPokemonName] = useState<string | number>("");

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleButtonClick = () => {
    setPokemonName(searchInput);
  };
  const PokemonDetailsObj = [
    { Type: "Type" },
    { Abilities: "Abilities" },
    { Moves: "Moves" },
    { Location: "Location" },
    { Evolution: "Evolution" },
  ];

  useEffect(() => {
    const GetPokeData = async () => {
      //Make a condition to only call the Api when pokemonName is not an empty string
      if (pokemonName) {
        try {
          const pokemon = await GetAPI(pokemonName);
          console.log(pokemon);
          if (pokemon) {
            const {
              sprites,
              name,
              id,
              location_area_encounters,
              moves,
              types,
              species,
              abilities,
            } = pokemon;
          }
        } catch (error) {
          console.error("unable to retrieve data", error);
        }
      }
    };
    GetPokeData();
  }, [pokemonName]);

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
        <SearchComponent
          value={searchInput}
          onChange={handleInputSearch}
          onClick={handleButtonClick}
        />
      </header>
      <main className="w-full h-[85%] flex flex-col justify-center items-center gap-3">
        <section className="w-[80%] h-[300px] bg-black/60 backdrop-blur-md border-2 border-yellow-600 rounded-2xl">
          <DisplayComponent />
        </section>
        <section className="w-[80%] h-[85%] bg-black/60 backdrop-blur-md border-2 rounded-2xl border-yellow-600 overflow-y-auto">
          <PokemonDetails Title="Type" pokename="sdf" />
        </section>
      </main>
    </div>
  );
}
