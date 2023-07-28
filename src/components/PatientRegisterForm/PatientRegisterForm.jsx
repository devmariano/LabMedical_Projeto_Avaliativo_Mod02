import React from 'react';
import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { StyledForm, StyledInput, StyledButton, StyledAlert, StyledSelect, StyledLabel,EqualDivider,Child } from './PatientRegisterForm.styled';
import { PatientService } from '../../services/Patient/Patient.service';
import getAddressInfo from '../../services/Address/AddressService';
import LoadingSpinner from '../Loading/LoadingSpinner.component';


const PatientRegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(false); // Estado para controlar a exibição do spinner
    const [isSaved, setIsSaved] = useState(false); // Estado para controlar final do salvamento 
    

    const onSubmit = (data) => {
        setLoading(true); // Ativa o spinner
        try {
            // Lógica para salvar os dados no LocalStorage
            const newPatient = PatientService.createPatient(data);
        } catch (error) {
            console.error(error.message);
        } finally {                       // Atraso de 2 segundos antes de desativar o spinner
            setTimeout(() => {
            setLoading(false);// Desativa o spinner após 2 segundos
            setIsSaved(true); //altera o state do salved
          }, 1500);
        }

    };

    const handleCepChange = async (event) => {
        const cep = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length === 8) {
            try {
                const addressInfo = await getAddressInfo(cep);
                alert(addressInfo.logradouro);
                setValue('logradouro', addressInfo.logradouro);
                setValue('bairro', addressInfo.bairro);
                setValue('cidade', addressInfo.cidade);
                setValue('estado', addressInfo.estado);
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    return (
        <> 
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <EqualDivider><StyledLabel $tittle>DADOS PESSOAIS:</StyledLabel></EqualDivider>
        <EqualDivider>
            <Child>
            {/* Nome Completo */}
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
            />
            {errors.nome && <StyledAlert>{errors.nome.message}</StyledAlert>}
            </Child><Child>
            {/* Gênero */}
            <StyledLabel>Gênero:</StyledLabel>
            <StyledSelect {...register('genero', { required: 'Campo obrigatório' })}>
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao_binario">Não-Binário</option>
                <option value="prefiro_nao_informar">Prefiro não informar</option>
            </StyledSelect>
            {errors.genero && <StyledAlert>{errors.genero.message}</StyledAlert>}
            </Child><Child>
            {/* Data de Nascimento */}
            <StyledLabel>Data de Nascimento:</StyledLabel>
            <StyledInput
                type="date"
                {...register('dataNascimento', { required: 'Campo obrigatório' })}
            />
            {errors.dataNascimento && <StyledAlert>{errors.dataNascimento.message}</StyledAlert>}
            </Child>
            </EqualDivider><EqualDivider>
            {/* CPF */}
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
            />
            {errors.cpf && <span>{errors.cpf.message}</span>}
            </Child><Child>
            {/* RG com órgão expedidor */}
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
            />
            {errors.rg && <span>{errors.rg.message}</span>}
            </Child><Child>
            {/* Estado Civil */}
            <StyledLabel>Estado Civil:</StyledLabel>
            <StyledSelect {...register('estadoCivil', { required: 'Campo obrigatório' })}>
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
            </EqualDivider><EqualDivider>
            <Child>
            {/* Telefone */}
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
            />
            {errors.telefone && <StyledAlert>{errors.telefone.message}</StyledAlert>}
            </Child><Child>
            {/* E-mail */}
            <StyledLabel>E-mail:</StyledLabel>
            <StyledInput
                type="email"
                {...register('email', {
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'E-mail inválido',
                    },
                })}
            />
            {errors.email && <span>{errors.email.message}</span>}
            </Child><Child>
            {/* Contato de Emergência */}
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
            />
            {errors.contatoEmergencia && <StyledAlert>{errors.contatoEmergencia.message}</StyledAlert>}
            </Child>
            </EqualDivider>
            <EqualDivider><StyledLabel $tittle>DADOS MÉDICOS:</StyledLabel>
            </EqualDivider><EqualDivider>
            <Child>
            {/* Lista de Alergias */}
            <StyledLabel>Lista de Alergias:</StyledLabel>
            <StyledInput
                type="text"
                {...register('alergias')}
            />
            {/* Lista de Cuidados Específicos */}
            <StyledLabel>Lista de Cuidados Específicos:</StyledLabel>
            <StyledInput
                type="text"
                {...register('cuidadosEspeciais')}
            />
            </Child>
            </EqualDivider><EqualDivider>
            <Child>
            {/* Convênio */}
            <StyledLabel>Convênio:</StyledLabel>
            <StyledInput
                type="text"
                {...register('convenio')}
            />
            </Child><Child>
            {/* Numero Convenio */}
            <StyledLabel>Numero do convênio:</StyledLabel>
            <StyledInput
                type="text"
                {...register('numeroConvenio')}
            />
            </Child><Child>
            {/* validade Convenio */}
            <StyledLabel>Validade do convênio:</StyledLabel>
            <StyledInput
                type="date"
                {...register('validadeConvenio')}
            />
            </Child>
            </EqualDivider>
            <EqualDivider><StyledLabel $tittle>ENDEREÇO:</StyledLabel>
            </EqualDivider>
            <EqualDivider>  
            {/* Campo para inserir o CEP */}
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
                onChange={handleCepChange} // Chama a função de busca de endereço quando o campo perder o foco
            />
            {errors.cep && <StyledAlert>{errors.cep.message}</StyledAlert>}
            {/* Campos de endereço preenchidos automaticamente */}
            <StyledLabel>Logradouro:</StyledLabel>
            <StyledInput type="text" {...register('logradouro')} />
            <StyledLabel>Numero:</StyledLabel>
            <StyledInput type="text" {...register('numero')} />
            </Child><Child>
            <StyledLabel>Bairro:</StyledLabel>
            <StyledInput type="text" {...register('bairro')} />
            <StyledLabel>Cidade:</StyledLabel>
            <StyledInput type="text" {...register('cidade')} />
            <StyledLabel>Estado:</StyledLabel>
            <StyledInput type="text" {...register('estado')} />
            </Child>
            </EqualDivider><EqualDivider>
            <Child>
            {isSaved==true && <div style={{ color: 'green' }}>Salvo com sucesso!</div>}
            {loading && <LoadingSpinner />} {/* Exibe o spinner enquanto o formulário é enviado */}
            </Child>
            <StyledButton type="submit">Salvar</StyledButton>

            </EqualDivider>
        </StyledForm>
        </>
    );
};

export default PatientRegisterForm;