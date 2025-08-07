import { useState } from "react";

export default function TareaItem({tarea, onEditar, onCompletar, onEliminar, tareaEditando, setTareaEditando}){
    const [editando, setEditando] = useState(false);
    const [editarTitulo, setEditarTitulo] = useState(tarea?.title || "");
    const [editarDescripcion, setEditarDescripcion] = useState(tarea?.description || "");
    const [editarFechaLimite, setEditarFechaLimite] = useState(tarea?.dueDate || "");

    const estaBloqueado = tareaEditando !== null && tareaEditando !== tarea.id;

    const editar = () =>{
        setTareaEditando(tarea.id);
        setEditando(true);
    };

    const guardarCambios = () =>{
        const tareaActualizada = {...tarea, title: editarTitulo, description: editarDescripcion, dueDate: editarFechaLimite};
        onEditar(tareaActualizada);
        setTareaEditando(null);
        setEditando(false);
    };

    const cancelarCambios = () =>{
        setEditarTitulo(tarea.title);
        setEditarDescripcion(tarea.description);
        setEditarFechaLimite(tarea.dueDate);
        setTareaEditando(null);
        setEditando(false);
    };

    const eliminar = () =>{
        const confirmacion = window.confirm("¿Está Seguro de Eliminar esta Tarea?");
        if(confirmacion){
            onEliminar(tarea);
        }
        return;
    };

    
    return(

        <li className="bg-white rounded shadow p-4 space-y-2">

            {
        editando ? (
            <>
                <input
                name="title"
                value={editarTitulo}
                onChange={(e) => setEditarTitulo(e.target.value)}
                placeholder="Titulo"
                className="w-full border rounded px-3 py-2"
                required
                />

                <textarea
                name="description"
                value={editarDescripcion}
                onChange={(e) => setEditarDescripcion(e.target.value)}
                placeholder="Descripcion"
                className="w-full border rounded px-3 py-2"
                required
                />

                <input
                name="dueDate"
                type="date"
                value={editarFechaLimite}
                onChange={(e) => setEditarFechaLimite(e.target.value)}
                placeholder="Fecha Limite"
                className="w-full border rounded px-3 py-2"
                required
                />
            </>
          
        ) : (
            <>
                <p className="text-base text-gray-700 font-bold">{tarea.title}</p>
                <p className="text-sm text-gray-700">{tarea.description}</p>
                <p className="text-sm text-gray-700">{tarea.dueDate}</p>
                <p className={`text-sm font-medium ${tarea.completed ? 'text-green-600' : 'text-red-600'}`}>
                    {tarea.completed ? 'Completada' : 'Pendiente'}
                </p>
            </>
          
        )
      }

            

        <div className="flex flex-col gap-4 mt-2">

            {
            editando ? (
                <>
                        <button
                         onClick={() => guardarCambios(tarea)}
                            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded">
                         Guardar
                        </button>

                        <button
                        onClick={() => cancelarCambios()}
                            className="bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-3 rounded">
                        Cancelar
                        </button>
                </>

                    ):(
                    <>
                        <button
                         onClick={() => editar(tarea)}
                         disabled={estaBloqueado}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded">
                         Editar
                        </button>

                        <button
                        onClick={() => onCompletar(tarea)}
                        disabled={estaBloqueado}
                            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded">
                        Completar
                        </button>

                        <button
                        onClick={() => eliminar(tarea)}
                        disabled={estaBloqueado}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded">
                        Eliminar
                        </button>
                    </>
                )
            }
            
        </div>
            
        </li>
    );
}