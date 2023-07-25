import * as Styled from './Exam.style';
import { useEffect } from 'react';
import { useMenu } from "../../contexts/menu/menu.context";

export const ExamPage = () => {
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('CADASTRO DE EXAME');
      }, [setTittle]);
    
    return (
        <>Agendamento de exame</>
    )

}
