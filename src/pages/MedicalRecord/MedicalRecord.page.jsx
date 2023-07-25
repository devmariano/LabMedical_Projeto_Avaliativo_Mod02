import * as Styled from './MedicalRecord.style';
import { useEffect } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";

export const MedicalRecordPage = () => {
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('LISTAGEM DE PRONTUÁRIOS');
      }, [setTittle]);
    
    return (
        <>Listagem de Prontuários dos Pacientes</>
    )

}
