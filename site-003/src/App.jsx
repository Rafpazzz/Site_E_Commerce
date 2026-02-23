import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import ListTypeProduct from './produto/components/listTypeProduct';


//desenho do mapa. Aqui dizemos qual componente irá aparecer na URL

export default function App() {
  return (
    <Routes>
      {/* Rota 1 */}
      <Route path='/' element={<ListTypeProduct />} />

      {/* Rota 2 */}
      {/* <Route path='/produtos' element={<listTypeProduct />} /> */}

      <Route path='*' element={<h2>Pagina não encontrada (Erro 404)</h2>} />
    </Routes>
  );
}