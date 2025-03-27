import React from "react";
  interface propTypes{
    value: string|number
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
    onClick:()=>void
  }
const SearchComponent = (props:propTypes) => {
  const {value, onChange, onClick} =props
  return (
    <form className="w-full h-full flex justify-center items-center gap-5">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="bg-black h-[50%] w-[55%] rounded-lg border-1 border-[#FFCA00] text-[#FFCA00] placeholder-[#FFCA00] pl-5"
        placeholder="Name or Pokedex #"
      />
      <button onClick={onClick} type="button" className="w-[30%] h-[50%] bg-black rounded-lg text-[#FFCA00] border-1 flex justify-center items-center">
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
