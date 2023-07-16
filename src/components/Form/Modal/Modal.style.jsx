import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Form = styled.form`
  display: inline-flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 0.625rem;
  min-width: 450px;
`;


export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-bottom: 1rem;
`;

export const Button = styled.button`
  display: flex;
  padding: 0.75rem 3rem;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.3125rem;
  background: ${({ $outlined }) => { return $outlined ? 'transparent' : '#549ABB'}};
  border:  ${({ $outlined }) => { return !$outlined ? 0 : '1px solid #549ABB'}};

  color: ${({ $outlined }) => { return !$outlined ? '#EFEFEF' : '#549ABB'}};
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  opacity: ${({$active}) => { return $active ? 1 : .5 }};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  $outlined: PropTypes.bool
}



export const Title = styled.legend`
  color: #549ABB;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const Text = styled.p`
  color: rgba(105, 105, 105, 0.93);
  font-size: .9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 0.75rem;
`;
