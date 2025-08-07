import './App.css';
import GestorTareas from './componentes/GestorTareas';
import LoginForm from './componentes/LoginForm';
import RutaPrivada from './rutas/RutaPrivada';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/tareas"
          element={
            <RutaPrivada>
              <GestorTareas />
            </RutaPrivada>
          }
        />
        {/* Ruta por defecto */}
        <Route path="*" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );

 


}

export default App
