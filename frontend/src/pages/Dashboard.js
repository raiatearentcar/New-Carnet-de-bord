import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/vehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des véhicules ou backend injoignable.");
      setTimeout(() => setError(''), 2500);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1>Tableau de bord</h1>
      <button onClick={handleLogout}>Déconnexion</button>
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}
      <h2>Véhicules</h2>
      <ul>
        {vehicles.map(v => (
          <li key={v.id}>
            {v.marque} {v.modele} ({v.immatriculation})
            <button onClick={() => navigate(`/vehicle/${v.id}`)}>Voir</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/vehicle/new/edit')}>Ajouter un véhicule</button>
    </div>
  );
}

export default Dashboard;
