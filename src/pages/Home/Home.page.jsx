import React, { useEffect } from "react";
import { useMenu } from "../../contexts/menu/menu.context";
import CardStatus from "../../components/CardStatus/CardStatus";
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './Home.style';
import SearchBar from "../../components/searchBar/searchBar.component";
import { Container, Row, Col } from 'react-bootstrap';
import CardPatient from "../../components/CardPatient/CardPatient.component";

export const HomePage = () => {
  const { setTittle } = useMenu();

  useEffect(() => {
    setTittle('ESTATISTICAS E INFORMAÇÕES');
  }, []);

    // Array com informações fictícias de pacientes
    const pacientes = [
      {
        nome: "João da Silva",
        idade: 30,
        contato: "joao.silva@example.com",
        planoSaude: "Plano A"
      },
      {
        nome: "Maria Souza",
        idade: 25,
        contato: "(11) 98765-4321",
        planoSaude: "Plano B"
      },
      {
        nome: "Mario Andrade",
        idade: 45,
        contato: "(11) 98765-4321",
        planoSaude: "Amil"
      },
      {
        nome: "Alex Andrade",
        idade: 15,
        contato: "(11) 98765-4345",
        planoSaude: "Unimed"
      },
      {
        nome: "Maria Souza",
        idade: 25,
        contato: "(11) 98765-4321",
        planoSaude: "Plano B"
      },
      {
        nome: "Mario Andrade",
        idade: 45,
        contato: "(11) 98765-4321",
        planoSaude: "Amil"
      },
      {
        nome: "Alex Andrade",
        idade: 15,
        contato: "(11) 98765-4345",
        planoSaude: "Unimed"
      },
    ];

  return (
    <Styled.Dasboard>
      <Container>
        <Styled.Title>Estatísticas do Sistema</Styled.Title>
        <Row>
          <Col>
            <CardStatus title="Pacientes Cadastrados" value="100" color='#36d2b1' icon={<FaUser />} />
          </Col>
          <Col>
            <CardStatus title="Consultas Cadastradas" value="50" color='#6674d2' icon={<FaStethoscope />} />
          </Col>
          <Col>
            <CardStatus title="Exames Cadastrados" value="75" color='#e98b58' icon={<FaFileMedical />} />
          </Col>
        </Row>
        <Styled.Title>Informações Rápidas de Pacientes</Styled.Title>
        <SearchBar />
        <Row>
          {pacientes.map((paciente, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CardPatient paciente={paciente} />
            </Col>
          ))}
        </Row>
        </Container>
    </Styled.Dasboard>
  )
}

