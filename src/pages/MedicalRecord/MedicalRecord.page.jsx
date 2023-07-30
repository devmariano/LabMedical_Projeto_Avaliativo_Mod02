import { useEffect, useState } from 'react';
import * as Styled from './MedicalRecord.style';
import { useMenu } from "../../contexts/menu/menu.context";
import { PatientService } from '../../services/Patient/Patient.service';
import { Link } from 'react-router-dom';

export const MedicalRecordPage = () => {
  const { setTittle } = useMenu();
  const [patients, setPatients] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // Estado para armazenar o valor da busca

  useEffect(() => {
    setTittle('LISTAGEM DE PRONTUÁRIOS');
    fetchPatients();
  }, [setTittle]);

  const fetchPatients = () => {
    // Fetch the list of patients from the PatientService
    const patientsData = PatientService.getPatients();
    setPatients(patientsData);
  };

  // Função para filtrar os pacientes com base no valor da busca
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  // Filtra os pacientes com base no valor da busca
  const filteredPatients = patients.filter((patient) =>
    patient.nome.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDeletePatient = (id) => {
    // Call the deletePatient function from PatientService
    PatientService.deletePatient(id);
    // Fetch the updated list of patients
    fetchPatients();
  };

  return (
    <>
      <Styled.PatientList>
        {/* Campo de busca */}
        <Styled.SearchInput
          type="text"
          placeholder="Digite o nome..."
          value={searchValue}
          onChange={handleSearch}
        />
        <Styled.PatientListTitle>Registered Patients:</Styled.PatientListTitle>
        <Styled.PatientListTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Genero</th>
              <th>Data de Nascimento</th>
              <th>gestão</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.nome}</td>
                <td>{patient.genero}</td>
                <td>{patient.dataNascimento}</td>
                <td>
                  {/* Edit button */}
                  <Link to={`/edit-patient/${patient.id}`}>
                    <Styled.EditButton>Edit</Styled.EditButton>
                  </Link>
                  {/* Delete button */}
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