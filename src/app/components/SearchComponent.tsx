import React from "react";
interface propTypes {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  isEmpty: boolean;
  handleKeyDown:(e: React.KeyboardEvent<HTMLInputElement>)=>void;
}
const SearchComponent = (props: propTypes) => {
  const { value, onChange, onClick, isEmpty,handleKeyDown } = props;
  return (
    <form className="w-full h-full lg:w-[40%] flex justify-center items-center gap-5 transform-all duration-300">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`${
          isEmpty
            ? "border-red-500 border-2 text-red-500 placeholder-red-500"
            : "border-[#FFCA00]"
        } bg-black h-[50%] w-[55%] rounded-lg border-1 text-[#FFCA00] placeholder-[#FFCA00] pl-5`}
        placeholder={`${
          isEmpty
            ? "Invalid enter name or pokedex number under 650"
            : "Pokemon name or Pokedex"
        } `}
      />
      <button
        onClick={onClick}
        type="button"
        className="w-[30%] h-[50%] bg-black rounded-lg text-[#FFCA00] border-1 flex justify-center items-center"
      >
        Search
      </button>
    </form>
  );
};

export default SearchComponent;
