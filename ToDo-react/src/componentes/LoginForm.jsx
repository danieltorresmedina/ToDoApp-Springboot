import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as loginService } from "../servicios/AutenticacionService";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [credenciales, setCredenciales] = useState({ username: "", password: "" });
  const [respuesta, setRespuesta] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();
  



  const manejarCambio = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setRespuesta("");
    try {
      const response = await loginService(credenciales);
      login(response);
      navigate("/tareas");


    } catch (error) {
      setRespuesta(error.response?.data);
    }

    
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        name="username"
        value={credenciales.username}
        onChange={manejarCambio}
        placeholder="Usuario"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        value={credenciales.password}
        onChange={manejarCambio}
        placeholder="Contraseña"
        className="w-full p-2 border rounded"
        required
      />
      {respuesta && <p className="text-red-500">{respuesta}</p>}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
    </form>
  );
}
