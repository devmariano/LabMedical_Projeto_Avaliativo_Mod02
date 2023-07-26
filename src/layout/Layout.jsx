import { Outlet } from 'react-router';
import { Navigate } from "react-router";
import { useContext } from "react"

import { SideBar } from '../components/SideBar/Sidebar.component';
import { ToolBar } from '../components/ToolBar/ToolBar.Component';

import { AuthContext } from "../contexts/auth/auth.context";

import * as Styled from './Layout.style';


export const Layout = () => {
const { auth } = useContext(AuthContext);

const render = () => {
  return(
    <Styled.App>
         <SideBar/>
            <Styled.Main>
                <ToolBar/>
                <Styled.Content>
                    <Outlet />
                </Styled.Content>
            </Styled.Main>
    </Styled.App>
  );
  }
  return auth.isLogged ? render() : <Navigate to='/login'/>
}