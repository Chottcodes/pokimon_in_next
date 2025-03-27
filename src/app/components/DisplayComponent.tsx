import Image from "next/image";
import React from "react";

interface propTypes {
  pokemonName: string;
  pokemonImage?: string;
}

const DisplayComponent = (props: propTypes) => {
  const { pokemonName, pokemonImage } = props;
  return (
    <div className="w-full h-[75%]">
      <div className="w-full h-full flex flex-col justify-center items-center">
      <section className="w-full h-full flex flex-col justify-center items-center">
          {pokemonImage ? (
            <Image 
              src={pokemonImage} 
              width={100}
              height={100} 
              alt={`${pokemonName} sprite`} 
              priority 
              style={{ objectFit: 'contain' }} 
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
        <button className="w-[35px] h-[35px] cursor-pointer">
          <Image
            src={"/assets/images/heart(1).png"}
            alt="heart icon"
            width={100}
            height={100}
          />
        </button>
        <button className="w-[35px] h-[35px] cursor-pointer">
          <Image
            src={"/assets/images/dice.png"}
            alt="heart icon"
            width={100}
            height={100}
          />
        </button>
        <button className="w-[35px] h-[35px] cursor-pointer ">
          <Image
            src={"/assets/images/shining.png"}
            alt="heart icon"
            width={100}
            height={100}
          />
        </button>
      </div>
    </div>
  );
};

export default DisplayComponent;
