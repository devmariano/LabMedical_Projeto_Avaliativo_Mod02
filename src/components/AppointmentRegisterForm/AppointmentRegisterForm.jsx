import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledSelect, StyledLabel, EqualDivider, Child, StyledTextarea } from './AppointmentRegisterForm.styled';
import { AppointmentService } from '../../services/Patient/Patient.service';
import LoadingSpinner from '../Loading/LoadingSpinner.component';
import { animateScroll as scroll } from 'react-scroll';

const AppointmentRegisterForm = ({ isEditing = false, selectedPatient }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!isEditing) {
      setValue('motivo', "");
      setValue('data', "");
      setValue('hora', "");
      setValue('descricao', "");
      setValue('medicacao', "");
      setValue('dosagem', "");
    }
    if (isEditing && id) {
      scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuart' });
      const appointmentData = AppointmentService.getAppointmentById(parseInt(id, 10));
      if (appointmentData) {
        setValue('motivo', appointmentData.motivo);
        setValue('data', appointmentData.data);
        setValue('hora', appointmentData.hora);
        setValue('descricao', appointmentData.descricao);
        setValue('medicacao', appointmentData.medicacao);
        setValue('dosagem', appointmentData.dosagem);
      } else {
        console.error(`Consulta com ID ${id} não encontrada.`);
      }
    }
  }, [isEditing, id, setValue]);

  const onSubmit = (data) => {
    setLoading(true);
    try {
      if (isEditing) {
        const updatedAppointment = { ...data, idPaciente: selectedPatient.id };
        AppointmentService.updateAppointment(parseInt(id, 10), updatedAppointment);
      } else {
        const newAppointment = { ...data, idPaciente: selectedPatient.id };
        AppointmentService.createAppointment(newAppointment);
      }
      setIsSaved(true);
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsSaved(true);
        if (!isEditing) {
          navigate(`/edit-appointment/${AppointmentService.getLastAppointmentId()}`);
        }
      }, 1500);
    }
  };

  const handleDeleteAppointment = () => {
    setLoading(true);
    try {
      AppointmentService.deleteAppointment(parseInt(id, 10));
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setValue('motivo', "");
        setValue('data', "");
        setValue('hora', "");
        setValue('descricao', "");
        setValue('medicacao', "");
        setValue('dosagem', "");
        setIsDeleted(true);
      }, 1500);
    }
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = (event) => {
    setIsSaved(false)
    setIsSwitchOn(event.target.checked);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!isEditing) {
      setValue('data', getCurrentDate());
      setValue('hora', getCurrentTime());
    }
  }, [isEditing, setValue]);

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <EqualDivider>
          <Child>
            {isDeleted && <div style={{ color: '#f17979' }}><h5>Removido com sucesso!</h5></div>}
            {isSaved && isEditing && !isDeleted && <div style={{ color: '#6ac04e' }}><h5>Registrado com sucesso!</h5></div>}
            {isEditing &&  loading && <LoadingSpinner />}
          </Child>
          <Child>
          </Child>
          {isEditing && (
            <Child>
              <h5>Ativar edição da consulta</h5>
              <Form.Switch
                id="custom-switch"
                label={isSwitchOn ? "DESATIVAR" : "ATIVAR"}
                checked={isSwitchOn}
                onChange={handleSwitchChange}
              />
              {isSwitchOn && (
                <>
                  {isDeleted ? <StyledButton type="submit" disabled $disabled >Salvar alterações</StyledButton> : <StyledButton type="submit" >Salvar alterações</StyledButton>}
                  {isDeleted ? <StyledButton type="button" $delete $disabled disabled onClick={handleDeleteAppointment}>Deletar</StyledButton> : <StyledButton type="button" $delete onClick={handleDeleteAppointment}>Deletar</StyledButton>}
                </>
              )}
            </Child>
          )}
        </EqualDivider>
      
        {selectedPatient && (
          <EqualDivider><Child>
            <StyledLabel $tittle>Consulta de {selectedPatient.nome}</StyledLabel>
          </Child></EqualDivider>
        )}
        <EqualDivider>
          <Child>
            <StyledLabel>Motivo:</StyledLabel>
            <StyledInput
              type="text"
              {...register('motivo', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 6,
                  message: 'Mínimo 6 caracteres',
                },
                maxLength: {
                  value: 60,
                  message: 'Máximo 60 caracteres',
                },
              })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.motivo && <StyledAlert>{errors.motivo.message}</StyledAlert>}
          </Child>
          <Child>
            <StyledLabel>Data da consulta:</StyledLabel>
            <StyledInput
              type="date"
              {...register('data', { required: 'Campo obrigatório' })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.data && <StyledAlert>{errors.data.message}</StyledAlert>}
          </Child>
          <Child>
            <StyledLabel>Horário da consulta:</StyledLabel>
            <StyledInput
              type="text"
              {...register('hora', { required: 'Campo obrigatório' })}
              disabled={!selectedPatient || isEditing && !isSwitchOn}
            />
            {errors.hora && <StyledAlert>{errors.hora.message}</StyledAlert>}
          </Child>
        </EqualDivider>
        <EqualDivider>
          <Child>
            <StyledLabel>Descrição do Problema:</StyledLabel>
            <StyledTextarea
              type="text"
              {...register('descricao', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 15,
                  message: 'Mínimo 15 caracteres',
                },
                maxLength: {
                  value: 1000,
                  message: 'Máximo 1000 caracteres',
                },

              })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.descricao && <StyledAlert>{errors.descricao.message}</StyledAlert>}
            <StyledLabel>Medicação Receitada:</StyledLabel>
            <StyledTextarea
              type="text"
              {...register('medicacao')}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            <StyledLabel>Dosagem e Precauções:</StyledLabel>
            <StyledTextarea
              type="text"
              {...register('dosagem', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 15,
                  message: 'Mínimo 15 caracteres',
                },
                maxLength: {
                  value: 250,
                  message: 'Máximo 250 caracteres',
                },

              })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.dosagem && <StyledAlert>{errors.dosagem.message}</StyledAlert>}
          </Child>
        </EqualDivider>
        {!isEditing ?
          <EqualDivider>
            <Child></Child>
            <Child></Child>
            {loading && <LoadingSpinner />}<StyledButton type="submit" >Salvar</StyledButton>
          </EqualDivider>
          : ''}
      </StyledForm>
    </>
  );
};

export default AppointmentRegisterForm;