import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/Home/Home.page';

import { LocalStorageService } from './services/User/LocalStorage.service';
import { LoginPage } from './pages/Login.page';
import userData from './data/userData.json';

console.log(userData.users);

if(!LocalStorageService.get('users')) {
  LocalStorageService.set('users', [...userData.users])
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