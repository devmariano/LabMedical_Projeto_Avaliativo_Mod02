import * as Styled from './PatientRecord.style';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PatientService } from '../../services/Patient/Patient.service';
import { AppointmentService } from '../../services/Patient/Patient.service';
import { ExamService } from '../../services/Patient/Patient.service';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMenu } from "../../contexts/menu/menu.context";
import { Col, Row } from "react-bootstrap";


export const PatientRecordPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [exams, setExams] = useState([]);
    const { setTittle } = useMenu();

    useEffect(() => {
        setTittle('PRONTUÁRIO DO PACIENTE');
    }, [setTittle]);

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = () => {
        const patientData = PatientService.getPatientById(parseInt(id));
        if (patientData) {
            setPatient(patientData);
            fetchAppointments(patientData.id);
            fetchExams(patientData.id);
        }
    };

    const fetchAppointments = (patientId) => {
        const appointmentsData = AppointmentService.getAppointmentByPatientId(patientId);
        setAppointments(appointmentsData);
    };

    const fetchExams = (patientId) => {
        const examsData = ExamService.getExamByPatientId(patientId);
        setExams(examsData);
    };


    const combineAndSortItems = () => {
        const combinedItems = [...appointments.map((item, index) => ({ ...item, tipo: "consulta", numero: index + 1 })), ...exams.map((item, index) => ({ ...item, tipo: "exame", numero: index + 1 }))];
        return combinedItems.sort((a, b) => {
            const dateA = new Date(a.data + " " + a.hora);
            const dateB = new Date(b.data + " " + b.hora);
            return dateA - dateB;
        });
    };

    let cardNumber = 1;

    const renderCardNumber = () => {
        return cardNumber++;
    };


    const sortedItems = combineAndSortItems();

    return (
        <Styled.PageWrapper>
            <Styled.PageContainer>
                {patient && (
                    <Styled.PatientCard>
                        <Styled.CardContent>
                            <Row>
                                <Col xs="auto">
                                    <Styled.IconWrapper>
                                        <FaUser />
                                    </Styled.IconWrapper>
                                </Col>
                                <Col>
                                    <Styled.PatientName>{patient.nome}</Styled.PatientName>
                                    <Styled.PatientDataRow>
                                        <Styled.PatientData>
                                            <Styled.PatientDataLabel>Convênio:</Styled.PatientDataLabel>
                                            <p>{patient.convenio}</p>
                                            <Styled.PatientDataLabel>Contato de Emergência:</Styled.PatientDataLabel>
                                            <p>{patient.contatoEmergencia}</p>
                                        </Styled.PatientData>
                                        <Styled.PatientData>
                                            <Styled.PatientDataLabel>Alergias:</Styled.PatientDataLabel>
                                            <p>{patient.alergias || "Nenhuma"}</p>
                                            <Styled.PatientDataLabel>Cuidados Específicos:</Styled.PatientDataLabel>
                                            <p>{patient.cuidadosEspeciais}</p>
                                        </Styled.PatientData>
                                    </Styled.PatientDataRow>
                                </Col>
                            </Row>
                        </Styled.CardContent>
                    </Styled.PatientCard>
                )}

                {sortedItems.map((item, index) => (
                    <>
                        <Styled.CardTitle><Styled.ConsultNumber>{renderCardNumber()}</Styled.ConsultNumber> {item.tipo === "consulta" ? "CONSULTA" : "EXAME"} </Styled.CardTitle>
                        <Styled.ItemCard key={item.id + index} type={item.tipo}> 
                            <Styled.CardContent>
                            <Styled.DateTimeWrapper>
                                <Styled.DateTime>
                                    {item.data} - {item.hora}
                                </Styled.DateTime>
                            </Styled.DateTimeWrapper>
                                {item.tipo === "consulta" ? (
                                    <>
                                        <p>Motivo: {item.motivo}</p>
                                        <p>Descrição do Problema: {item.descricao}</p>
                                        <p>Medicação Receitada: {item.medicacao}</p>
                                        <p>Dosagem e Precauções: {item.dosagem}</p>
                                        <Styled.StyledButtonWrapper>
                                        <Link to={`/edit-appointment/${item.id}`}>
                                            <Styled.StyledButton>Editar Consulta</Styled.StyledButton>
                                        </Link>
                                        </Styled.StyledButtonWrapper>
                                    </>
                                ) : (
                                    <>
                                        <p>Nome do exame: {item.exame}</p>
                                        <p>Laboratório: {item.laboratorio}</p>
                                        <p>Resultado: {item.resultado}</p>
                                        <Styled.StyledButtonWrapper>
                                        <Link to={`/edit-exam/${item.id}`}>
                                            <Styled.StyledButton>Editar Exame</Styled.StyledButton>
                                        </Link>
                                        </Styled.StyledButtonWrapper>
                                    </>
                                )}
                            </Styled.CardContent>
                        </Styled.ItemCard>
                    </>
                ))}
            </Styled.PageContainer>
        </Styled.PageWrapper>
    );
};