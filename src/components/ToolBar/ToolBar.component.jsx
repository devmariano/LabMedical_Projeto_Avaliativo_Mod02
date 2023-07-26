
import * as Styled from './Toolbar.style';


export const ToolBar = () => {
  
  return(
    <Styled.ToolBar>
    <Styled.Title>TITULO DA PAGINA</Styled.Title>
    <Styled.Name>NOME</Styled.Name>
    <Styled.UserIcon> <img src="../../public/images/user1.png" alt="" /></Styled.UserIcon>
    </Styled.ToolBar>
  );
}