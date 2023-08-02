import * as Styled from './PatientRegister.style';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMenu } from "../../contexts/menu/menu.context";
import PatientRegisterForm from '../../components/PatientRegisterForm/PatientRegisterForm';


export const PatientRegisterPage = () => {
    const { setTittle } = useMenu();
    const { id } = useParams();

    useEffect(() => {
        {setTittle('CADASTRO DE PACIENTE')}
      }, [setTittle]);
    
    return (
        <>
        {id ? <PatientRegisterForm isEditing={true} /> : <PatientRegisterForm isEditing={false}/>}
        </>
    )

}
