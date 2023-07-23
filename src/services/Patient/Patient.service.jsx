import { LocalStorageService } from "../LocalStorage.service";

const PATIENTS_KEY = 'patients';

const getPatients = () => {
  return LocalStorageService.get(PATIENTS_KEY) || [];
};

const savePatients = (patients) => {
  LocalStorageService.set(PATIENTS_KEY, patients);
};

const createPatient = (data) => {
  const patients = getPatients();

  data = {
    id: patients.length + 1,
    ...data,
  };

  savePatients([...patients, data]);
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

export const PatientService = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
};