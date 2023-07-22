import styled from 'styled-components'
import PropTypes from 'prop-types';



export const Sidebar = styled.div`
  width: ${({$open}) => $open ? '20%' : '0'};
  height: 100%;
  max-width: 17rem;
  min-width: ${({$open}) => $open ? '12rem' : '0'};
  background-color: #549ABB;
  `;
  
Sidebar.propTypes = {
    $open: PropTypes.bool,
  }
 

export const MenuGroup = styled.div`
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: left;
  gap: 0.625rem;
`;

export const Button = styled.button`
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: left;
  align-items: center;
  align-self: stretch;
  border-radius: 0.5rem;
  background: #549ABB;
  border: none;
  outline: 1px solid #ffffffa7;
  color: #ffffff; 
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  
  &:hover {
    background: #418fb3;
    outline: 2px solid #ffffffa7;
  }
 
  svg {
    margin-right: 12px;
  }
`;

export const Title = styled.p`
  padding-top: 2rem;
  color: rgba(255, 255, 255, 0.93);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const imgButton = styled.button`
  display: flex;
  width: 100%;
  padding-top: 4rem;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  color: #ffffff; 
  cursor: pointer;

 
  svg {
    margin-right: 20px;
    font-size: 1.5rem;
  }
`;

export const Logo = styled.img`
  display: flex;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 2rem;
  flex-direction: column;
  align-items: left;
  gap: 0.625rem;
`;