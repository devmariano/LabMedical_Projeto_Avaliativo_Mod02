

import styled from 'styled-components';

export const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  background-color: #fff;
  background-color: #145979;
`;

export const FooterLeft = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
`;

export const FooterRight= styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: end;
`;


export const Logo = styled.img`
  height: 2rem;
  margin-left: 35px;
  padding-right:0.5rem;
`;

export const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  margin-right: 30px;
  border-radius: 50%;
`;

export const Title = styled.legend`
  padding-left: 1.5rem;
  color: #e4e4e4;
  font-size: 1rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding-right:0.8rem;
`;

export const Name = styled.p`
  padding-top: 1.3rem;
  padding-right: 0.4rem;
  color: #ffffff;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;


export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const IconLink = styled.a`
  font-size: 24px;
  margin: 0 5px;
  color: #ffffff;

  &:hover {
    color: #1eaedb; 
  }
`;

