import * as Styled from './PatientRegister.style';
import { useEffect } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";

export const PatientRegisterPage = () => {
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('CADASTRO DE PACIENTE');
      }, [setTittle]);
    
    return (
        <>Cadastro de paciente</>
    )

}
