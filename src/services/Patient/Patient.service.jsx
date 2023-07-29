import { LocalStorageService } from "../LocalStorage.service";

const patientsList = 'patients';

const getPatients = () => {
  return LocalStorageService.get(patientsList) || [];
};

const savePatients = (patients) => {
  LocalStorageService.set(patientsList, patients);
};

const createPatient = (data) => {
  const patients = getPatients();

  const newPatient = {
    id: patients.length + 1,
    ...data,
  };

  savePatients([...patients, newPatient]);

  return newPatient;
};

const updatePatient = (id, data) => {
  const patients = getPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === id ? { ...patient, ...data } : patient
  );

  savePatients(updatedPatients);
};

const deletePatient = (id) => {
  const patients = getPatients();
  const updatedPatients = patients.filter((patient) => patient.id !== id);
  savePatients(updatedPatients);
};

const getPatientById = (id) => {
  const patients = getPatients();
  return patients.find((patient) => patient.id === id);
};

export const PatientService = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientById,
};

