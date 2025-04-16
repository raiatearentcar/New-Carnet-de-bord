import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VehicleForm({ vehicle, onSuccess, onCancel }) {
  const [marque, setMarque] = useState(vehicle?.marque || '');
  const [modele, setModele] = useState(vehicle?.modele || '');
  const [immatriculation, setImmatriculation] = useState(vehicle?.immatriculation || '');
  const [annee, setAnnee] = useState(vehicle?.annee || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      if (vehicle && vehicle._id) {
        await axios.put(`http://localhost:5000/api/vehicles/${vehicle._id}`,
          { marque, modele, immatriculation, annee },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Véhicule modifié avec succès !');
      } else {
        await axios.post('http://localhost:5000/api/vehicles',
          { marque, modele, immatriculation, annee },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Véhicule ajouté avec succès !');
      }
      setTimeout(() => { setSuccess(''); onSuccess(); }, 1100);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'enregistrement');
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <input placeholder="Marque" value={marque} onChange={e => setMarque(e.target.value)} required />
      <input placeholder="Modèle" value={modele} onChange={e => setModele(e.target.value)} required />
      <input placeholder="Immatriculation" value={immatriculation} onChange={e => setImmatriculation(e.target.value)} required />
      <input placeholder="Année" type="number" value={annee} onChange={e => setAnnee(e.target.value)} required />
      <button type="submit">{vehicle ? 'Modifier' : 'Ajouter'}</button>
      <button type="button" onClick={onCancel}>Annuler</button>
      {error && <div className="error">{error}</div>}
      {success && <div style={{color:'#388e3c', marginTop:8}}>{success}</div>}
    </form>
  );
}

export default VehicleForm;
