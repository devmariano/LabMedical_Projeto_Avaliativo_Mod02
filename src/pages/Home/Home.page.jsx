import React, { useState, useEffect } from "react";
import { useMenu } from "../../contexts/menu/menu.context";
import CardStatus from "../../components/CardStatus/CardStatus";
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './Home.style';
import SearchBar from "../../components/searchBar/searchBar.component";
import { Container, Row, Col } from 'react-bootstrap';
import CardPatient from "../../components/CardPatient/CardPatient.component";

import patientData from '../../data/patientData.json';

export const HomePage = () => {
  const { setTittle } = useMenu();
  const [searchValue, setSearchValue] = useState(""); // State para armazenar o search value
  const [filteredPatients, setFilteredPatients] = useState([]); // State que armazena os array de pacientes filtrados

  useEffect(() => {
    setTittle('ESTATISTICAS E INFORMAÇÕES');
    // Filtra pacientes com base no valor da busca 
    const filteredPatients = patientData.patients.filter(paciente =>
      paciente.nome.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPatients(filteredPatients);
  }, [searchValue, setTittle]);

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
        <SearchBar setValorBuscado={setSearchValue} />
        <Row>
          {filteredPatients.map((paciente, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CardPatient paciente={paciente} />
            </Col>
          ))}
        </Row>
      </Container>
    </Styled.Dasboard>
  )
}



