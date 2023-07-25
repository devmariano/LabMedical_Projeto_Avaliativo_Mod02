import * as Styled from './Sidebar.style';
import { useNavigate } from 'react-router-dom'; 
import React, { useContext } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";
import { AuthContext } from '../../contexts/auth/auth.context';
import { FaAlignJustify } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { GoSidebarExpand } from 'react-icons/go';
import { ImExit } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';

export const SideBar = () => {
const { menuOpen, setMenuOpen } = useMenu();
const { handleLogout } = useContext(AuthContext);
const navigate = useNavigate(); 

const handleLogoutClick = () => {
  handleLogout();
  navigate('/login');
};

  return (
<Styled.Sidebar $open={menuOpen}>
      <Styled.Logo src='../../public/images/logo-white.png' />
      <Styled.MenuGroup>
        <Styled.Title>GERAL</Styled.Title>
        <Styled.Button onClick={() => {
          navigate('/');
        }} $withIcon>
          <FaChartBar /> INICIO
        </Styled.Button>
        <Styled.Button onClick={handleLogoutClick} 
        $withIcon>
          <ImExit /> SAIR
        </Styled.Button>
      </Styled.MenuGroup>
      <Styled.MenuGroup>
        <Styled.Title>PACIENTES</Styled.Title>
        <Styled.Button onClick={() => {
          navigate('/cadastrarusuario');
        }} $withIcon>
          <FaPlus />CADASTRAR
        </Styled.Button>
        <Styled.Button onClick={() => {
          navigate('/listarprontuario');
        }} $withIcon>
          <FaAlignJustify /> LISTAR PRONTUÁRIO
        </Styled.Button>
      </Styled.MenuGroup>
      <Styled.MenuGroup>
        <Styled.Title>EXAMES</Styled.Title>
        <Styled.Button onClick={() => {
          navigate('/cadastrarconsulta');
        }} $withIcon>
          <FaPlus /> CADASTRAR CONSULTA
        </Styled.Button>
        <Styled.Button onClick={() => {
          navigate('/cadastrarexame');
        }} $withIcon>
          <FaPlus /> CADASTRAR EXAME
        </Styled.Button>
      </Styled.MenuGroup>
      <Styled.imgButton onClick={() => { setMenuOpen(!menuOpen) }} $withIcon>{'Encolher menu '}
        <GoSidebarExpand />
      </Styled.imgButton>
    </Styled.Sidebar>
  );
};