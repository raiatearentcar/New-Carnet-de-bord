import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

function VehicleEditPage() {
  const { id } = useParams();
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const [annee, setAnnee] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== 'new') fetchVehicle();
    // eslint-disable-next-line
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/vehicles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const v = res.data.find(v => v.id === parseInt(id));
      if (v) {
        setMarque(v.marque);
        setModele(v.modele);
        setImmatriculation(v.immatriculation);
        setAnnee(v.annee);
      }
    } catch (err) {
      setError("Erreur lors du chargement du véhicule ou backend injoignable.");
      setTimeout(() => setError(''), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (id === 'new') {
        await axios.post(`${API_URL}/api/vehicles`, { marque, modele, immatriculation, annee }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.put(`${API_URL}/api/vehicles/${id}`, { marque, modele, immatriculation, annee }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/');
    } catch (err) {
      setError("Erreur lors de l'enregistrement ou backend injoignable.");
      setTimeout(() => setError(''), 2500);
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)}>Retour</button>
      <h2>{id === 'new' ? 'Ajouter' : 'Modifier'} un véhicule</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Marque" value={marque} onChange={e => setMarque(e.target.value)} required />
        <input type="text" placeholder="Modèle" value={modele} onChange={e => setModele(e.target.value)} required />
        <input type="text" placeholder="Immatriculation" value={immatriculation} onChange={e => setImmatriculation(e.target.value)} required />
        <input type="number" placeholder="Année" value={annee} onChange={e => setAnnee(e.target.value)} required />
        <button type="submit">{id === 'new' ? 'Ajouter' : 'Enregistrer'}</button>
      </form>
    </div>
  );
}

export default VehicleEditPage;
