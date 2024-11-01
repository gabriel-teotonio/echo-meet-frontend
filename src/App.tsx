import { Route, Routes } from 'react-router-dom';
import { PrivateLayout } from './Layouts/PrivateLayout';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import './App.css';
import { Users } from './pages/Users/Users';
import { Summary } from './pages/Summary/Summary';
import { Reunioes } from './pages/Reunioes/Reunioes';
import { Grupos } from './pages/Grupos/Grupos';
import { GrupoDetail } from './pages/GrupoDetail/GrupoDetail';
import  Gravacoes  from './pages/Gravacoes/GravacoesDashboard'; // Importando o componente Gravacoes
import SummaryDetail from './pages/SummaryDetail/SummaryDetail';

function App() {
 
  return (
    <>
      <Routes>
        <Route path='/' element={<PrivateLayout />}>
          <Route index element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/reunioes' element={<Reunioes />} />
          <Route path='/grupos' element={<Grupos />} />
          <Route path='/grupos/:id' element={<GrupoDetail />} />
          <Route path='/gravacoes' element={<Gravacoes />} /> {/* Adicionando a rota para Gravacoes */}
          <Route path='/reuniao/:id' element={<SummaryDetail />} /> 
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
