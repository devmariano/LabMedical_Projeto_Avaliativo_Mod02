import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledSelect, StyledLabel, EqualDivider, Child, StyledTextarea } from './ExamRegisterForm.styled';
import { ExamService } from '../../services/Patient/Patient.service';
import LoadingSpinner from '../Loading/LoadingSpinner.component';
import { animateScroll as scroll } from 'react-scroll';

const ExamRegisterForm = ({ isEditing = false, selectedPatient }) => {
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
      const examData = ExamService.getExamById(parseInt(id, 10));
      if (examData) {
        setValue('exame', examData.exame);
        setValue('data', examData.data);
        setValue('hora', examData.hora);
        setValue('tipo', examData.tipo);
        setValue('laboratorio', examData.laboratorio);
        setValue('url', examData.url);
        setValue('resultado', examData.resultado);
      } else {
        console.error(`Consulta com ID ${id} não encontrada.`);
      }
    }
  }, [isEditing, id, setValue]);

  const onSubmit = (data) => {
    setLoading(true);
    try {
      if (isEditing) {
        const updatedExam = { ...data, idPaciente: selectedPatient.id };
        ExamService.updateExam(parseInt(id, 10), updatedExam);
      } else {
        const newExam = { ...data, idPaciente: selectedPatient.id };
        ExamService.createExam(newExam);
      }
      setIsSaved(true);
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsSaved(true);
        if (!isEditing) {
          navigate(`/edit-exam/${ExamService.getLastExamId()}`);
        }
      }, 1500);
    }
  };

  const handleDeleteExam = () => {
    setLoading(true);
    try {
      ExamService.deleteExam(parseInt(id, 10));
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setValue('exame', "");
        setValue('data', "");
        setValue('hora', "");
        setValue('tipo', "");
        setValue('laboratorio', "");
        setValue('url', "");
        setValue('resultado', "");
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
                  {isDeleted ? <StyledButton type="button" $delete $disabled disabled onClick={handleDeleteExam}>Deletar</StyledButton> : <StyledButton type="button" $delete onClick={handleDeleteExam}>Deletar</StyledButton>}
                </>
              )}
            </Child>
          )}
        </EqualDivider>
      
        {selectedPatient && (
          <EqualDivider><Child>
            <StyledLabel $tittle>Exame de {selectedPatient.nome}</StyledLabel>
          </Child></EqualDivider>
        )}
        <EqualDivider>
          <Child>
            <StyledLabel>Nome do Exame:</StyledLabel>
            <StyledInput
              type="text"
              {...register('exame', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 5,
                  message: 'Mínimo 5 caracteres',
                },
                maxLength: {
                  value: 50,
                  message: 'Máximo 50 caracteres',
                },
              })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.exame && <StyledAlert>{errors.exame.message}</StyledAlert>}
          </Child>
          <Child>
            <StyledLabel>Data do exame:</StyledLabel>
            <StyledInput
              type="date"
              {...register('data', { required: 'Campo obrigatório' })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.data && <StyledAlert>{errors.data.message}</StyledAlert>}
          </Child>
          <Child>
            <StyledLabel>Horário do exame:</StyledLabel>
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
            <StyledLabel>Tipo do Exame:</StyledLabel>
            <StyledInput
              type="text"
              {...register('tipo', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 5,
                  message: 'Mínimo 5 caracteres',
                },
                maxLength: {
                  value: 30,
                  message: 'Máximo 30 caracteres',
                },

              })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.tipo && <StyledAlert>{errors.tipo.message}</StyledAlert>}
            </Child>
            <Child>
            <StyledLabel>Laboratório:</StyledLabel>
            <StyledInput
              type="text"
              {...register('laboratorio', {
                required: 'Campo obrigatório',
                minLength: {
                  value: 5,
                  message: 'Mínimo 5 caracteres',
                },
                maxLength: {
                  value: 30,
                  message: 'Máximo 30 caracteres',
                },

              })}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            {errors.laboratorio && <StyledAlert>{errors.laboratorio.message}</StyledAlert>}
            </Child>
            </EqualDivider><EqualDivider>
            <Child>
            <StyledLabel>URL do Documento do Exame:</StyledLabel>
            <StyledInput
              type="text"
              {...register('url')}
              disabled={!selectedPatient || isEditing && !isSwitchOn} 
            />
            <StyledLabel>Resultado do Exame:</StyledLabel>
            <StyledTextarea
              type="text"
              {...register('resultado', {
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
            {errors.resultado && <StyledAlert>{errors.resultado.message}</StyledAlert>}
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

export default ExamRegisterForm;