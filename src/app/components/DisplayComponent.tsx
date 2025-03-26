import Image from "next/image";
import React from "react";

const DisplayComponent = () => {
  return (
    <div className="w-full h-[75%]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <section className="w-full h-full flex flex-col justify-center items-center">
          <Image
            src="/assets/images/pokemonpika.png"
            width={100}
            height={100}
            alt=""
          />
        </section>
        <section className="w-full h-[20%] flex justify-center items-center text-2xl">
          <p>Pikachu</p>
        </section>
      </div>
      <div className="w-full h-[30%] flex justify-evenly items-center">
        <button className="w-[35px] h-[35px]">
            <Image src={'/assets/images/heart(1).png'} alt="heart icon" width={100} height={100} />
        </button>
        <button className="w-[35px] h-[35px]">
        <Image src={'/assets/images/dice.png'} alt="heart icon" width={100} height={100} />
        </button>
        <button className="w-[35px] h-[35px]">
        <Image src={'/assets/images/shining.png'} alt="heart icon" width={100} height={100} />
        </button>
      </div>
    </div>
  );
};

export default DisplayComponent;
