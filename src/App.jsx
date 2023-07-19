import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/Home/Home.page';

import { LocalStorageService } from './services/User/LocalStorage.service';
import { LoginPage } from './pages/Login.page';



if(!LocalStorageService.get('users')) {
  LocalStorageService.set('users', [
    {
      id: 1,
      nome: 'Admin',
      email: 'admin@labmedical.com',
      password: '12345678'
    },
    {
      id: 2,
      nome: 'Atendente',
      email: 'usuario@labmedical.com',
      password: '12345678'
    },
  ])
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<><p>Pagina não existe</p></>}/>
      </Routes>
    </Router>
  )
}

export default App