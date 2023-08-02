import { useEffect, useState } from 'react';
import * as Styled from './MedicalRecord.style';
import { useMenu } from "../../contexts/menu/menu.context";
import { PatientService } from '../../services/Patient/Patient.service';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';

export const MedicalRecordPage = () => {
  const { setTittle } = useMenu();
  const [patients, setPatients] = useState([]);
  const [searchValue, setSearchValue] = useState(""); 
  useEffect(() => {
    setTittle('LISTAGEM DE PRONTUÁRIOS');
    fetchPatients();
  }, [setTittle]);

  const fetchPatients = () => {
    const patientsData = PatientService.getPatients();
    setPatients(patientsData);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.nome.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCardClick = (patientId) => {
    window.location.href = `/patientrecord/${patientId}`;
  };


  return (
    <>
    <Container fluid style={{ backgroundColor: '#f6f8fb', width: '100%', padding: 0 }}>
      <Styled.StyledLabel>Utilize a barra de pesquisa para buscar</Styled.StyledLabel>
      <Styled.PatientList>
        <Styled.SearchInput
          type="text"
          placeholder="Digite o nome..."
          value={searchValue}
          onChange={handleSearch}
        />
        <div className="table-responsive">
          <table
            className="table table-hover align-middle text-center"
            style={{ borderCollapse: 'separate', borderSpacing: '0 2rem' }}
          >
            <thead>
              <tr>
                <th className="fs-5" scope="col"><Styled.StyledTittle>Registro</Styled.StyledTittle></th>
                <th className="fs-5" scope="col"><Styled.StyledTittle>Paciente</Styled.StyledTittle></th>
                <th className="fs-5" scope="col"><Styled.StyledTittle>Convênio</Styled.StyledTittle></th>
                <th className="fs-5" scope="col"></th>
              </tr>
            </thead>
            <tbody>
  {filteredPatients.map((patient) => (
    <Styled.PatientRow key={patient.id} onClick={() => handleCardClick(patient.id)}>
      <td><Styled.StyledData>{patient.id?.toString()?.padStart(10, '0')}</Styled.StyledData></td>
      <td><Styled.StyledData>{patient.nome}</Styled.StyledData></td>
      <td><Styled.StyledData>{patient.convenio || 'Sem Plano'}</Styled.StyledData></td>
      <td className="text-end">
        <Styled.IconWrapper>
          <FaChevronRight />
        </Styled.IconWrapper>
      </td>
    </Styled.PatientRow>
  ))}
</tbody>
          </table>
        </div>
      </Styled.PatientList>
      </Container>
    </>
  );
};