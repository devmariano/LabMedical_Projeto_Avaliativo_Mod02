import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledSelect, StyledLabel, EqualDivider, Child } from './PatientRegisterForm.styled';
import { PatientService } from '../../services/Patient/Patient.service';
import getAddressInfo from '../../services/Address/AddressService';
import LoadingSpinner from '../Loading/LoadingSpinner.component';
import { useNavigate } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const PatientRegisterForm = ({ isEditing = false }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); 
  const [isDeleted, setIsDeleted] = useState(false); 

  const navigate = useNavigate();


  const { id } = useParams(); 
  const parsedId = parseInt(id, 10);

  useEffect(() => {
    if (!isEditing ) {
        setValue('nome', "");
        setValue('genero', "");
        setValue('dataNascimento', "");
        setValue('cpf', "");
        setValue('rg', "");
        setValue('estadoCivil', "");
        setValue('naturalidade', "");
        setValue('telefone', "");
        setValue('email', "");
        setValue('contatoEmergencia', "");
        setValue('alergias', "");
        setValue('cuidadosEspeciais', "");
        setValue('convenio', "");
        setValue('numeroConvenio', "");
        setValue('validadeConvenio', "");
        setValue('cep', "");
        setValue('logradouro', "");
        setValue('numero', "");
        setValue('bairro', "");
        setValue('cidade', "");
        setValue('estado', "");
        setValue('complemento', "");
        setValue('referencia', "");
    }
    if (isEditing && parsedId) {
    scroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuart' });
      const patientData = PatientService.getPatientById(parsedId);
      if (patientData) {
        setValue('nome', patientData.nome);
        setValue('genero', patientData.genero);
        setValue('dataNascimento', patientData.dataNascimento);
        setValue('cpf', patientData.cpf);
        setValue('rg', patientData.rg);
        setValue('estadoCivil', patientData.estadoCivil);
        setValue('naturalidade', patientData.naturalidade);
        setValue('telefone', patientData.telefone);
        setValue('email', patientData.email);
        setValue('contatoEmergencia', patientData.contatoEmergencia);
        setValue('alergias', patientData.alergias);
        setValue('cuidadosEspeciais', patientData.cuidadosEspeciais);
        setValue('convenio', patientData.convenio);
        setValue('numeroConvenio', patientData.numeroConvenio);
        setValue('validadeConvenio', patientData.validadeConvenio);
        setValue('cep', patientData.cep);
        setValue('logradouro', patientData.logradouro);
        setValue('numero', patientData.numero);
        setValue('bairro', patientData.bairro);
        setValue('cidade', patientData.cidade);
        setValue('estado', patientData.estado);
        setValue('complemento', patientData.complemento);
        setValue('referencia', patientData.referencia);
      } else {
        console.error(`Paciente com ID ${id} não encontrado.`);
      }
    }
  }, [isEditing, parsedId, setValue]);

  const onSubmit = (data) => {
    setLoading(true); 
    try {
      if (isEditing) {
        PatientService.updatePatient(parsedId, data);
      } else {
        PatientService.createPatient(data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false); 
        setIsSaved(true); 
        if (!isEditing) {
 navigate(`/edit-patient/${PatientService.getLastId()}`);
          }
      }, 1500);
    }
  };

  
  const handleDeletePatient = () => {
    setLoading(true); 
    try {
      PatientService.deletePatient(parsedId);
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false); 
        setValue('nome', "");
        setValue('genero', "");
        setValue('dataNascimento', "");
        setValue('cpf', "");
        setValue('rg', "");
        setValue('estadoCivil', "");
        setValue('naturalidade', "");
        setValue('telefone', "");
        setValue('email', "");
        setValue('contatoEmergencia', "");
        setValue('alergias', "");
        setValue('cuidadosEspeciais', "");
        setValue('convenio', "");
        setValue('numeroConvenio', "");
        setValue('validadeConvenio', "");
        setValue('cep', "");
        setValue('logradouro', "");
        setValue('numero', "");
        setValue('bairro', "");
        setValue('cidade', "");
        setValue('estado', "");
        setValue('complemento', "");
        setValue('referencia', "");
        setIsDeleted(true); 
      }, 1500);
    }
  };

  const handleCepChange = async (event) => {
    const cep = event.target.value.replace(/\D/g, ''); 
    if (cep.length === 8) {
      try {
        const addressInfo = await getAddressInfo(cep);
        setValue('logradouro', addressInfo.logradouro);
        setValue('bairro', addressInfo.bairro);
        setValue('cidade', addressInfo.cidade);
        setValue('estado', addressInfo.estado);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchChange = (event) => {
    setIsSaved(false)
    setIsSwitchOn(event.target.checked); 
  };

  

    return (
        <> 
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <EqualDivider>
          <Child>
          {isDeleted == true && <div style={{ color: '#f17979' }}><h5>Removido com sucesso!</h5></div>}
          {isSaved && isEditing && !isDeleted == true && <div style={{ color: '#6ac04e' }}><h5>Registrado com sucesso!</h5></div>}
            {loading && <LoadingSpinner />} 
          </Child>
          <Child>
          </Child>
          {isEditing && (
            <Child>   
            <h5>Ativar edição do paciente</h5>
            <Form.Switch
            id="custom-switch"
            label={isSwitchOn ? "DESATIVAR" :  "ATIVAR"}
            checked={isSwitchOn}
            onChange={handleSwitchChange}/>
              {isSwitchOn && (<>
              {isDeleted ? <StyledButton type="submit" disabled $disabled >Salvar alterações</StyledButton>  : <StyledButton type="submit" >Salvar alterações</StyledButton>}
              {isDeleted ? <StyledButton type="button" $delete $disabled disabled onClick={handleDeletePatient}>Deletar</StyledButton>  : <StyledButton type="button" $delete  onClick={handleDeletePatient}>Deletar</StyledButton>}
              </>)}
              </Child> 
          )}
        </EqualDivider>
        <EqualDivider><StyledLabel $tittle>DADOS PESSOAIS:</StyledLabel></EqualDivider>
        <EqualDivider>
            <Child>
            <StyledLabel>Nome Completo:</StyledLabel>
            <StyledInput
                type="text"
                {...register('nome', {
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
                disabled={isEditing && !isSwitchOn}
            />
            {errors.nome && <StyledAlert>{errors.nome.message}</StyledAlert>}
            </Child><Child>
            <StyledLabel>Gênero:</StyledLabel>
            <StyledSelect  {...register('genero', { required: 'Campo obrigatório' })} disabled={isEditing && !isSwitchOn} >
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao_binario">Não-Binário</option>
                <option value="prefiro_nao_informar">Prefiro não informar</option>
            </StyledSelect >
            {errors.genero && <StyledAlert>{errors.genero.message}</StyledAlert>}
            </Child><Child>
            <StyledLabel>Data de Nascimento:</StyledLabel>
            <StyledInput
                type="date"
                {...register('dataNascimento', { required: 'Campo obrigatório' })}
                disabled={isEditing && !isSwitchOn}
            />
            {errors.dataNascimento && <StyledAlert>{errors.dataNascimento.message}</StyledAlert>}
            </Child>
            </EqualDivider><EqualDivider>
            <Child>
            <StyledLabel>CPF:</StyledLabel>
            <StyledInput
                type="text"
                {...register('cpf', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        message: 'Formato inválido (000.000.000-00)',
                    },
                })}
                disabled={isEditing && !isSwitchOn}
            />
            {errors.cpf && <StyledAlert>{errors.cpf.message}</StyledAlert>}
            </Child><Child>
            <StyledLabel>RG com órgão expedidor:</StyledLabel>
            <StyledInput
                type="text"
                {...register('rg', {
                    required: 'Campo obrigatório',
                    maxLength: {
                        value: 20,
                        message: 'Máximo 20 caracteres',
                    },
                })}
                disabled={isEditing && !isSwitchOn}
            />
            {errors.rg && <StyledAlert>{errors.rg.message}</StyledAlert>}
            </Child><Child>
            <StyledLabel>Estado Civil:</StyledLabel>
            <StyledSelect {...register('estadoCivil', { required: 'Campo obrigatório' })} disabled={isEditing && !isSwitchOn}>
                <option value="">Selecione...</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="uniao">União estável</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
                <option value="outro">Outro</option>
            </StyledSelect>
            {errors.estadoCivil && <StyledAlert>{errors.estadoCivil.message}</StyledAlert>}
            </Child>
            <Child>
            <StyledLabel>Naturalidade:</StyledLabel>
            <StyledInput
                type="text"
                {...register('naturalidade', {
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
                disabled={isEditing && !isSwitchOn}
            />
            {errors.naturalidade && <StyledAlert>{errors.naturalidade.message}</StyledAlert>}
            </Child>
            </EqualDivider><EqualDivider>
            <Child>
            <StyledLabel>Telefone:</StyledLabel>
            <StyledInput
                type="text"
                {...register('telefone', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^\(\d{2}\) \d \d{4}-\d{5}$/,
                        message: 'Formato inválido (99) 9 9999-99999',
                    },
                })}
                disabled={isEditing && !isSwitchOn}
            />
            {errors.telefone && <StyledAlert>{errors.telefone.message}</StyledAlert>}
            </Child><Child>
            <StyledLabel>E-mail:</StyledLabel>
            <StyledInput
                type="email"
                {...register('email', {
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'E-mail inválido',
                    },
                })}
                disabled={isEditing && !isSwitchOn}
            />
            {errors.email && <span>{errors.email.message}</span>}
            </Child>
            <Child>
            <StyledLabel>Contato de Emergência:</StyledLabel>
            <StyledInput
                type="text"
                {...register('contatoEmergencia', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^\(\d{2}\) \d \d{4}-\d{5}$/,
                        message: 'Formato inválido (99) 9 9999-99999',
                    },
                })}
                disabled={isEditing && !isSwitchOn}
            />
            {errors.contatoEmergencia && <StyledAlert>{errors.contatoEmergencia.message}</StyledAlert>}
            </Child>
            </EqualDivider>
            <EqualDivider><StyledLabel $tittle>DADOS MÉDICOS:</StyledLabel>
            </EqualDivider><EqualDivider>
            <Child>
            <StyledLabel>Lista de Alergias:</StyledLabel>
            <StyledInput
                type="text"
                {...register('alergias')}
                disabled={isEditing && !isSwitchOn}
            />
            <StyledLabel>Lista de Cuidados Específicos:</StyledLabel>
            <StyledInput
                type="text"
                {...register('cuidadosEspeciais')}
                disabled={isEditing && !isSwitchOn}
            />
            </Child>
            </EqualDivider><EqualDivider>
            <Child>
            <StyledLabel>Convênio:</StyledLabel>
            <StyledInput
                type="text"
                {...register('convenio')}
                disabled={isEditing && !isSwitchOn}
            />
            </Child><Child>
            <StyledLabel>Numero do convênio:</StyledLabel>
            <StyledInput
                type="text"
                {...register('numeroConvenio')}
                disabled={isEditing && !isSwitchOn}
            />
            </Child><Child>
            <StyledLabel>Validade do convênio:</StyledLabel>
            <StyledInput
                type="date"
                {...register('validadeConvenio')}
                disabled={isEditing && !isSwitchOn}
            />
            </Child>
            </EqualDivider>
            <EqualDivider><StyledLabel $tittle>ENDEREÇO:</StyledLabel>
            </EqualDivider>
            <EqualDivider>  
            <Child>
            <StyledLabel>CEP:</StyledLabel>
            <StyledInput
                type="text"
                {...register('cep', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^\d{5}-?\d{3}$/,
                        message: 'CEP inválido (00000-000)',
                    },
                })}
                onChange={handleCepChange} 
                disabled={isEditing && !isSwitchOn}
            />
            {errors.cep && <StyledAlert>{errors.cep.message}</StyledAlert>}
            <StyledLabel>Logradouro:</StyledLabel>
            <StyledInput type="text" {...register('logradouro')} disabled={isEditing && !isSwitchOn} />
            <StyledLabel>Numero:</StyledLabel>
            <StyledInput type="text" {...register('numero')}  disabled={isEditing && !isSwitchOn} />
            <StyledLabel>Complemento:</StyledLabel>
            <StyledInput type="text" {...register('complemento')}  disabled={isEditing && !isSwitchOn} />
            </Child><Child>
            <StyledLabel>Bairro:</StyledLabel>
            <StyledInput type="text" {...register('bairro')}  disabled={isEditing && !isSwitchOn} />
            <StyledLabel>Cidade:</StyledLabel>
            <StyledInput type="text" {...register('cidade')}  disabled={isEditing && !isSwitchOn} />
            <StyledLabel>Estado:</StyledLabel>
            <StyledInput type="text" {...register('estado')}  disabled={isEditing && !isSwitchOn} />
            <StyledLabel>Ponto de referência:</StyledLabel>
            <StyledInput type="text" {...register('referencia')}  disabled={isEditing && !isSwitchOn} />
            </Child>
            </EqualDivider>
            {!isEditing ?
            <EqualDivider>
            <Child>
            {loading && <LoadingSpinner />} 
            </Child>
            <StyledButton type="submit" >Salvar</StyledButton>
            </EqualDivider>
            : ''}
        </StyledForm>
        </>
    );
};

export default PatientRegisterForm;