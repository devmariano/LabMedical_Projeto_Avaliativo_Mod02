import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button } from 'react-bootstrap';
import { InputComponent } from '../Input/Input.component';
import * as Styled from './Modal.style';


export const ModalComponent = ({ show, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const validatePasswordConfirmation = (value) => {
    const password = getValues('password');
    return value === password || 'As senhas não coincidem.';
  };


  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Styled.Title>Criar conta</Styled.Title>
      </Modal.Header>
      <Modal.Body>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.InputGroup>
          <InputComponent
              id='modalNome'
              type='text'
              placeholder='Digite seu nome'
              label='Nome'
              register={{
                ...register('nome', {
                  required: true,
                })
              }}
              error={errors.nome}
            />
            <InputComponent
              id='modaltroEmail'
              type='email'
              placeholder='Digite seu email'
              label='E-mail'
              register={{
                ...register('email', {
                  required: true,
                  validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) }
                })
              }}
              error={errors.email}
            />
            <InputComponent
              id='modalPassword'
              type='password'
              placeholder='Digite uma senha'
              label='Senha'
              register={{ ...register('password', { required: true, minLength: 8 }) }}
              error={errors.password}
            />
            <InputComponent
              id='modalConfirmPassword' // Adicione um novo campo para confirmação de senha
              type='password'
              placeholder='Confirme sua senha'
              label='Confirme sua senha'
              register={{
                ...register('confirmPassword', {
                  required: true,
                  minLength: 8,
                  validate: validatePasswordConfirmation,
                }),
              }}
              error={errors.confirmPassword}
            />
            
          </Styled.InputGroup>

          <Styled.Button $active={!errors.email && !errors.password && !errors.confirmPassword} type='submit' disabled={errors.email || errors.password || errors.confirmPassword}>Criar</Styled.Button>

          <Styled.Button $outlined={true} type='button' onClick={onClose}>Voltar</Styled.Button>

        </Styled.Form>
      </Modal.Body>
    </Modal>
  );
};