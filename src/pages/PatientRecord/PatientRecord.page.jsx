import * as Styled from './PatientRecord.style';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatientService } from '../../services/Patient/Patient.service';
import { AppointmentService } from '../../services/Patient/Patient.service';
import { ExamService } from '../../services/Patient/Patient.service';
import { Link } from 'react-router-dom';
import { useMenu } from "../../contexts/menu/menu.context";


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
    <div>
      {/* Dados do Paciente */}
      {patient && (
        <div>
          <h2>{patient.nome}</h2>
          <p>Convênio: {patient.convenio}</p>
          <p>Contato de Emergência: {patient.contatoEmergencia}</p>
          <p>Alergias: {patient.alergias || 'Nenhuma'}</p>
          <p>Cuidados Específicos: {patient.cuidadosEspecificos}</p>
        </div>
      )}

      {/* Lista de Consultas */}
      <h3>Consultas</h3>
      {appointments.map((appointment) => (
        <div key={appointment.id}>
          <h4>Consulta #{appointment.id}</h4>
          <p>Motivo: {appointment.motivo}</p>
          <p>Data: {appointment.data}</p>
          <p>Hora: {appointment.hora}</p>
          <p>Descrição do Problema: {appointment.descricaoProblema}</p>
          <p>Medicação Receitada: {appointment.medicacaoReceitada}</p>
          <p>Dosagem e Precauções: {appointment.dosagemPrecaucoes}</p>
          <Link to={`/edit-appointment/${appointment.id}`}>
            <button>Editar Consulta</button>
          </Link>
        </div>
      ))}

      {/* Lista de Exames */}
      <h3>Exames</h3>
      {exams.map((exam) => (
        <div key={exam.id}>
          <h4>Exame #{exam.id}</h4>
          <p>Nome do exame: {exam.nomeExame}</p>
          <p>Data: {exam.data}</p>
          <p>Hora: {exam.hora}</p>
          <p>Laboratório: {exam.laboratorio}</p>
          <p>Tipo: {exam.tipo}</p>
          <p>Resultado: {exam.resultado}</p>
          <Link to={`/edit-exam/${exam.id}`}>
            <button>Editar Exame</button>
          </Link>
        </div>
      ))}
    </div>
  );
};