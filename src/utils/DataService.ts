import { EvolutionChainResponse, PokemonLocationResponse, PokemonMain, PokemonSpeciesResponse } from "./interfaces";

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

const GetPokeLocation = async (id:number): Promise<PokemonLocationResponse[]> =>{
    try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
    const data = await response.json();
    return data;
    }catch(error)
    {
        console.error(error);
        throw error; 
    }
}

const GetpokemonSpecies = async (pokemonName:string | number): Promise<PokemonSpeciesResponse> =>
{
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`)
        const data = await response.json();
        return data;
        }catch(error)
        {
            console.error(error);
            throw error; 
        }
}
const GetEvolutionChain = async (url:string): Promise<EvolutionChainResponse> => {
    try{
        const response = await fetch(`${url}`)
        const data = await response.json();
        return data;
        }catch(error)
        {
            console.error(error);
            throw error; 
        }
}

export { GetAPI, GetPokeLocation,GetpokemonSpecies,GetEvolutionChain }