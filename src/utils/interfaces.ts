export interface PokemonMain {
    abilities: Ability[];
    name:string;
    id:number;
    location_area_encounters:string;
    moves:Moves[];
    types:Types[];
    species:{
        name:string
        url:string
    }
    sprites: PokemonSprites;
 }
 interface Ability {
    ability: {
        name: string;
        url: string;
    };
}
interface Moves {
    move: {
        name: string;
        url: string;
    };
}
interface Types {
    type: {
        name: string;
        url: string;
    };
}
interface PokemonSprites{
    front_default:string;
    front_shiny:string;
}
export interface PokemonLocationResponse {
    location_area: {
        name:string
    }
}
export interface PokemonSpeciesResponse {
    name: string;
    evolution_chain: {
      url: string;
    };
    
  }
  export interface EvolutionChainResponse {
    chain: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: EvolutionChain[];
    }
  }
  export interface EvolutionChain {
    species: {
      name: string;
    };
    evolves_to: EvolutionChain[];
  }