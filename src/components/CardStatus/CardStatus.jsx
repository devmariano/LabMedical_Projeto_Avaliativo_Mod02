import React from 'react';
import * as Styled from './CardStatus.style';

const CardStatus = ({ title, value, icon, color }) => {

  return (
    <Styled.CardWrapper color={color}>
      <Styled.IconWrapper>{icon}</Styled.IconWrapper>
      <Styled.Value>{value}</Styled.Value>
      <Styled.Title>{title}</Styled.Title>
    </Styled.CardWrapper>
  );
};

export default CardStatus;