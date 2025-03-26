import React from "react";

const SearchComponent = () => {
  return (
    <form className="w-full h-full flex justify-center items-center gap-5">
      <input
        type="text"
        className="bg-black h-[50%] w-[55%] rounded-lg border-1 border-[#FFCA00] text-[#FFCA00] placeholder-[#FFCA00] pl-5"
        placeholder="Name or Pokedex #"
      />
      <button className="w-[30%] h-[50%] bg-black rounded-lg text-[#FFCA00] border-1 flex justify-center items-center">
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
