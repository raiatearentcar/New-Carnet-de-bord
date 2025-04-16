import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setVehicles(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce véhicule ?')) return;
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Véhicule supprimé avec succès !');
      setTimeout(() => setSuccess(''), 1200);
      fetchVehicles();
    } catch (err) {
      setError('Erreur lors de la suppression du véhicule.');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Véhicules</h2>
        <button onClick={handleLogout} style={{background:'#f44336'}}>Déconnexion</button>
      </div>
      {success && <div style={{color:'#388e3c', marginBottom:8}}>{success}</div>}
      {error && <div className="error">{error}</div>}
      <button onClick={() => navigate('/vehicle/new')}>Ajouter un véhicule</button>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <ul>
          {vehicles.map(v => (
            <li key={v._id} style={{marginBottom:8}}>
              <strong>{v.marque} {v.modele}</strong> ({v.immatriculation}) - {v.annee}
              <button onClick={() => navigate(`/vehicle/${v._id}`)} style={{marginLeft:8}}>Voir</button>
              <button onClick={() => navigate(`/vehicle/${v._id}/edit`)} style={{marginLeft:8}}>Modifier</button>
              <button onClick={() => handleDelete(v._id)} style={{marginLeft:8, color:'red'}}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
