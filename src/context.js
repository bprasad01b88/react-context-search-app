import React, { useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`

const AppContext = React.createContext();

// creating a provider function
const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show : 'false', msg : ""});
    const [query, setQuery] = useState("titanic")

  const getData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if(data.Response === 'True'){
        setIsLoading(false);
        setIsError({
          show : false,
          msg : ""
      })
        setMovie(data.Search);
      } else {
        setIsError({
            show : true,
            msg : data.Error
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    // debouncing 
    let timerOut = setTimeout(() => {
      getData(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timerOut);
  }, [query])
  return <AppContext.Provider value={{movie, isLoading, isError, query, setQuery}}>{children}</AppContext.Provider>;
};

// creating a global context function using custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
