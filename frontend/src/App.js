import { useState, useEffect } from 'react';
import LoginForm from './componentes/FormularioLogin';
import Register from './componentes/Registro';
import TaskForm from './componentes/FormularioTareas';
import TaskList from './componentes/ListaTareas';

import api from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      api.get('/tasks')
        .then(res => setTasks(res.data))
        .catch(() => alert('Error al cargar tareas'));
    } else {
      setTasks([]);   
    }
  }, [user]);

  const onLogin = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const onRegister = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTasks([]);
    setView('login');
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (id, status) => {
    try {
      const res = await api.put(`/tasks/${id}`, { status });
      setTasks(tasks.map(task => (task._id === id ? res.data : task)));
    } catch {
      alert('Error al actualizar tarea');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch {
      alert('Error al eliminar tarea');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📝 Mi Gestor de Tareas</h1>

      {!user && (
        <div className="app-auth-container">
          {view === 'login' && (
            <>
              <LoginForm onLogin={onLogin} />
              <p>¿No tienes cuenta? <button onClick={() => setView('register')} className="app-link-button">Regístrate</button></p>
            </>
          )}
          {view === 'register' && (
            <>
              <Register onRegister={onRegister} />
              <p>¿Ya tienes cuenta? <button onClick={() => setView('login')} className="app-link-button">Inicia sesión</button></p>
            </>
          )}
        </div>
      )}

      {user && (
        <>
          <div className="app-header">
            <h2>Hola, {user.name}</h2>
            <button onClick={handleLogout} className="app-btn-logout">Cerrar Sesión</button>
          </div>

          <TaskForm onAddTask={addTask} />
          <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        </>
      )}
    </div>
  );
}

export default App;
