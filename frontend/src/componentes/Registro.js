import { useState } from 'react';
import api from '../services/api';
import './Registro.css';

function Register({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/register', form);
      localStorage.setItem('token', response.data.token);
      onRegister(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="register-input"
        />
        {error && <div className="register-error">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="register-btn"
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}

export default Register;
