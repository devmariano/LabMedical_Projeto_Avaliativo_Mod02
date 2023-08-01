
import * as Styled from './Footer.style';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  
  return(
    <Styled.Footer>
        <Styled.FooterLeft>
            <Styled.Logo src="/images/lab365.png"/>
            <Styled.Title>Projeto Módulo 2 [Trindade]</Styled.Title>
            </Styled.FooterLeft>
    <Styled.FooterRight>
    <Styled.Name>feito por Alexandre Mariano</Styled.Name>
    <Styled.IconsContainer>
          <Styled.IconLink href="https://github.com/devmariano" target="_blank">
            <FaGithub />
          </Styled.IconLink>
          <Styled.IconLink href="https://www.linkedin.com/in/alexandre-mariano-04103012b" target="_blank">
            <FaLinkedin />
          </Styled.IconLink>
        </Styled.IconsContainer>
    <Styled.Img src="https://avatars.githubusercontent.com/u/86934710?v=4"/>
    </Styled.FooterRight>
  </Styled.Footer>
  )
}