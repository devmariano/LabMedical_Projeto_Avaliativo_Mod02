import React, { useEffect } from "react";
import { useMenu } from "../../contexts/menu/menu.context";
import CardStatus from "../../components/CardStatus/CardStatus";
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './Home.style';
import SearchBar from "../../components/searchBar/searchBar.component";
import { Row, Col } from 'react-bootstrap';

export const HomePage = () => {
  const { setTittle } = useMenu();

  useEffect(() => {
    setTittle('ESTATISTICAS E INFORMAÇÕES');
  }, []);

  return (
    <Styled.Dasboard>
      <div className="container">
        <Styled.Title>Estatísticas do Sistema</Styled.Title>
        <Row>
          <Col>
            <CardStatus title="Pacientes Cadastrados" value="100" color='#36d2b1' icon={<FaUser />} />
          </Col>
          <Col>
            <CardStatus title="Consultas Cadastradas" value="50" color='#6674d2' icon={<FaStethoscope />} />
          </Col>
          <Col>
            <CardStatus title="Exames Cadastrados" value="75" color='#e98b58' icon={<FaFileMedical />} />
          </Col>
        </Row>
        <Styled.Title>Informações Rápidas de Pacientes</Styled.Title>
        <SearchBar />
      </div>
    </Styled.Dasboard>
  )
}

