import { useEffect } from "react";
import { useMenu } from "../../contexts/menu/menu.context";
import CardStatus from "../../components/CardStatus/CardStatus";
import { FaUser, FaStethoscope, FaFileMedical } from 'react-icons/fa';
import * as Styled from './Home.style'


export const HomePage = () => {

  const { setTittle } = useMenu();
  
  useEffect(() => { 
    setTittle('ESTATISTICAS E INFORMAÇÕES');
      }, []);
    
    return(
    <Styled.Dasboard>
    <div class="container">
    <Styled.Title>Estatísticas do Sistema</Styled.Title>
    <div class="row">
    <div class="col">
    <CardStatus title="Pacientes Cadastrados" value="100" icon={<FaUser />} />
    </div>
    <div class="col">
    <CardStatus title="Consultas Cadastradas" value="50" icon={<FaStethoscope />} />
    </div>
    <div class="col">
    <CardStatus title="Exames Cadastrados" value="75" icon={<FaFileMedical />} />
    </div>
    
  </div>
  
</div>
      </Styled.Dasboard>
    )
  

}

