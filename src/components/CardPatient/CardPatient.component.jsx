import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import * as Styled from './CardPatient.style';

const CardPatient = ({ paciente }) => {
  const { nome, idade, contato, planoSaude } = paciente;

  return (
    <Styled.CardWrapper>
      <Card.Body>
        <Styled.IconWrapper>
          <FaUser />
        </Styled.IconWrapper>
        <Styled.Name>{nome}</Styled.Name>
        <Styled.Info>Idade: {idade}</Styled.Info>
        <Styled.Info>{contato}</Styled.Info>
        <Styled.Info>Plano de Saúde: {planoSaude}</Styled.Info>
        <Styled.ButtonVerMais>Ver mais informações</Styled.ButtonVerMais>
      </Card.Body>
    </Styled.CardWrapper>
  );
};

CardPatient.propTypes = {
  paciente: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    idade: PropTypes.number.isRequired,
    contato: PropTypes.string.isRequired,
    planoSaude: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardPatient;