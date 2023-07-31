import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PatientService } from '../../services/Patient/Patient.service';
import { StyledForm, StyledInput, StyledLabel, EqualDivider, StyledButton, Child } from './PatientSearchForm.styled';

const PatientSearchForm = ({ onSelectPatient }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const patients = PatientService.getPatients();
      const filteredPatients = patients.filter((patient) =>
        patient.nome && patient.nome.toLowerCase().includes(data.search.toLowerCase())
      );
      setSearchResults(filteredPatients);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPatient = (patient) => {
    onSelectPatient(patient);
    setSearchResults([]);
    setValue('search', '');
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <EqualDivider>
        <Child>
          <StyledLabel>Pesquisar paciente por nome:</StyledLabel>
          <StyledInput
            type="text"
            {...register('search')}
            placeholder="Digite o nome do paciente"
          />
        </Child>
        <Child>
          <StyledLabel>&nbsp;</StyledLabel>
          <StyledInput type="submit" value="Buscar" />
        </Child>
      </EqualDivider>
      {loading && <div>Carregando...</div>}
      <EqualDivider>
        {searchResults.map((patient) => (
          <Child key={patient.id}>
            <StyledButton type="button" onClick={() => handleSelectPatient(patient)}>
            <StyledLabel $bt>{patient.nome}</StyledLabel><StyledLabel $bt $tittle>{patient.convenio}{!patient.convenio && 'Sem plano'}</StyledLabel>
            </StyledButton>
          </Child>
        ))}
      </EqualDivider>
    </StyledForm>
  );
};

export default PatientSearchForm;