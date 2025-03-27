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
export interface LocationArea{
    name:string
}