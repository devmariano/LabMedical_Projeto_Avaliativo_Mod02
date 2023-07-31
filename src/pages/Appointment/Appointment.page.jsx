import { useEffect, useState } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";
import { useParams, useNavigate } from 'react-router-dom';
import { PatientService } from '../../services/Patient/Patient.service';
import { AppointmentService } from '../../services/Patient/Patient.service';
import AppointmentRegisterForm from '../../components/AppointmentRegisterForm/AppointmentRegisterForm';
import PatientSearchForm from '../../components/PatientSearchForm/PatientSearchForm.component';
import { Container } from 'react-bootstrap';


export const AppointmentPage = () => {
  const { setTittle } = useMenu();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setTittle(id ? 'EDITAR CONSULTA' : 'CADASTRO DE CONSULTA');
    if (id) {
      const appointmentData = AppointmentService.getAppointmentById(parseInt(id, 10));
      if (appointmentData) {
        const patientData = PatientService.getPatientById(appointmentData.idPaciente);
        setSelectedPatient(patientData);
      } else {
        console.error(`Consulta com ID ${id} não encontrada.`);
      }
    }
  }, [setTittle, id, navigate]);


  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <>
      {id ? (
        <AppointmentRegisterForm isEditing={true} selectedPatient={selectedPatient} />
      ) : (    
        <Container fluid style={{  width: '100%', padding: 0 }}>
          <PatientSearchForm onSelectPatient={handleSelectPatient} />
          <AppointmentRegisterForm isEditing={false} selectedPatient={selectedPatient} />
        </Container>
        
      )}
    </>
  );
};