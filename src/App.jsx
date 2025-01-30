import React, { useState } from 'react';
import './App.css';
import Task from './components/Task';
import Form from './components/Form';

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  // Manejar cambios en el input
  const handleChange = (e) => {
    setTarea(e.target.value);
  };

  // Añadir una nueva tarea
  const addTask = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      alert("Debes agregar algo");
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      tarea: tarea,
      completada: false,
    };

    setTareas([nuevaTarea, ...tareas]);
    setTarea("");
  };

  // Borrar una tarea
  const borrarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
  };

  // Marcar una tarea como completada
  const completarTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
  };

  // Mover una tarea hacia arriba o hacia abajo
  const moverTarea = (desdeIndex, haciaIndex) => {
    if (haciaIndex < 0 || haciaIndex >= tareas.length) return; // Evitar índices inválidos

    const nuevaLista = [...tareas];
    const [tareaMovida] = nuevaLista.splice(desdeIndex, 1); // Remover la tarea de su posición actual
    nuevaLista.splice(haciaIndex, 0, tareaMovida); // Insertar la tarea en la nueva posición
    setTareas(nuevaLista);
  };

  return (
    <div className="App">
      <h2>Todo List</h2>
      <Form handleChange={handleChange} addTask={addTask} tarea={tarea} />

      {tareas.length > 0 && (
        <button onClick={() => setTareas([])}>Vaciar tareas</button>
      )}

      {tareas.map((tarea, index) => (
        <Task
          key={tarea.id}
          tarea={tarea}
          borrarTarea={borrarTarea}
          completarTarea={completarTarea}
          moverTarea={moverTarea}
          index={index}
          totalTareas={tareas.length}
        />
      ))}
    </div>
  );
}

export default App;