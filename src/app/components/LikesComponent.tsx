"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFromLocalStorage } from "@/utils/localStorage";
interface propTypes {
  onFavoriteClick?: (cityName: string) => void;
}
const LikesComponent = (props: propTypes) => {
  const { onFavoriteClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined") {
        const loadFavorites = () => {
          const favoritesData = getFromLocalStorage();
          if (favoritesData) {
            setFavorites(JSON.parse(favoritesData));
          }
        };
        loadFavorites();
      }
    }
  }, [isOpen]);
  const handleFavoriteClick = (pokemonName: string) => {
    if (onFavoriteClick) {
      onFavoriteClick(pokemonName);
    }
    handleOpen();
  };
  return (
    <div
      className={`w-full absolute flex flex-col justify-between items-center bg-black/90 border-amber-600 border-t-2 rounded-t-2xl bottom-0 transition-all duration-300 ease-in-out ${
        isOpen ? "h-[50%]" : "h-0 border-none"
      }`}
    >
      <section className=" h-[30%] w-full flex flex-col justify-center items-center">
        <button className="cursor-pointer w-10" onClick={handleOpen}>
          <Image
            src={"/assets/images/downArrow.png"}
            width={50}
            height={50}
            alt={"Heart Icon"}
            style={{
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
        <h2 className="text-3xl text-[#FFCA00] pt-5">Favorites</h2>
        <hr className="w-[80%] h-1 text-[#FFCA00]" />
      </section>
      <section className="w-full h-[70%] mt-2">
        <div className="w-full h-[90%] flex flex-col gap-3 text-2xl overflow-y-auto">
          <ul className="flex flex-col items-center space-y-6 mt-10 text-black">
            {favorites.map((favorite, index) => (
              <li key={index} className="w-full text-center">
                <button
                  onClick={() => handleFavoriteClick(favorite)}
                  className="text-lg text-[#FFCA00] hover:text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 w-full"
                >
                  {favorite}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LikesComponent;
