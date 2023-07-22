import React from 'react';
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './CardStatus.style';

const CardStatus = ({ title, value, icon }) => {
  return (
    <Styled.CardWrapper>
      <Styled.IconWrapper>{icon}</Styled.IconWrapper>
      <Styled.Value>{value}</Styled.Value>
      <Styled.Title>{title}</Styled.Title>
    </Styled.CardWrapper>
  );
};

export default CardStatus;