import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError("Identifiants invalides ou serveur injoignable.");
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <div className="container">
      <h1>Connexion</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default LoginPage;
