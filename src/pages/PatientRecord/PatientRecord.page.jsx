import * as Styled from './PatientRecord.style';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatientService } from '../../services/Patient/Patient.service';
import { AppointmentService } from '../../services/Patient/Patient.service';
import { ExamService } from '../../services/Patient/Patient.service';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMenu } from "../../contexts/menu/menu.context";
import { Col,  Row } from "react-bootstrap";


export const PatientRecordPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [exams, setExams] = useState([]);
  const { setTittle } = useMenu();

  useEffect(() => {
      setTittle('PRONTUÁRIO DO PACIENTE');
    }, [setTittle]);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = () => {
    // Fetch patient data by ID
    const patientData = PatientService.getPatientById(parseInt(id));
    if (patientData) {
      setPatient(patientData);
      fetchAppointments(patientData.id);
      fetchExams(patientData.id);
    }
  };

  const fetchAppointments = (patientId) => {
    // Fetch appointments for the patient
    const appointmentsData = AppointmentService.getAppointmentByPatientId(patientId);
    setAppointments(appointmentsData);
  };

  const fetchExams = (patientId) => {
    // Fetch exams for the patient
    const examsData = ExamService.getExamByPatientId(patientId);
    setExams(examsData);
  };

  return (
    <Styled.PageWrapper>
      <Styled.PageContainer>
        {/* Dados do Paciente */}
        {patient && (
          <Styled.PatientCard>
            <Styled.CardContent>
              <Row>
                <Col xs="auto">
                  <Styled.IconWrapper>
                    <FaUser />
                  </Styled.IconWrapper>
                </Col>
                <Col>
                  <Styled.PatientName>{patient.nome}</Styled.PatientName>
                  <Styled.PatientDataRow>
                    <Styled.PatientData>
                      <Styled.PatientDataLabel>Convênio:</Styled.PatientDataLabel>
                      <p>{patient.convenio}</p>
                      <Styled.PatientDataLabel>Contato de Emergência:</Styled.PatientDataLabel>
                      <p>{patient.contatoEmergencia}</p>
                    </Styled.PatientData>
                    <Styled.PatientData>
                      <Styled.PatientDataLabel>Alergias:</Styled.PatientDataLabel>
                      <p>{patient.alergias || "Nenhuma"}</p>
                      <Styled.PatientDataLabel>Cuidados Específicos:</Styled.PatientDataLabel>
                      <p>{patient.cuidadosEspecificos}</p>
                    </Styled.PatientData>
                  </Styled.PatientDataRow>
                </Col>
              </Row>
            </Styled.CardContent>
          </Styled.PatientCard>
        )}

      {/* Lista de Consultas */}
      <h3>Consultas</h3>
      {appointments.map((appointment) => (
        <Styled.AppointmentCard key={appointment.id}>
          <Styled.CardContent>
            <Styled.CardTitle>Consulta:  {appointment.id}</Styled.CardTitle>
            <p>Motivo: {appointment.motivo}</p>
            <p>Data: {appointment.data}</p>
            <p>Hora: {appointment.hora}</p>
            <p>Descrição do Problema: {appointment.descricaoProblema}</p>
            <p>Medicação Receitada: {appointment.medicacaoReceitada}</p>
            <p>Dosagem e Precauções: {appointment.dosagemPrecaucoes}</p>
            <Link to={`/edit-appointment/${appointment.id}`}>
              <Styled.StyledButton>Editar Consulta</Styled.StyledButton>
            </Link>
          </Styled.CardContent>
        </Styled.AppointmentCard>
      ))}

      {/* Lista de Exames */}
      <h3>Exames</h3>
      {exams.map((exam) => (
        <Styled.ExamCard key={exam.id}>
          <Styled.CardContent>
            <Styled.CardTitle>Exame: {exam.id}</Styled.CardTitle>
            <p>Nome do exame: {exam.nomeExame}</p>
            <p>Data: {exam.data}</p>
            <p>Hora: {exam.hora}</p>
            <p>Laboratório: {exam.laboratorio}</p>
            <p>Tipo: {exam.tipo}</p>
            <p>Resultado: {exam.resultado}</p>
            <Link to={`/edit-exam/${exam.id}`}>
              <Styled.StyledButton>Editar Exame</Styled.StyledButton>
            </Link>
          </Styled.CardContent>
        </Styled.ExamCard>
      ))}
    </Styled.PageContainer>
    </Styled.PageWrapper>
  );
};