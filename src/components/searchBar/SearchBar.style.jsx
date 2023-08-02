import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { Form } from 'react-bootstrap';

export const CustomInputGroupText = styled.span`
  background-color: #dadada;
  border-radius: 6px;
`;

export const CustomAiOutlineSearch = styled(AiOutlineSearch)`
  font-size: 3rem;
  color: #fff;
`;

export const CustomFormControl = styled(Form.Control)`
  border: 3px solid #ccc; 
  font-size: 1.2rem; 
  color: #555; 
`;