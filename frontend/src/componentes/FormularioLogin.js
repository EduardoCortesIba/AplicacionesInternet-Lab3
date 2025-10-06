import { useState } from 'react';
import api from '../services/api';
import './FormularioLogin.css';

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', form);
      localStorage.setItem('token', response.data.token);
      onLogin(response.data.user);
    } catch {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}
        <button type="submit" disabled={loading} className="login-btn">
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
