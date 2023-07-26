
import * as Styled from './Toolbar.style';
import { useMenu } from "../../contexts/menu/menu.context";
import { AuthContext } from '../../contexts/auth/auth.context';
import { useContext } from 'react';


export const ToolBar = () => {
    const { menuOpen, setMenuOpen, tittle } = useMenu();
    const { auth } = useContext(AuthContext);

  return(
    <Styled.ToolBar>
    {menuOpen === false && (
      <Styled.OpenButton onClick={() => setMenuOpen(true)}>
        &#9776;
      </Styled.OpenButton>
    )}

    <Styled.Title>{tittle}</Styled.Title>
    <Styled.Name>{auth.user.nome}</Styled.Name>
    <Styled.UserIcon>
      <img src="../../public/images/user1.png" alt="" />
    </Styled.UserIcon>
  </Styled.ToolBar>
  )
}

