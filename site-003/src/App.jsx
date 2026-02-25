import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import ListTypeProduct from './produto/components/listTypeProduct';
import ListMarcaProduct from './produto/components/listMarcaProd';
import ListNameProd from './produto/components/listNameProd';
import Login from './users/components/Login';
import Register from './users/components/Register';


//desenho do mapa. Aqui dizemos qual componente irá aparecer na URL

export default function App() {
  return (
    <Routes>
      {/* Rota 1 */}
      <Route path='/' element={<ListTypeProduct />} />

      {/* Rota 2 */}
      <Route path='/produtos/type' element={<ListTypeProduct />} />

      <Route path='/produto/marca' element={<ListMarcaProduct />} />

      <Route path='/produto/findByName' element={<ListNameProd />} />

      <Route path='/login' element={<Login />} />

      <Route path='register' element={<Register />} />

      <Route path='*' element={<h2>Pagina não encontrada (Erro 404)</h2>} />
    </Routes>
  );
}