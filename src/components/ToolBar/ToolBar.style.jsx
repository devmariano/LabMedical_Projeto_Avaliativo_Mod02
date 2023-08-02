

import styled from 'styled-components';

export const ToolBar = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  top: 0;
  align-items: center;
  justify-content: end;
  background-color: #fff;
  background-color: #145979;
`;

export const UserIcon = styled.div`
  width: 55px;
  height: 55px;
  margin-left: 15px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;

export const Title = styled.legend`
  padding-left: 2rem;
  color: #ffffff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const Name = styled.p`
  padding-top: 1rem;
  color: #ffffff;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const OpenButton = styled.button`
  display: flex;
  padding: 0.75rem .75rem;
  background: #145979;
  border: none;
  color: #ffffff; 
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    font-weight: 900;
  }
`;
