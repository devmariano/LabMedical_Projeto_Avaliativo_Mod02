import { LocalStorageService } from "../LocalStorage.service";

const patientsList = 'patients';
const appointmentsList = 'appointments';
const examsList = 'exams';

const getLastId = () => {
  const patients = getPatients();
  const id = patients.reduce((max, patients) => Math.max(max, patients.id), 0);
  return id;
}

const getLastAppointmentId = () => {
  const appointments = getAppointments();
  const id = appointments.reduce((max, appointment) => Math.max(max, appointment.id), 0);
  return id;
}

const getLastExamId = () => {
  const exams = getExams();
  const id = exams.reduce((max, exam) => Math.max(max, exam.id), 0);
  return id;
}


const getPatients = () => {
  return LocalStorageService.get(patientsList) || [];
};

const getAppointments = () => {
  return LocalStorageService.get(appointmentsList) || [];
};

const getExams = () => {
  return LocalStorageService.get(examsList) || [];
};

const savePatients = (patients) => {
  LocalStorageService.set(patientsList, patients);
};

const saveAppointments = (appointments) => {
  LocalStorageService.set(appointmentsList, appointments);
};

const saveExams = (exams) => {
  LocalStorageService.set(examsList, exams);
};

const createPatient = (data) => {
  const patients = getPatients();
  const maxId = patients.reduce((max, appointment) => Math.max(max, appointment.id), 0);

  const newPatient = {
    id: maxId + 1,
    ...data,
  };

  savePatients([...patients, newPatient]);
  return newPatient;
};

const createAppointment = (data) => {
  const appointments = getAppointments();
  const maxId = appointments.reduce((max, appointment) => Math.max(max, appointment.id), 0);


  const newAppointment = {
    id: maxId + 1,
    ...data,
  };

  saveAppointments([...appointments, newAppointment]);
  return newAppointment;
};

const createExam = (data) => {
  const exams = getExams();
  const maxId = exams.reduce((max, exam) => Math.max(max, exam.id), 0);


  const newExam = {
    id: maxId + 1,
    ...data,
  };

  saveExams([...exams, newExam]);
  return newExam;
};

const updatePatient = (id, data) => {
  const patients = getPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === id ? { ...patient, ...data } : patient
  );

  savePatients(updatedPatients);
};

const updateAppointment = (id, data) => {
  const appointments = getAppointments();

  const updatedAppointments = appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, ...data } : appointment
  );

  saveAppointments(updatedAppointments);
};

const updateExam = (id, data) => {
  const exams = getExams();

  const updatedExams = exams.map((exam) =>
    exam.id === id ? { ...exam, ...data } : exam
  );

  saveExams(updatedExams);
};

const deletePatient = (id) => {
  const patients = getPatients();
  const updatedPatients = patients.filter((patient) => patient.id !== id);
  savePatients(updatedPatients);
};

const deleteAppointment = (id) => {
  const appointments = getAppointments();
  const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
  saveAppointments(updatedAppointments);
};

const deleteExam = (id) => {
  const exams = getExams();
  const updatedExams = exams.filter((exam) => exam.id !== id);
  saveExams(updatedExams);
};

const getPatientById = (id) => {
  const patients = getPatients();
  return patients.find((patient) => patient.id === id);
};

const getAppointmentById = (id) => {
  const appointments = getAppointments();
  return appointments.find((appointment) => appointment.id === id);
};

const getExamById = (id) => {
  const exams = getExams();
  return exams.find((exam) => exam.id === id);
};

export const PatientService = {
  getLastId,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientById,
};

export const AppointmentService = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getLastAppointmentId,
};

export const ExamService = {
  getExams,
  createExam,
  updateExam,
  deleteExam,
  getExamById,
  getLastExamId,
};

