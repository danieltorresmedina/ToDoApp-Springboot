import TareaItem from "./TareaItem";

export default function TareaLista({tareas, onEditar, onCompletar, onEliminar, tareaEditando, setTareaEditando}){
    if(!tareas || tareas.length === 0){
        return <p className="text-gray-500 text-center">No hay tareas</p>
    }

    return(
        
        <ul className="bg-white rounded shadow p-4 space-y-2">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Lista de Tareas</h2>
            {tareas.map((t) => (
                <TareaItem key={t.id} tarea={t} onEditar={onEditar} onCompletar={onCompletar} onEliminar={onEliminar} tareaEditando={tareaEditando} setTareaEditando={setTareaEditando} />
            ))}
        </ul>
    );
}