import { Outlet } from 'react-router';
import { Navigate } from "react-router";
import { useContext } from "react"

import { SideBar } from '../components/SideBar/Sidebar.component';
import { ToolBar } from '../components/ToolBar/ToolBar.Component';
import { Footer } from '../components/Footer/Footer.component';


import { AuthContext } from "../contexts/auth/auth.context";
import { MenuProvider } from "../contexts/menu/menu.context";

import * as Styled from './Layout.style';


export const Layout = () => {

const { auth, menuOpen, setMenuOpen } = useContext(AuthContext);

const render = () => {
  return(

    <MenuProvider>
    <Styled.App>
    {menuOpen === false && (
          <Styled.OpenButton onClick={() => setMenuOpen(true)}>
            &#9776;
          </Styled.OpenButton>
        )}
         <SideBar/>
            <Styled.Main>
                <ToolBar/>
                <Styled.Content>
                    <Outlet />
                </Styled.Content>
                <Footer/>
            </Styled.Main>
    </Styled.App>
    </MenuProvider>
  );
  }
  return auth.isLogged ? render() : <Navigate to='/login'/>
}