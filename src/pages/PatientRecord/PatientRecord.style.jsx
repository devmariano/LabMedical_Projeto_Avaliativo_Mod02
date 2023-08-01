import styled from "styled-components";
import { Card, Col, Container, Row } from "react-bootstrap";


export const PageWrapper = styled.div`
  background-color: #f6f8fb;
  width: 100%;
`;

export const PageContainer = styled(Container)`
  margin-bottom: 20px;
  width: 85%;
  padding-top: 5rem;
`;

export const PatientCard = styled(Card)`
  margin-bottom: 20px;
  border: none;
  color: #145979;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AppointmentCard = styled(Card)`
  margin-bottom: 20px;
  color: #116b66;
  font-weight: 500;
  border: none;
  background-color:#16989112;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ExamCard = styled(Card)`
  margin-bottom: 20px;
  color: #16587b;
  font-weight: 500;
  border: none;
  background-color:#1a689220;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


export const CardTitle = styled(Card.Title)`
  margin-bottom: 0;
`;


export const CardContent = styled(Card.Body)`
  padding: 20px;
`;

export const IconWrapper = styled.div`
  font-size: 4rem;
  color: #549ABB;
  margin-bottom: 1rem;
  padding: 0%.5rem;
`;

export const PatientName = styled.h2`
  padding-left: 1rem;
  margin-top: 1rem;
`;

export const PatientDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const PatientData = styled.div`
  flex: 1;
  padding-left: 1rem;
`;

export const PatientDataLabel = styled.p`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const StyledButton = styled.button`

  background-color: #f0a50ee2; 
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0a50e;
  }
`