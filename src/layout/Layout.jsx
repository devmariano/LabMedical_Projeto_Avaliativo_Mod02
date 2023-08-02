import { Outlet } from 'react-router';
import { Navigate } from "react-router";
import { useContext, useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';

import { SideBar } from '../components/SideBar/Sidebar.component';
import { ToolBar } from '../components/ToolBar/ToolBar.component';
import { Footer } from '../components/Footer/Footer.component';


import { AuthContext } from "../contexts/auth/auth.context";
import { MenuProvider } from "../contexts/menu/menu.context";

import Spinner from '../components/Loading/PageSpinner.component';

import * as Styled from './Layout.style';


export const Layout = () => {

const { auth, menuOpen, setMenuOpen } = useContext(AuthContext);

const [isLoading, setIsLoading] = useState(true);

const location = useLocation(); 

useEffect(() => {
  setIsLoading(true); 
  const timeout = setTimeout(() => {
    setIsLoading(false);
  }, 500);


  return () => clearTimeout(timeout);
}, [location]); 

const render = () => {
  return(
    <MenuProvider>
      <Styled.App>
        {isLoading ? (
          <Spinner /> 
        ) : (
          <>
            {menuOpen === false && (
              <Styled.OpenButton onClick={() => setMenuOpen(true)}>
                &#9776;
              </Styled.OpenButton>
            )}
            <SideBar />
            <Styled.Main>
              <ToolBar />
              <Styled.Content>
                <Outlet />
              </Styled.Content>
              <Footer />
            </Styled.Main>
          </>
        )}
      </Styled.App>
    </MenuProvider>
  );
  }
  return auth.isLogged ? render() : <Navigate to='/login'/>
}