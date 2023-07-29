import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/Home/Home.page';

import { LocalStorageService } from './services/LocalStorage.service';
import { LoginPage } from './pages/Login/Login.page';
import { Layout } from './layout/Layout';
import userData from './data/userData.json';
import patientData from './data/patientData.json'
import { AppointmentPage } from './pages/Appointment/Appointment.page';
import { ExamPage } from './pages/Exam/Exam.page';
import { MedicalRecordPage } from './pages/MedicalRecord/MedicalRecord.page';
import { PatientRegisterPage } from './pages/PatientRegister/PatientRegister.page';
import { PatientRecordPage } from './pages/PatientRecord/PatientRecord.page';


if(!LocalStorageService.get('users')) {
  LocalStorageService.set('users', [...userData.users])
}

if(!LocalStorageService.get('patients')) {
  LocalStorageService.set('patients', [...patientData.patients])
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/appointment' element={<AppointmentPage/>}/>
          <Route path='/exam' element={<ExamPage/>}/>
          <Route path='/medicalrecord' element={<MedicalRecordPage/>}/>
          <Route path='/patientregister' element={<PatientRegisterPage/>}/>
          <Route path='/edit-patient/:id' element={<PatientRegisterPage/>}/>
          <Route path='/patientrecord' element={<PatientRecordPage/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<><p>Pagina não existe</p></>}/>
      </Routes>
    </Router>
  )
}

export default App