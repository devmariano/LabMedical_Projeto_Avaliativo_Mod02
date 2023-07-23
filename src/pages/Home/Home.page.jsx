import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './Home.style';
import { useMenu } from "../../contexts/menu/menu.context";
import CardStatus from "../../components/CardStatus/CardStatus";
import SearchBar from "../../components/searchBar/searchBar.component";
import CardPatient from "../../components/CardPatient/CardPatient.component";
import { PatientService } from "../../services/Patient/Patient.service";


export const HomePage = () => {
  const { setTittle } = useMenu();
  const [searchValue, setSearchValue] = useState(""); // State para armazenar o search value
  const [filteredPatients, setFilteredPatients] = useState([]); // State que armazena os array de pacientes filtrados
  const totalPatients = PatientService.getPatients();

  useEffect(() => {
    setTittle('ESTATISTICAS E INFORMAÇÕES');
    // Busca os pacientes no serviço
    const patients = PatientService.getPatients();
    
    // Filtra os pacientes com base no valor da busca
    const filtered = patients.filter(patient => patient.nome.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredPatients(filtered);
  }, [searchValue, setTittle]);


  return (
    <Styled.Dasboard>
      <Container>
        <Styled.Title>Estatísticas do Sistema</Styled.Title>
        <Row>
          <Col>
            <CardStatus title="Pacientes Cadastrados" value={totalPatients.length} color='#36d2b1' icon={<FaUser />} />
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
          {filteredPatients.map((patient, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CardPatient paciente={patient} />
            </Col>
          ))}
        </Row>
      </Container>
    </Styled.Dasboard>
  )
}



