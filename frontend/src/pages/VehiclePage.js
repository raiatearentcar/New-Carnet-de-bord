import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

function VehiclePage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicle();
    fetchServices();
    // eslint-disable-next-line
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/vehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const v = res.data.find(v => v.id === parseInt(id));
      setVehicle(v);
    } catch (err) {
      setError("Erreur lors du chargement du véhicule ou backend injoignable.");
      setTimeout(() => setError(''), 2500);
    }
  };

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/services/vehicle/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des services ou backend injoignable.");
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Retour</button>
      {error && <div className="error">{error}</div>}
      {vehicle && (
        <>
          <h2>{vehicle.marque} {vehicle.modele}</h2>
          <p>Immatriculation : {vehicle.immatriculation}</p>
          <p>Année : {vehicle.annee}</p>
          <h3>Historique des services</h3>
          <ul>
            {services.map(s => (
              <li key={s.id}>{s.type} - {new Date(s.date).toLocaleDateString()} {s.details && `: ${s.details}`}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default VehiclePage;
