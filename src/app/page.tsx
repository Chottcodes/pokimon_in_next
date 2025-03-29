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
  capitalizeFirstChar,
  formatForSearch,
  getAllEvolutionData,
  mapAbilities,
  mapMoves,
  randomize,
} from "@/utils/helperfunctions";
import LikesComponent from "./components/LikesComponent";
import { getFromLocalStorage } from "@/utils/localStorage";

export default function Home() {
  const [searchInput, setSearchInput] = useState<string | number>("");
  const [pokemonName, setPokemonName] = useState<string | number>("Pikachu");
  const [pokemonNameDisplay, setPokemonNameDisplay] = useState<string>("");
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<string>("");
  const [pokemonSpecies, setPokemonSpecies] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState<boolean>(false);
  const [pokemonAbilities, setPokemonAbilities] = useState<string[]>([]);
  const [pokemonMoves, setPokemonMoves] = useState<string[]>([]);
  const [pokemonLocation, setPokemonLocation] = useState<string[]>([]);
  const [pokemonEvolution, setPokemonEvolution] = useState<string[]>([]);

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleButtonClick = () => {
    const stringNumberArr: string[] = [
      "1",
      "2",
      "3",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
    ];
    if (
      typeof searchInput === "string" &&
      stringNumberArr.some((char) => searchInput.includes(char))
    ) {
      const convertInput = Number(searchInput);
      if (convertInput < 660) {
        setPokemonName(convertInput);
        setIsFieldEmpty(false);
        console.log('number')
      }else{
        setSearchInput('')
        setIsFieldEmpty(true);
      }
    } else {
      const formattedName = formatForSearch(String(searchInput));
      setPokemonName(formattedName);
      setIsFieldEmpty(false);
      console.log("nope");
    }

  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const stringNumberArr: string[] = [
        "1",
        "2",
        "3",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
      ];
      if (
        typeof searchInput === "string" &&
        stringNumberArr.some((char) => searchInput.includes(char))
      ) {
        const convertInput = Number(searchInput);
        if (convertInput < 660) {
          setPokemonName(convertInput);
          setIsFieldEmpty(false);
          console.log('number')
        }else{
          setSearchInput('')
          setIsFieldEmpty(true);
        }
      } else {
        const formattedName = formatForSearch(String(searchInput));
        setPokemonName(formattedName);
        setIsFieldEmpty(false);
        console.log("nope");
      }

      // const numericInput = Number(searchInput);
      // if (!isNaN(numericInput) && numericInput < 660) {
      //   const inputFormat = formatForSearch(String(numericInput));
      //   setPokemonName(inputFormat);
      //   setIsFieldEmpty(false);
      //   console.log(typeof numericInput) // Reset the empty field state
      // }
      // else {
      //   const formattedName = formatForSearch(String(searchInput));
      //     setPokemonName(formattedName);
      //     setIsFieldEmpty(false);
      //     console.log(typeof numericInput)
      // }
    }
  };
  const FavoriteOnClick = () => {
    if (typeof window !== "undefined") {
      const localStorageData = getFromLocalStorage();
      const favoritesArray: string[] = localStorageData
        ? JSON.parse(localStorageData)
        : [];
      if (
        pokemonNameDisplay != "" &&
        !favoritesArray.includes(pokemonNameDisplay)
      ) {
        favoritesArray.push(pokemonNameDisplay);
      }
      localStorage.setItem("PokeFavorites", JSON.stringify(favoritesArray));
      setIsFavorite(true);
    }
  };
  const DislikeOnClick = () => {
    if (typeof window !== "undefined") {
      const getFavorites = JSON.parse(
        localStorage.getItem("PokeFavorites") || "[]"
      );
      const updatedFavorites = getFavorites.filter(
        (name: string) => name !== pokemonNameDisplay
      );
      localStorage.setItem("PokeFavorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    }
  };
  const handleShiny = () => {
    setIsShiny(!isShiny);
    resetInput();
  };
  const handleRandomization = () => {
    const randomNumber = randomize();
    setPokemonName(randomNumber);
    resetInput();
  };
  const resetInput = () => {
    setSearchInput("");
    setIsFieldEmpty(false);
  };

  useEffect(() => {
    const GetPokeData = async () => {
      //Make a condition to only call the Api when pokemonName is not an empty string
      if (pokemonName) {
        try {
          const pokemon = await GetAPI(pokemonName);
          if (pokemon) {
            const { sprites, id, name, moves, types, species, abilities } =
              pokemon;
            const capitalLetter = capitalizeFirstChar(name);
            const abilitiesList = mapAbilities(abilities);
            const movesList = mapMoves(moves);
            setPokemonNameDisplay(capitalLetter);
            setPokemonType(types[0].type.name);
            setPokemonAbilities(abilitiesList);
            setPokemonMoves(movesList);
            setPokemonSpecies(species.name);
            setPokemonId(id);
            if (!isShiny) {
              setPokemonImage(sprites.front_default);
            } else {
              setPokemonImage(sprites.front_shiny);
            }
            if (pokemonId) {
              const getLocations = await GetPokeLocation(pokemonId);
              if (getLocations.length > 0) {
                const locationNames = getLocations.map(
                  (locations) => locations.location_area.name
                );
                setPokemonLocation(locationNames);
              } else {
                setPokemonLocation(["N/A"]);
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
  }, [pokemonName, pokemonId, isShiny]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localStorageFavorites = getFromLocalStorage();
      if (localStorageFavorites?.includes(pokemonNameDisplay)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [pokemonNameDisplay]);
  useEffect(() => {
    if (searchInput != "") setIsFieldEmpty(false);
  }, [searchInput]);

  return (
    <div
      className="w-full h-screen  overflow-hidden relative"
      style={{
        backgroundImage: "url('/assets/images/pokemonbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="w-full h-[100px]  flex justify-center items-center">
        <SearchComponent
          isEmpty={isFieldEmpty}
          value={searchInput}
          onChange={handleInputSearch}
          onClick={handleButtonClick}
          handleKeyDown={handleOnKeyDown}
        />
      </header>
      <main className="w-full h-[85%] flex flex-col lg:flex-row justify-center items-center gap-3 transform-all duration-300">
        <section className="w-[80%] h-[300px] lg:w-[25%] lg:h-[50%] bg-black/60 backdrop-blur-md border-2 border-yellow-600 rounded-2xl">
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
        <section className="w-[80%] h-[85%] lg:w-[40%] transform-all duration-300 bg-black/60 backdrop-blur-md border-2 rounded-2xl border-yellow-600 overflow-y-auto scrollable-section">
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
      <LikesComponent
        onFavoriteClick={(pokemonName) => setPokemonName(pokemonName)}
      />
    </div>
  );
}
