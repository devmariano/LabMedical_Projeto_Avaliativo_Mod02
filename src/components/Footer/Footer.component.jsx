
import * as Styled from './Footer.style';


export const Footer = () => {
  
  return(
    <Styled.Footer>
        <Styled.FooterLeft>
            <Styled.Logo src="/images/lab365.png"/>
            <Styled.Title>Projeto Módulo 2 [Trindade]</Styled.Title>
            </Styled.FooterLeft>
    <Styled.FooterRight>
    <Styled.Name>feito por Alexandre Mariano</Styled.Name>
    <Styled.Img src="https://avatars.githubusercontent.com/u/86934710?v=4"/>
    </Styled.FooterRight>
  </Styled.Footer>
  )
}