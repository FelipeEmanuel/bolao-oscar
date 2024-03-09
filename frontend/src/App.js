import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Cadastrar from './pages/Cadastrar'
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Ranking from './pages/Ranking';

function App() {
 
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/cadastrar' element={<Cadastrar/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/categorias' element={<Categorias/>}/>
            <Route path='/ranking' element={<Ranking/>}/>
          </Routes>
      </Router>
      <ToastContainer/>
    </>
    
  );
}

export default App;