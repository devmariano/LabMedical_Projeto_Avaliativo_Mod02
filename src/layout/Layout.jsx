import { SideBar } from '../components/SideBar/Sidebar.component';
import { ToolBar } from '../components/ToolBar/ToolBar.Component';
import { HomePage } from '../pages/Home/Home.page';
import * as Styled from './Layout.style';
import { Outlet } from 'react-router';


export const Layout = () => {
  
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