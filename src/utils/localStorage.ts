export const getFromLocalStorage = () => {
    const localStorageData = localStorage.getItem("PokeFavorites");
    return localStorageData;
  };
