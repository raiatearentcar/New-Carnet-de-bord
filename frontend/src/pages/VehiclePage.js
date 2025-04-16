import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceForm from '../components/ServiceForm';

function VehiclePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const vehiclesRes = await axios.get(`http://localhost:5000/api/vehicles`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const v = vehiclesRes.data.find(v => v._id === id);
    setVehicle(v);
    const servicesRes = await axios.get(`http://localhost:5000/api/services/vehicle/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setServices(servicesRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleDeleteService = async (sid) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/services/${sid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Service supprimé avec succès !');
      setTimeout(() => setSuccess(''), 1200);
      fetchData();
    } catch (err) {
      setError('Erreur lors de la suppression du service.');
      setTimeout(() => setError(''), 2000);
    }
  };

  const filtered = services.filter(s => filter ? s.type.toLowerCase().includes(filter.toLowerCase()) : true);
  const sorted = [...filtered].sort((a, b) => sort === 'date' ? new Date(b.date) - new Date(a.date) : a.type.localeCompare(b.type));

  return (
    <div className="vehicle-page-container">
      <button onClick={() => navigate(-1)}>Retour</button>
      {vehicle && (
        <>
          <h2>{vehicle.marque} {vehicle.modele} ({vehicle.immatriculation})</h2>
          <p>Année : {vehicle.annee}</p>
          <button onClick={() => navigate(`/vehicle/${id}/edit`)}>Modifier</button>
        </>
      )}
      {success && <div style={{color:'#388e3c', marginBottom:8}}>{success}</div>}
      {error && <div className="error">{error}</div>}
      <h3>Historique des services</h3>
      <label>Filtrer par type :
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Ex: vidange" />
      </label>
      <label style={{marginLeft:8}}>Trier par :
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date">Date</option>
          <option value="type">Type</option>
        </select>
      </label>
      <button onClick={() => setShowForm(!showForm)} style={{marginLeft:8}}>{showForm ? 'Annuler' : 'Ajouter un service'}</button>
      {showForm && <ServiceForm vehicleId={id} onSuccess={() => { setShowForm(false); fetchData(); }} onCancel={() => setShowForm(false)} />}
      {loading ? <div>Chargement...</div> : (
        <ul>
          {sorted.map(s => (
            <li key={s._id}>
              {new Date(s.date).toLocaleDateString()} — <strong>{s.type}</strong> — {s.details}
              <button onClick={() => handleDeleteService(s._id)} style={{marginLeft:8, color:'red'}}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VehiclePage;
