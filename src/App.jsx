import React, { useState } from 'react';
import './App.css';
import Task from './components/Task';
import Form from './components/Form';

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);


  const handleChange = (e) => {
    setTarea(e.target.value);
  };


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


  const borrarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
  };


  const completarTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(tareasActualizadas);
  };

  const moverTarea = (desdeIndex, haciaIndex) => {
    if (haciaIndex < 0 || haciaIndex >= tareas.length) return;
    const nuevaLista = [...tareas];
    const [tareaMovida] = nuevaLista.splice(desdeIndex, 1);
    nuevaLista.splice(haciaIndex, 0, tareaMovida);
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