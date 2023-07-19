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

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
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
  $outlined: PropTypes.bool,
  $active: PropTypes.bool,
}

export const ActionTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding-bottom: 5rem;
  width: 100%;
`;


export const ActionBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding-bottom: 5rem;
  width: 100%;
`;

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
export const EsqueciSenha = styled.a`
  color: #666;
  font-family: Segoe UI;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 130px;
  align-items: center;
  padding-bottom: 2rem;
  background-image: url('./images/logo-gd.png');
  background-repeat: no-repeat;
  background-position: center;
`;