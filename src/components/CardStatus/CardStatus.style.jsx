import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Card as BootstrapCard } from 'react-bootstrap';

export const CardWrapper = styled(BootstrapCard)`
  box-shadow: 2px 2px 10px #DADADA;
  margin: 5px;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  transition: .3s linear all;
  background-color: ${props => props.color};
  color: #FFF;
`;

CardWrapper.propTypes = {
  color: PropTypes.string.isRequired,
};

export const IconWrapper = styled.div`
  font-size: 5em;
  opacity: 0.2;
`;

export const Title = styled.span`
  position: absolute;
  right: 35px;
  top: 110px;
  line-height: 0.9;
  font-style: italic;
  text-transform: capitalize;
  opacity: 0.6;
  font-size: 1.5rem;
  padding-left: 15px;
`;

export const Value = styled.span`
  position: absolute;
  right: 35px;
  top: 10px;
  font-size: 4rem;
  opacity: 0.9;
  font-weight: 700;
`;