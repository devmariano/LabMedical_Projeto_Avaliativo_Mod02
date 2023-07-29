import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import * as Styled from './CardPatient.style';
import { Link } from 'react-router-dom';

const calculateAge = (birthdate) => {
  const birthdateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthdateObj.getFullYear();
  const monthDifference = today.getMonth() - birthdateObj.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdateObj.getDate())) {
    age--;
  }
  return age;
};

const CardPatient = ({ paciente }) => {
  const { nome, dataNascimento, telefone, convenio } = paciente;
  const idade = calculateAge(paciente.dataNascimento);

  return (
    <Styled.CardWrapper>
      <Card.Body>
        <Styled.IconWrapper>
          <FaUser />
        </Styled.IconWrapper>
        <Styled.Name>{nome}</Styled.Name>
        <Styled.Info>{idade} Anos</Styled.Info>
        <Styled.Info>{telefone}</Styled.Info>
        <Styled.Info>{convenio}</Styled.Info>
        <Link to={`/edit-patient/${paciente.id}`}>
          <Styled.ButtonVerMais>Ver mais</Styled.ButtonVerMais>
        </Link>
      </Card.Body>
    </Styled.CardWrapper>
  );
};

CardPatient.propTypes = {
  paciente: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    idade: PropTypes.number,
    telefone: PropTypes.string.isRequired,
    convenio: PropTypes.string,
  }).isRequired,
};

export default CardPatient;