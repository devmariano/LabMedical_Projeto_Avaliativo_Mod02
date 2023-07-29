import { useEffect, useState } from 'react';
import * as Styled from './MedicalRecord.style';
import { useMenu } from "../../contexts/menu/menu.context";
import PatientRegisterForm from '../../components/PatientRegisterForm/PatientRegisterForm';
import { PatientService } from '../../services/Patient/Patient.service';

export const MedicalRecordPage = () => {
  const { setTittle } = useMenu();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setTittle('LISTAGEM DE PRONTUÁRIOS');
    fetchPatients();
  }, [setTittle]);

  const fetchPatients = () => {
    // Fetch the list of patients from the PatientService
    const patientsData = PatientService.getPatients();
    setPatients(patientsData);
  };

  const handleDeletePatient = (id) => {
    // Call the deletePatient function from PatientService
    PatientService.deletePatient(id);
    // Fetch the updated list of patients
    fetchPatients();
  };

  return (
    <>
      <Styled.PatientList>
        <Styled.PatientListTitle>Registered Patients:</Styled.PatientListTitle>
        <Styled.PatientListTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.nome}</td>
                <td>{patient.genero}</td>
                <td>{patient.dataNascimento}</td>
                <td>
                  <Styled.DeleteButton onClick={() => handleDeletePatient(patient.id)}>
                    Delete
                  </Styled.DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Styled.PatientListTable>
      </Styled.PatientList>
    </>
  );
};
