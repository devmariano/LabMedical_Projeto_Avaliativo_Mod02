import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledSelect, StyledLabel, EqualDivider, Child } from './AppointmentRegisterForm.styled';
import { AppointmentService } from '../../services/Patient/Patient.service';
import LoadingSpinner from '../Loading/LoadingSpinner.component';
import { useNavigate } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const AppointmentRegisterForm = ({ isEditing = false }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false); // Estado para controlar a exibição do spinner
  const [isSaved, setIsSaved] = useState(false); // Estado para controlar final do salvamento
  const [isDeleted, setIsDeleted] = useState(false); // controla se aj foi deletado

  const navigate = useNavigate();


  const { id } = useParams(); // Get the id parameter from the URL
  const parsedId = parseInt(id, 10);

  useEffect(() => {
    if (!isEditing ) {
        setValue('motivo', "");
        setValue('data', "");
        setValue('hora', "");
        setValue('descricao', "");
        setValue('medicacao', "");
        setValue('dosagem', "");
    }
    if (isEditing && parsedId) {
    scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuart' });
      // Fetch Appointment data using the id
      const AppointmentData = AppointmentService.getAppointmentById(parsedId);
      // Check if AppointmentData is not undefined before populating the form fields
      if (AppointmentData) {
        setValue('motivo', AppointmentData.motivo);
        setValue('data', AppointmentData.data);
        setValue('hora', AppointmentData.hora);
        setValue('descricao', AppointmentData.descricao);
        setValue('medicacao', AppointmentData.medicacao);
        setValue('dosagem', AppointmentData.dosagem);
      } else {
        console.error(`Paciente com ID ${id} não encontrado.`);
        // Handle the case when the Appointment data is not found (e.g., redirect to an error page)
      }
    }
  }, [isEditing, parsedId, setValue]);

  const onSubmit = (data) => {
    setLoading(true); // Ativa o spinner
    try {
      // Lógica para salvar os dados no LocalStorage
      if (isEditing) {
        AppointmentService.updateAppointment(parsedId, data);
      } else {
        AppointmentService.createAppointment(data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      // Atraso de 2 segundos antes de desativar o spinner
      setTimeout(() => {
        setLoading(false); // Desativa o spinner após 2 segundos
        setIsSaved(true); //altera o state do salved
        if (!isEditing) {
            // Redirecionar para a página de edição do paciente, passando o id como parâmetro na URL // Obtenha o id do paciente recém-criado (por exemplo, usando o retorno da função de criação do serviço)
            // navigate(`/edit-appointment/${AppointmentService.getLastId()}`);
            navigate(`/edit-appointment/1`);
          }
      }, 1500);
    }
  };

  
  const handleDeleteAppointment = () => {
    setLoading(true); // Ativa o spinner
    try {
      AppointmentService.deleteAppointment(parsedId);
    } catch (error) {
      console.error(error.message);
    } finally {
      // Atraso de 2 segundos antes de desativar o spinner
      setTimeout(() => {
        setLoading(false); // Desativa o spinner após 2 segundos
        setValue('motivo', AppointmentData.motivo);
        setValue('data', AppointmentData.data);
        setValue('hora', AppointmentData.hora);
        setValue('descricao', AppointmentData.descricao);
        setValue('medicacao', AppointmentData.medicacao);
        setValue('dosagem', AppointmentData.dosagem);
        setIsDeleted(true); 
      }, 1500);
    }
  };


  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = (event) => {
    setIsSaved(false)
    setIsSwitchOn(event.target.checked); // Atualiza o estado quando o switch é clicado
  };


    // Function to get the current date in the format YYYY-MM-DD
    const getCurrentDate = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    // Function to get the current time in the format HH:mm
    const getCurrentTime = () => {
      const currentTime = new Date();
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    };
  
    // Set initial values for data and horario fields when not in edit mode
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
          {isDeleted == true && <div style={{ color: '#f17979' }}><h5>Removido com sucesso!</h5></div>}
          {isSaved && isEditing && !isDeleted == true && <div style={{ color: '#6ac04e' }}><h5>Registrado com sucesso!</h5></div>}
            {loading && <LoadingSpinner />} {/* Exibe o spinner enquanto o formulário é enviado */}
          </Child>
          <Child>
          </Child>
          {isEditing && (
            <Child>   
            <h5>Ativar edição da consulta</h5>
            <Form.Switch
            id="custom-switch"
            label={isSwitchOn ? "DESATIVAR" :  "ATIVAR"}
            checked={isSwitchOn}
            onChange={handleSwitchChange}/>
              {isSwitchOn && (<>
              {isDeleted ? <StyledButton type="submit" disabled $disabled >Salvar alterações</StyledButton>  : <StyledButton type="submit" >Salvar alterações</StyledButton>}
              {isDeleted ? <StyledButton type="button" $delete $disabled disabled onClick={handleDeleteAppointment}>Deletar</StyledButton>  : <StyledButton type="button" $delete  onClick={handleDeleteAppointment}>Deletar</StyledButton>}
              </>)}
              </Child> 
          )}
        </EqualDivider>
        <EqualDivider><StyledLabel $tittle>DADOS DA CONSULTA:</StyledLabel></EqualDivider>
        <EqualDivider>
            <Child>
            {/* Nome Completo */}
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
            />
            {errors.motivo && <StyledAlert>{errors.motivo.message}</StyledAlert>}
            </Child><Child>
            {/* Data resgatado do sistema */}
            <StyledLabel>Data da consulta:</StyledLabel>
            <StyledInput
                type="date"
                {...register('data', { required: 'Campo obrigatório' })}
            />
            {errors.data && <StyledAlert>{errors.data.message}</StyledAlert>}
            </Child>
            <Child>
            {/* Hora resgatado do sistema */}
            <StyledLabel>Horário da consulta:</StyledLabel>
            <StyledInput
                type="text"
                {...register('hora', { required: 'Campo obrigatório' })}
            />
            {errors.hora && <StyledAlert>{errors.hora.message}</StyledAlert>}
            </Child>
            </EqualDivider><EqualDivider>
            {/* CPF */}
            <Child>
            <StyledLabel>Descrição do Problema:</StyledLabel>
            <StyledInput
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
            />
            {errors.descricao && <StyledAlert>{errors.descricao.message}</StyledAlert>}
            {/* Lista de Alergias */}
            <StyledLabel>Medicação Receitada:</StyledLabel>
            <StyledInput
                type="text"
                {...register('medicacao')}
            />
            <StyledLabel>Dosagem e Precauções:</StyledLabel>
            <StyledInput
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
            />
            {errors.dosagem && <StyledAlert>{errors.dosagem.message}</StyledAlert>}
            </Child>
            </EqualDivider>
            {!isEditing ?
            <EqualDivider>
            <StyledButton type="submit" >Salvar</StyledButton>
            </EqualDivider>
            : ''}
        </StyledForm>
        </>
    );
};

export default AppointmentRegisterForm;