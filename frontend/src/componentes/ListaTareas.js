import './ListaTareas.css';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  const columns = {
    todo: { title: 'Sin Iniciar', color: '#6c757d' },
    in_progress: { title: 'En Progreso', color: '#ffc107' },
    done: { title: 'Completadas', color: '#28a745' }
  };

  const prioridades = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja'
};


  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="tasklist-grid">
      {Object.keys(columns).map(status => (
        <div key={status} className="tasklist-column">
          <h3 className="tasklist-title" style={{
            color: columns[status].color,
            borderBottom: `2px solid ${columns[status].color}`,
            paddingBottom: 10
          }}>
            {columns[status].title} ({getTasksByStatus(status).length})
          </h3>
          {getTasksByStatus(status).length === 0
            ? <p className="tasklist-empty">No hay tareas</p>
            : getTasksByStatus(status).map(task => (
              <div key={task._id} className="tasklist-item">
                <h4>{task.title}</h4>
                <p className="tasklist-description">{task.description}</p>
                <small className="tasklist-priority">Prioridad: {prioridades[task.priority]}</small>
                <div className="tasklist-actions">
                  {task.status !== 'done' && (
                    <button
                      className="tasklist-btn tasklist-btn-primary"
                      onClick={() => onUpdateTask(
                        task._id, task.status === 'todo' ? 'in_progress' : 'done'
                      )}>
                      {task.status === 'todo' ? 'Iniciar' : 'Completar'}
                    </button>
                  )}
                  {task.status !== 'todo' && (
                    <button
                      className="tasklist-btn tasklist-btn-secondary"
                      onClick={() => onUpdateTask(
                        task._id, task.status === 'done' ? 'in_progress' : 'todo'
                      )}>
                      Atrás
                    </button>
                  )}
                  <button
                    className="tasklist-btn tasklist-btn-danger"
                    onClick={() => onDeleteTask(task._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
