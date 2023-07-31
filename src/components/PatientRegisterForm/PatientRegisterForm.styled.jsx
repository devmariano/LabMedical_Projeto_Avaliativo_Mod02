import styled, { css }from "styled-components";
import PropTypes from 'prop-types';

export const StyledForm = styled.form`
  width: 100%;
  background-color: #f6f8fb;
  padding: 20px;
  border-radius: 5px;
`

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: ${props => props.$tittle ? '600' : '500'};
  font-size: ${props => props.$tittle ? '22px' : '18px'};
  color: ${props => props.$tittle ? '#145979' : '#288c9d'};
`


export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #f2f2f2;
      color: #888;
    `}
`;

export const StyledButton = styled.button`
  width: 45%;
  background-color: ${props => !props.$delete ? '#56ab58' : '#c95555'}; 
  color: white;
  padding: 10px;
  margin-top: 10px;
  margin-left: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${props => props.$disabled ? 0.5 : 1};
`

export const StyledAlert = styled.div`
  padding: 10px;
  background-color: #f4433686;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
`

export const EqualDivider = styled.div`
  /* Desktop styles */
  display: flex;
  padding: 0.5rem;
  margin: 0.5rem;

  /* Mobile styles */
  @media (max-width: 1024px) {
    display: block;
    ${({ $vertical }) => $vertical && 'margin-top: 1rem margin-left:1rem'}
  }

  ${props => props.$vertical && "flex-direction: column;"}

  > * {
    flex: 1;
  }
`;

export const Child = styled.div`

padding: 0.25rem 0.5rem;
`;


EqualDivider.propTypes = {$vertical: PropTypes.bool}
StyledButton.propTypes = {$delete: PropTypes.bool, $disabled: PropTypes.bool }
StyledLabel.propTypes = {$tittle: PropTypes.bool }

