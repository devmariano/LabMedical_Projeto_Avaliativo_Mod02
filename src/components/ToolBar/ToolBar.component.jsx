
import * as Styled from './Toolbar.style';
import { useMenu } from "../../contexts/menu/menu.context";


export const ToolBar = () => {
    const { menuOpen, setMenuOpen, tittle } = useMenu();
  
  return(
    <Styled.ToolBar>
    {menuOpen === false && (
      <Styled.OpenButton onClick={() => setMenuOpen(true)}>
        &#9776;
      </Styled.OpenButton>
    )}
    {/* <Styled.Title>{menuOpen ? "TITULO DA PAGINA" : "Menu"}</Styled.Title> */}
    <Styled.Title>{tittle}</Styled.Title>
    <Styled.Name>NOME</Styled.Name>
    <Styled.UserIcon>
      <img src="../../public/images/user1.png" alt="" />
    </Styled.UserIcon>
  </Styled.ToolBar>
  )
}

