import * as Styled from './Appointment.style';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMenu } from "../../contexts/menu/menu.context";
import AppointmentRegisterForm from '../../components/AppointmentRegisterForm/AppointmentRegisterForm';


export const AppointmentPage = () => {
    const { setTittle } = useMenu();
    const { id } = useParams();

    useEffect(() => {
        {setTittle('CADASTRO DE CONSULTA')}
      }, [setTittle]);
    
    return (
        <>
        {id ? <AppointmentRegisterForm isEditing={true} /> : <AppointmentRegisterForm isEditing={false}/>}
        </>
    )

}
