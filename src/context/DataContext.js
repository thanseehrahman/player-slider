import { createContext, useContext } from "react";
import playersJSON from "../data.json";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const players = playersJSON;

  return (
    <DataContext.Provider value={{ players }}>{children}</DataContext.Provider>
  );
};

export const PlayersData = () => {
  return useContext(DataContext);
};
