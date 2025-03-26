import React from "react";

interface propTypes{
    Title:string
}
const PokemonDetails = (props:propTypes) => {
    const {Title} = props
  return (
    <div className="w-full h-[150px] flex flex-col justify-center items-center">
      <header className="w-full h-[50%] text-[#FFCA00] flex flex-col justify-center items-center gap-3 text-2xl">
        <h2>{Title}</h2>
        <hr className="w-[90%]" />
      </header>
      <section className="w-full h-[50%] overflow-y-auto flex flex-col justify-center items-center">
        <div className="h-full">
            
        </div>
      </section>
    </div>
  );
};

export default PokemonDetails;
