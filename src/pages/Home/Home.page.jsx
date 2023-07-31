import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './Home.style';
import { useMenu } from "../../contexts/menu/menu.context";
import CardStatus from "../../components/CardStatus/CardStatus";
import SearchBar from "../../components/searchBar/searchBar.component";
import CardPatient from "../../components/CardPatient/CardPatient.component";
import { PatientService, AppointmentService, ExamService } from "../../services/Patient/Patient.service";



export const HomePage = () => {
  const { setTittle } = useMenu();
  const [searchValue, setSearchValue] = useState(""); // State para armazenar o search value
  const [filteredPatients, setFilteredPatients] = useState([]); // State que armazena os array de pacientes filtrados
  const totalPatients = PatientService.getPatients();
  const totalExams = ExamService.getExams();
  const totalAppointments = AppointmentService.getAppointments();
 

  useEffect(() => {
    setTittle('ESTATÍSTICAS E INFORMAÇÕES');
    const patients = PatientService.getPatients();
    

  const filtered = patients.filter((patient) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const lowerCaseNome = patient.nome.toLowerCase();
    const lowerCaseTelefone = patient.telefone.toLowerCase();
    const lowerCaseEmail = patient.email.toLowerCase();
    
    return (
      lowerCaseNome.includes(lowerCaseSearchValue) ||
      lowerCaseTelefone.includes(lowerCaseSearchValue) ||
      lowerCaseEmail.includes(lowerCaseSearchValue)
    );
  });

  setFilteredPatients(filtered);
}, [searchValue, setTittle]);


  return (
    <Styled.Dasboard>
      <Container>
        <Styled.Title>Estatísticas do Sistema</Styled.Title>
        <div className="row">
        <div className="col-md-4">
          <CardStatus
            title="Pacientes Cadastrados"
            value={totalPatients.length} 
            icon={<FaUser />}
            color="#36d2b1"
          />
        </div>

        <div className="col-md-4">
          <CardStatus
            title="Consultas Cadastradas"
            value={totalAppointments.length}
            icon={<FaStethoscope />}
            color="#6674d2"
          />
        </div>

        <div className="col-md-4">
          <CardStatus
            title="Exames Cadastrados"
            value={totalExams.length}
            icon={<FaFileMedical />}
            color="#e98b58"
          />
        </div>
      </div>
        <Styled.Title>Informações Rápidas de Pacientes</Styled.Title>
        <SearchBar setSearchValue={setSearchValue} />
        <Row>
          {filteredPatients.map((patient, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <CardPatient patient={patient} />
            </Col>
          ))}
        </Row>
      </Container>
    </Styled.Dasboard>
  )
}



