import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card as BootstrapCard } from 'react-bootstrap';

export const CardWrapper = styled(BootstrapCard)`
  margin-bottom: 20px;
  border-radius: 10px;
  border:none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.color}; 
`;

PropTypes.CardWrapper = {
    $props: PropTypes.color,
}

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #FFF; 
  margin-bottom: 0.3rem;
`;

export const Title = styled.h3`
  font-size: 18px;
  color: #FFF; 
  margin-bottom: 2rem;
`;

export const Value = styled.p`
  font-size: 4rem;
  color: #FFF; 
  font-family: fantasy, Helvetica, sans-serif;
`;