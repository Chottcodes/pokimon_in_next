import { EvolutionChain } from "./interfaces";

export const mapAbilities = (abilities: { ability: { name: string } }[]) => {
    return abilities.map((ability) => ability.ability.name);
  };
export const mapMoves = (moves: { move: { name: string } }[]) => {
    return moves.map((move) => move.move.name);
  };
  export const getAllEvolutionData = (url:EvolutionChain): string[] => {
    const evolutionResult: string[] = [];
    evolutionResult.push(url.species.name);

    if (url.evolves_to && url.evolves_to.length > 0) {
      url.evolves_to.forEach(nextEvolution => {
        evolutionResult.push(...getAllEvolutionData(nextEvolution));
      });
    }
    return evolutionResult;
  }
  export function formatForSearch(input:string ) {
    let transformedString = input.trim().replace(/ /g, '-');
    transformedString = transformedString.toLowerCase();
    return transformedString;
}


    

  