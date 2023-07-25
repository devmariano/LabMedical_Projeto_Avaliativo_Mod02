import * as Styled from './Appointment.style';
import { useEffect } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";

export const AppointmentPage = () => {
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('CADASTRO DE CONSULTA');
      }, [setTittle]);
    
    return (
        <>Agendamento de consulta</>
    )

}
