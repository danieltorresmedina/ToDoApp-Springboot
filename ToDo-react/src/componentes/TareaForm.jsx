import { useState } from "react";

export default function TareaForm({onEnviar, bloqueado}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [dueDate, setDueDate] = useState("");

    const limpiarFormulario = () => {
        setTitle("");
        setDescription("");
        setCompleted(false);
        setDueDate("");
    }

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        if(!title.trim()) return;
        if(!description.trim()) return;
        const formulario = {title,
                description,
                completed,
                dueDate
            };
        onEnviar(formulario);
        limpiarFormulario();
    };

    return(
        <form onSubmit={manejarEnvio} className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
                Nueva Tarea
            </h2>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="title">
                    Título
                </label>
                <input
                disabled={bloqueado}
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titulo"
                className="w-full border rounded px-3 py-2"
                required
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="description">
                    Descripción
                </label>
                <textarea
                disabled={bloqueado}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripcion"
                className="w-full border rounded px-3 py-2"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="title">
                    Fecha Limite
                </label>
                <input
                disabled={bloqueado}
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Fecha Limite"
                className="w-full border rounded px-3 py-2"
                required
                />
            </div>
            
            <button
            type="submit"
            disabled={bloqueado}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Agregar
            </button>

        </form>
    );
}