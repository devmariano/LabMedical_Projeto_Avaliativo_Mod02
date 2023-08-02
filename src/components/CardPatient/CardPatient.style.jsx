import styled from 'styled-components';
import { Card as BootstrapCard, Button } from 'react-bootstrap';

export const CardWrapper = styled(BootstrapCard)`
  margin-top: 2rem;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #f6f8fb;
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #549ABB;
  margin-bottom: 1rem;
`;

export const Name = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #145979;
`;

export const Info = styled.p`
  font-size: 1.1rem;
  color: #969696;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const ButtonVerMais = styled(Button)`
  background-color: #e98b58;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #e79c74;
  }
`;