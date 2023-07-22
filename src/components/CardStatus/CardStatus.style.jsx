import styled from 'styled-components';
import { Card as BootstrapCard } from 'react-bootstrap';
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import { Layout } from './../../layout/Layout';

export const CardWrapper = styled(BootstrapCard)`
  max-width: 20em;
  margin-bottom: 20px;
  border-radius: 12px;
  border:none;
  outline: 2px solid #549abb5a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #549ABB;
  margin-bottom: 0.3rem;
`;

export const Title = styled.h3`
  font-size: 18px;
  color: #313131;
  margin-bottom: 2rem;
`;

export const Value = styled.p`
  font-size: 5rem;
  color: #794fbdd2;
  font-family: fantasy, Helvetica, sans-serif;
`;