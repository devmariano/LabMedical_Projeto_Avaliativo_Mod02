import { useEffect, useState } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";
import { useParams, useNavigate } from 'react-router-dom';
import { PatientService } from '../../services/Patient/Patient.service';
import { ExamService } from '../../services/Patient/Patient.service';
import ExamRegisterForm from '../../components/ExamRegisterForm/ExamRegisterForm';
import PatientSearchForm from '../../components/PatientSearchForm/PatientSearchForm.component';
import { Container } from 'react-bootstrap';


export const ExamPage = () => {
  const { setTittle } = useMenu();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setTittle(id ? 'EDITAR EXAME' : 'CADASTRAR EXAME');
    if (id) {
      const examData = ExamService.getExamById(parseInt(id, 10));
      if (examData) {
        const patientData = PatientService.getPatientById(examData.idPaciente);
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
        <ExamRegisterForm isEditing={true} selectedPatient={selectedPatient} />
      ) : (    
        <Container fluid style={{  width: '100%', padding: 0 }}>
          <PatientSearchForm onSelectPatient={handleSelectPatient} />
          <ExamRegisterForm isEditing={false} selectedPatient={selectedPatient} />
        </Container>
        
      )}
    </>
  );
};