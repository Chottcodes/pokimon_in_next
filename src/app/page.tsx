"use client";
import SearchComponent from "./components/SearchComponent";
import DisplayComponent from "./components/DisplayComponent";
import PokemonDetails from "./components/PokemonDetails";
import React, { useEffect, useState } from "react";
import {
  GetAPI,
  GetEvolutionChain,
  GetPokeLocation,
  GetpokemonSpecies,
} from "@/utils/DataService";
import {
  formatForSearch,
  getAllEvolutionData,
  mapAbilities,
  mapMoves,
  randomize,
} from "@/utils/helperfunctions";

export default function Home() {
  const [searchInput, setSearchInput] = useState<string | number>("");
  const [pokemonName, setPokemonName] = useState<string | number>("Pikachu");
  const [pokemonNameDisplay, setPokemonNameDisplay] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<string>("");
  const [pokemonSpecies, setPokemonSpecies] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number>();
  const [isFavorite,setIsFavorite]=useState<boolean>(false);
  const [isShiny,setIsShiny]=useState<boolean>(false);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([]);
  const [pokemonMoves, setPokemonMoves] = useState<string[]>([]);
  const [pokemonLocation, setPokemonLocation] = useState<string[]>([]);
  const [pokemonEvolution, setPokemonEvolution] = useState<string[]>([]);

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleButtonClick = () => {
    if (typeof searchInput === "string") {
      const inputFormat = formatForSearch(searchInput);
      setPokemonName(inputFormat);
      console.log("formated input", inputFormat);
    }
  };
  const FavoriteOnClick = ()=>{
    setIsFavorite(true);
  }
  const DislikeOnClick = ()=>{
    setIsFavorite(false);
  }
  const handleShiny = ()=>{
      setIsShiny(!isShiny)
  }
  const handleRandomization=()=>{
    const randomNumber = randomize()
      setPokemonName(randomNumber)
  }

  useEffect(() => {
    const GetPokeData = async () => {
      //Make a condition to only call the Api when pokemonName is not an empty string
      if (pokemonName) {
        try {
          const pokemon = await GetAPI(pokemonName);
          if (pokemon) {
            const { sprites, id, name, moves, types, species, abilities } =
              pokemon;
            const abilitiesList = mapAbilities(abilities);
            const movesList = mapMoves(moves);
            setPokemonNameDisplay(name);
            setPokemonType(types[0].type.name);
            setPokemonAbilities(abilitiesList);
            setPokemonMoves(movesList);
            setPokemonSpecies(species.name);
            setPokemonId(id);
            if(!isShiny){
              setPokemonImage(sprites.front_default);
            }else{
              setPokemonImage(sprites.front_shiny);
            }
            if (pokemonId) {
              const getLocations = await GetPokeLocation(pokemonId);
              if(getLocations.length>0){
                const locationNames = getLocations.map(
                  (locations) => locations.location_area.name
                );
                setPokemonLocation(locationNames);
              }
              else{
                setPokemonLocation(['N/A']);
              }
            }
            if (pokemonName) {
              const GetSpecies = await GetpokemonSpecies(pokemonName);
              const { evolution_chain } = GetSpecies;
              const evolutionURL = evolution_chain.url;
              const EvolutionChainData = await GetEvolutionChain(evolutionURL);
              const EvolutionDataChain = EvolutionChainData.chain;
              const AllEvolutions = getAllEvolutionData(EvolutionDataChain);
              if (AllEvolutions) {
                setPokemonEvolution(AllEvolutions);
              } else {
                setPokemonEvolution(["N/A"]);
              }
            }
          }
        } catch (error) {
          console.error("unable to retrieve data", error);
        }
      }
    };
    GetPokeData();
  }, [pokemonName, pokemonId,isShiny]);

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
          <DisplayComponent
            pokemonName={pokemonNameDisplay}
            pokemonImage={pokemonImage}
            isFavorite={isFavorite}
            favoriteOnClick={FavoriteOnClick}
            dislikeOnClick={DislikeOnClick}
            isShiny={isShiny}
            handleShine={handleShiny}
            randomize={handleRandomization}
          />
        </section>
        <section className="w-[80%] h-[85%] bg-black/60 backdrop-blur-md border-2 rounded-2xl border-yellow-600 overflow-y-auto">
          <PokemonDetails Title="Type" pokename={pokemonType} />
          <PokemonDetails
            Title="Abilities"
            pokename={pokemonAbilities.join(", ")}
          />
          <PokemonDetails Title="Moves" pokename={pokemonMoves.join(", ")} />
          <PokemonDetails Title="Species" pokename={pokemonSpecies} />
          <PokemonDetails
            Title="Location"
            pokename={pokemonLocation.join(", ")}
          />
          <PokemonDetails
            Title="Evolution"
            pokename={pokemonEvolution.join(", ")}
          />
        </section>
      </main>
    </div>
  );
}
