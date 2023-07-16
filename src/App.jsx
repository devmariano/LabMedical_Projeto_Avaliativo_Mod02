import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/Login/Login.page';
import { HomePage } from './pages/Home/Home.page';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='*' element={<><p>Página não existe</p></>}/>
      </Routes>
    </Router>
  )
}

export default App