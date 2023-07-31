
import styled  from 'styled-components';
import { Form } from 'react-bootstrap';

export const PatientList = styled.div`
  margin-top: 20px;
`;

export const PatientListTitle = styled.h2`
  color: #145979;
  font-size: 20px;
  font-weight: 600;
`;

export const PatientListTable = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #f6f8fb;
    color: #288c9d;
  }
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const EditButton = styled.button`
  background-color: #f4ae36;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const SearchInput = styled(Form.Control)`
  border: 3px solid #ccc; 
  font-size: 1.2rem; 
  color: #555; 
`;

