import React, { useState } from 'react';
import axios from 'axios';

function ServiceForm({ vehicleId, onSuccess, onCancel }) {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/services',
        { vehicle: vehicleId, type, date, details },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Service ajouté avec succès !');
      setTimeout(() => { setSuccess(''); onSuccess(); }, 1100);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'enregistrement du service');
    }
  };

  return (
    <form className="service-form" onSubmit={handleSubmit}>
      <input placeholder="Type de service (ex: vidange)" value={type} onChange={e => setType(e.target.value)} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Détails" value={details} onChange={e => setDetails(e.target.value)} />
      <button type="submit">Ajouter</button>
      <button type="button" onClick={onCancel}>Annuler</button>
      {error && <div className="error">{error}</div>}
      {success && <div style={{color:'#388e3c', marginTop:8}}>{success}</div>}
    </form>
  );
}

export default ServiceForm;
