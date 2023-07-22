import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [tittle, setTittle] = useState('titulo pagina');
 

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, tittle, setTittle }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);