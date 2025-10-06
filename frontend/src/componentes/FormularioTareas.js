import { useState } from 'react';
import api from '../services/api';
import './FormularioTareas.css';

function TaskForm({ onAddTask }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      const res = await api.post('/tasks', { ...form, status: 'todo' });
      onAddTask(res.data);
      setForm({ title: '', description: '', priority: 'medium' });
    } catch {
      alert('Error al crear la tarea');
    }
  };

  return (
    <div className="taskform-container">
      <h3>Nueva Tarea</h3>
      <form onSubmit={handleSubmit} className="taskform-form">
        <input
          type="text"
          name="title"
          placeholder="Título de la tarea"
          value={form.title}
          onChange={handleChange}
          required
          className="taskform-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="taskform-input"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="taskform-select"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <button type="submit" className="taskform-btn">Crear</button>
      </form>
    </div>
  );
}

export default TaskForm;
