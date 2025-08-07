import axios from "axios";
import ConsultaToken from "./ConsultaToken";

const URL_BASE = "http://localhost:8080/api/task";

export const obtenerTareas = () => ConsultaToken.get("/task");
export const agregarTarea = (tarea) => ConsultaToken.post("/task", tarea);
export const editarTarea = (tarea) => ConsultaToken.put("/task/" + tarea.id, tarea);
export const completarTarea = (tarea) => ConsultaToken.put("/task/" + tarea.id, tarea);
export const eliminarTarea = (tarea) => ConsultaToken.delete("task/" + tarea.id, tarea);
//export const eliminarTarea = (tarea) => axios.delete(`${URL_BASE}/${tarea.id}`, tarea);