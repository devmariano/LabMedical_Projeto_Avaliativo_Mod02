import * as Styled from './Sidebar.style';
import { useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa';
import { FaColumns } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

export const SideBar = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate(); 

  return (
    <Styled.Sidebar $open={menuOpen}>
      <Styled.Logo src='../../public/images/logo-white.png' />
      <Styled.MenuGroup>
        <Styled.Title>GERAL</Styled.Title>
        <Styled.Button onClick={() => navigate('/')} $withIcon>
          <FaChartBar /> INICIO
        </Styled.Button>
        <Styled.Button onClick={() => navigate('/sair')} $withIcon>
          <ImExit /> SAIR
        </Styled.Button>
      </Styled.MenuGroup>
      <Styled.MenuGroup>
        <Styled.Title>PACIENTES</Styled.Title>
        <Styled.Button onClick={() => navigate('/cadastrar')} $withIcon>
          <FaPlus />CADASTRAR
          </Styled.Button>
        <Styled.Button onClick={() => navigate('/listarprontuario')} $withIcon>
          <FaAlignJustify /> LISTAR PRONTUÁRIO
        </Styled.Button>
      </Styled.MenuGroup>
      <Styled.MenuGroup>
        <Styled.Title>EXAMES</Styled.Title>
        <Styled.Button onClick={() => navigate('/cadastrarconsulta')} $withIcon>
          <FaPlus /> CADASTRAR CONSULTA
        </Styled.Button>
        <Styled.Button onClick={() => navigate('/cadastrarexame')} $withIcon>
          <FaAlignJustify /> CADASTRAR EXAME
        </Styled.Button>
      </Styled.MenuGroup>
      <Styled.imgButton onClick={() => {setMenuOpen(!menuOpen)}} $withIcon>
        <FaColumns />
      </Styled.imgButton>
    </Styled.Sidebar>
  );
}