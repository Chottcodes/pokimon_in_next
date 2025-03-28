import Image from "next/image";
import React from "react";

interface propTypes {
  pokemonName: string;
  pokemonImage?: string;
  isFavorite:boolean;
  isShiny:boolean
  favoriteOnClick: ()=>void;
  dislikeOnClick:()=>void;
  handleShine:()=>void;
  randomize:()=>void
  
}

const DisplayComponent = (props: propTypes) => {
  const { pokemonName, pokemonImage,isFavorite,favoriteOnClick,dislikeOnClick,handleShine,isShiny,randomize } = props;
  return (
    <main className="w-full h-[75%]">
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <section className="w-[50%] h-[70%] flex flex-col justify-center items-center ">
          {pokemonImage ? (
            <Image
              src={pokemonImage}
              width={150}
              height={150}
              alt={`${pokemonName} sprite`}
              priority
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div className="text-white">No image available</div>
          )}
        </section>
        <section className="w-full h-[20%] flex justify-center items-center text-2xl text-yellow-400">
          <p>{pokemonName}</p>
        </section>
      </div>
      <div className="w-full h-[30%] flex justify-evenly items-center">
        <button onClick={favoriteOnClick} className={`${isFavorite? 'hidden':'block' } w-[35px] h-[35px] cursor-pointer`}>
          <Image
            src={"/assets/images/heart(1).png"}
            alt="heart icon"
            width={30}
            height={30}
          />
        </button>
        <button onClick={dislikeOnClick} className={`${isFavorite? 'block' : 'hidden'} w-[35px] h-[35px] cursor-pointer`}>
          <Image
            src={"/assets/images/heart.png"}
            alt="heart icon"
            width={40}
            height={40}
          />
        </button>
        <button onClick={randomize} className="w-[35px] h-[35px] cursor-pointer">
          <Image
            src={"/assets/images/dice.png"}
            alt="Dice icon"
            width={30}
            height={30}
          />
        </button>
        <button onClick={handleShine} className="w-[35px] h-[35px] cursor-pointer">
          <Image
            src={`${isShiny ?'/assets/images/shines (1).png':'/assets/images/shining.png'}`}
            alt="Shine icon"
            width={30}
            height={30}
          />
        </button>
      
      </div>
    </main>
  );
};

export default DisplayComponent;
