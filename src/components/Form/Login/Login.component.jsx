import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../contexts/auth/auth.context';
import { InputComponent } from '../Input/Input.component';
import * as Styled from './Login.style';
import { UserService } from '../../../services/User/User.service';
import { ModalComponent } from '../Modal/Modal.component';
import { Button } from 'react-bootstrap';

export const FormLoginComponent = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);

  // const createUser = () => {
  //   UserService.Create({
  //       email: 'emailteste@teste.com',
  //       password: '12345678'
  //   })
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createUser = (data) => {
    console.log(data);
    // Call the UserService.create function here
    UserService.Create(data);
    setIsModalOpen(false); // Close the modal after successful user creation
  };

  const submitForm = (data) => {
    const { email, password } = data;

    // const user = users.find(u => u.email === email);
    const user = UserService.ShowByEmail(email);

    if(!user) {
      alert('Usuário não cadastrado');
      reset();
      return;
    }

    password === user.password
      ? redirectToHome(user)
      : alert('Ops! Usuário e/ou Senha Invalidos.');
  }

  const redirectToHome = (user) => {
    setAuth({ user, isLogged: true });
    navigate('/');
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return(
    
    <Styled.Form onSubmit={handleSubmit(submitForm)}>
      <Styled.Header>
      <Styled.ActionTop>
      <Styled.Text>Não possui uma conta?</Styled.Text>
      {/* <Styled.Button $outlined={true} type='button' onClick={createUser}>Criar conta</Styled.Button> */}
      <Styled.Button $outlined={true} type='button' onClick={openModal}>Criar conta</Styled.Button>
      </Styled.ActionTop>
      {/* Render the React Bootstrap modal */}
      <ModalComponent
        show={isModalOpen}
        onClose={closeModal}
        onSubmit={createUser}
      />
      <Styled.Logo/>
        <Styled.Title>Login</Styled.Title>
      </Styled.Header>
      <Styled.InputGroup>
        <InputComponent
          id='email'
          type='email' 
          placeholder='Digite seu email' 
          label='E-mail'
          register={{...register('email', {
              required: true, 
              validate: { matchPath: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) }
            })
          }}
          error={ errors.email }
        />
        <InputComponent
          id='password'
          type='password'
          placeholder='Digite sua senha'
          label='Senha'
          register={{...register('password', { required: true, minLength: 8 })}}
          error={ errors.password }
        />
      </Styled.InputGroup>

      <Styled.Button $active={ !errors.email && !errors.password } type='submit' disabled={ errors.email || errors.password }>Entrar</Styled.Button>

      <Styled.ActionBase>
        <Styled.EsqueciSenha>Esqueci minha senha</Styled.EsqueciSenha>
      </Styled.ActionBase>

    </Styled.Form>
    
  )
}