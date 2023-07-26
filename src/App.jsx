import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/Home/Home.page';

import { LocalStorageService } from './services/User/LocalStorage.service';
import { LoginPage } from './pages/Login.page';
import { Layout } from './layout/Layout';
import userData from './data/userData.json';

console.log(userData.users);

if(!LocalStorageService.get('users')) {
  LocalStorageService.set('users', [...userData.users])
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<HomePage/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<><p>Pagina não existe</p></>}/>
      </Routes>
    </Router>
  )
}

export default App