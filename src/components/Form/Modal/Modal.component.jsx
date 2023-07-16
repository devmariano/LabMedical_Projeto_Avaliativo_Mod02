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
  } = useForm();


  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Styled.Title>Criar conta</Styled.Title>
      </Modal.Header>
      <Modal.Body>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.InputGroup>
            <InputComponent
              id='email'
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
              id='password'
              type='password'
              placeholder='Digite uma senha'
              label='Senha'
              register={{ ...register('password', { required: true, minLength: 8 }) }}
              error={errors.password}
            />
          </Styled.InputGroup>

          <Styled.Button $active={!errors.email && !errors.password} type='submit' disabled={errors.email || errors.password}>Criar</Styled.Button>

          <Styled.Button $outlined={true} type='button' onClick={onClose}>Voltar</Styled.Button>

        </Styled.Form>
      </Modal.Body>
    </Modal>
  );
};