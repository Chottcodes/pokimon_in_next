import { PokemonMain } from "./interfaces";


const GetAPI = async (pokemonName: string | number): Promise<PokemonMain> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error(error);
        throw error; 
    }
}
export { GetAPI }