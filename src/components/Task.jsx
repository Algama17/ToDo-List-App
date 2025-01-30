import React from 'react';
import '../Task.css';

const Task = ({ tarea, borrarTarea, completarTarea, moverTarea, index, totalTareas }) => {
  return (
    <div className={`containerTarea ${tarea.completada ? 'containerTareaCompletada' : ''}`}>
      <h2 className={tarea.completada ? 'completada' : 'noCompletada'}>{tarea.tarea}</h2>
      <button id="completar" onClick={() => completarTarea(tarea.id)}>
        {tarea.completada ? 'Completada' : 'No completada'}
      </button>
      <button id="eliminar" onClick={() => borrarTarea(tarea.id)}>Eliminar</button>
      <button
        id="moverArriba"
        onClick={() => moverTarea(index, index - 1)}
        disabled={index === 0}
      >
        ↑
      </button>
      <button
        id="moverAbajo"
        onClick={() => moverTarea(index, index + 1)}
        disabled={index === totalTareas - 1}
      >
        ↓
      </button>
    </div>
  );
};

export default Task;