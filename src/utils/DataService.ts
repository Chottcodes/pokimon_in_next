const GetAPI = async (pokemonName:string|number) => {
    try{
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
     const data = await response.json();
     return data;
    }
    catch(error)
    {
        console.error(error)
    }
}
export {GetAPI}