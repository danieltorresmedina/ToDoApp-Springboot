import { useState, useEffect } from 'react';
import TareaLista from './TareaLista';
import { obtenerTareas, agregarTarea, editarTarea, completarTarea, eliminarTarea } from '../servicios/TareaService';
import TareaForm from './TareaForm';

export default function GestorTareas(){
     const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tareaEditando, setTareaEditando] = useState(null);

  const manejarCrearTarea = (tarea) => {
    agregarTarea(tarea)
      .then(() => obtenerTareas().then((res) => setTareas(res.data)))
    .catch((err) => console.error("Error al crear tarea", err));
  };

  const manejarEditarTarea = (editandoTarea) => {
    editarTarea(editandoTarea)
      .then(() => obtenerTareas().then((res) => setTareas(res.data)))
    .catch((err) => console.error("Error al editar tarea", err));
  };

  
  const manejarCompletarTarea = (completandoTarea) => {
    completarTarea({...completandoTarea, completed: !completandoTarea.completed})
      .then(() => obtenerTareas().then((res) => setTareas(res.data)))
    .catch((err) => console.error("Error al completar tarea", err));
  };

  const manejarEliminarTarea = (eliminandoTarea) => {
    eliminarTarea(eliminandoTarea)
    .then(() => obtenerTareas().then((res) => setTareas(res.data)))
    .catch((err) => console.error("Error al eliminar tarea", err));
  };

  useEffect( () =>{
    obtenerTareas()
    .then((res) => setTareas(res.data))
    .catch((err) => console.error("Error al cargar tareas:", err))
    .finally(() => setCargando(false));
  }, []);

    return(

        <div className='max-w-xl mx-auto py-10 px-4 space-y-4 bg-gray-50 min-h-screen'>
  

      <h1 className='text-3xl font-bold text-center text-blue-600'>Gestor de Tareas</h1>
      <TareaForm onEnviar={manejarCrearTarea} bloqueado={tareaEditando !== null} />
      {cargando ? (
        <p className='text-center text-gray-500'>Cargando Tareas...</p>
      ): (
        
        <TareaLista tareas={tareas} onEditar={manejarEditarTarea} onCompletar={manejarCompletarTarea} onEliminar={manejarEliminarTarea} tareaEditando={tareaEditando} setTareaEditando={setTareaEditando}/> 
      )}
      
    </div>
    );
}