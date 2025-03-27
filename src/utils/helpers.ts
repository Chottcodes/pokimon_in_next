export const mapAbilities = (abilities: { ability: { name: string } }[]) => {
    return abilities.map((ability) => ability.ability.name);
  };
export const mapMoves = (moves: { move: { name: string } }[]) => {
    return moves.map((move) => move.move.name);
  };