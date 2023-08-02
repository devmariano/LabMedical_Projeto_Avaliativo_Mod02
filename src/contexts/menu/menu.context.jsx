import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const MenuContext = createContext({
  menuOpen: true,  
  tittle: 'titulo pagina',  
  setMenuOpen: () => {}, 
  setTittle: () => {},
  });


export const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [tittle, setTittle] = useState('titulo pagina');
 

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, tittle, setTittle }}>
      {children}
    </MenuContext.Provider>
  );
};

MenuProvider.propTypes = {
  children: PropTypes.node,
}

export const useMenu = () => useContext(MenuContext);