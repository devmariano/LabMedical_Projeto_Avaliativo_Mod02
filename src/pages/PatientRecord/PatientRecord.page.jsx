import * as Styled from './PatientRecord.style';
import { useEffect } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";

export const PatientRecordPage = () => {
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('PRONTUÁRIO DO PACIENTE');
      }, [setTittle]);
    
    return (
        <>Prontuário do Paciente</>
    )

}
