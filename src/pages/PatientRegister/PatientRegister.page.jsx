import * as Styled from './PatientRegister.style';
import { useEffect } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";
import PatientRegisterForm from '../../components/PatientRegisterForm/PatientRegisterForm';

export const PatientRegisterPage = () => {
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('CADASTRO DE PACIENTE');
      }, [setTittle]);
    
    return (
        <>
        <PatientRegisterForm/>
        </>
    )

}
