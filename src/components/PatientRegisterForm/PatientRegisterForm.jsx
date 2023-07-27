import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from './PatientRegisterForm.styled';
import { PatientService } from '../../services/Patient/Patient.service';
import getAddressInfo from '../../services/Address/AddressService';
import LoadingSpinner from '../Loading/LoadingSpinner.component';


const PatientRegisterForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [loading, setLoading] = useState(false); // Estado para controlar a exibição do spinner


    const onSubmit = (data) => {
        setLoading(true); // Ativa o spinner
        try {
            // Lógica para salvar os dados no LocalStorage
            const newPatient = PatientService.createPatient(data);
            console.log('New Patient:', newPatient);
        } catch (error) {
            console.error(error.message);
        } finally {                       // Atraso de 2 segundos antes de desativar o spinner
            setTimeout(() => {
            setLoading(false); // Desativa o spinner após 2 segundos
          }, 3000);
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
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* Nome Completo */}
            <label>Nome Completo:</label>
            <input
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
            {errors.nome && <span>{errors.nome.message}</span>}

            {/* Gênero */}
            <label>Gênero:</label>
            <select {...register('genero', { required: 'Campo obrigatório' })}>
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao_binario">Não-Binário</option>
                <option value="prefiro_nao_informar">Prefiro não informar</option>
            </select>
            {errors.genero && <span>{errors.genero.message}</span>}

            {/* Data de Nascimento */}
            <label>Data de Nascimento:</label>
            <input
                type="date"
                {...register('dataNascimento', { required: 'Campo obrigatório' })}
            />
            {errors.dataNascimento && <span>{errors.dataNascimento.message}</span>}

            {/* CPF */}
            <label>CPF:</label>
            <input
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

            {/* RG com órgão expedidor */}
            <label>RG com órgão expedidor:</label>
            <input
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

            {/* Estado Civil */}
            <label>Estado Civil:</label>
            <select {...register('estadoCivil', { required: 'Campo obrigatório' })}>
                <option value="">Selecione...</option>
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a)</option>
                <option value="uniao">União estável</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
                <option value="outro">Outro</option>
            </select>
            {errors.estadoCivil && <span>{errors.estadoCivil.message}</span>}

            {/* Telefone */}
            <label>Telefone:</label>
            <input
                type="text"
                {...register('telefone', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^\(\d{2}\) \d \d{4}-\d{5}$/,
                        message: 'Formato inválido (99) 9 9999-99999',
                    },
                })}
            />
            {errors.telefone && <span>{errors.telefone.message}</span>}

            {/* E-mail */}
            <label>E-mail:</label>
            <input
                type="email"
                {...register('email', {
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'E-mail inválido',
                    },
                })}
            />
            {errors.email && <span>{errors.email.message}</span>}

            {/* Contato de Emergência */}
            <label>Contato de Emergência:</label>
            <input
                type="text"
                {...register('contatoEmergencia', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^\(\d{2}\) \d \d{4}-\d{5}$/,
                        message: 'Formato inválido (99) 9 9999-99999',
                    },
                })}
            />
            {errors.contatoEmergencia && <span>{errors.contatoEmergencia.message}</span>}

            {/* Lista de Alergias */}
            <label>Lista de Alergias:</label>
            <input
                type="text"
                {...register('alergias')}
            />

            {/* Lista de Cuidados Específicos */}
            <label>Lista de Cuidados Específicos:</label>
            <input
                type="text"
                {...register('cuidadosEspeciais')}
            />

            {/* Convênio */}
            <label>Convênio:</label>
            <input
                type="text"
                {...register('convenio')}
            />

            {/* Numero Convenio */}
            <label>Numero do convênio:</label>
            <input
                type="text"
                {...register('numeroConvenio')}
            />

            {/* validade Convenio */}
            <label>Validade do convênio:</label>
            <input
                type="date"
                {...register('validadeConvenio')}
            />


            {/* Campo para inserir o CEP */}
            <label>CEP:</label>
            <input
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
            {errors.cep && <span>{errors.cep.message}</span>}

            {/* Campos de endereço preenchidos automaticamente */}
            <label>Logradouro:</label>
            <input type="text" {...register('logradouro')} />
            <label>Numero:</label>
            <input type="text" {...register('numero')} />
            <label>Bairro:</label>
            <input type="text" {...register('bairro')} />
            <label>Cidade:</label>
            <input type="text" {...register('cidade')} />
            <label>Estado:</label>
            <input type="text" {...register('estado')} />

            {loading && <LoadingSpinner />} {/* Exibe o spinner enquanto o formulário é enviado */}

            <button type="submit">Salvar</button>
        </FormContainer>
    );
};

export default PatientRegisterForm;