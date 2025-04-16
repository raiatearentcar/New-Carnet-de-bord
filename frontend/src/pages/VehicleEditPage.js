import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import VehicleForm from '../components/VehicleForm';

function VehicleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === 'new') {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/vehicles', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const found = res.data.find(v => v._id === id);
      setVehicle(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="vehicle-edit-page">
      <h2>{id === 'new' ? 'Ajouter un véhicule' : 'Modifier le véhicule'}</h2>
      <VehicleForm vehicle={vehicle} onSuccess={() => navigate('/')} onCancel={() => navigate('/')} />
    </div>
  );
}

export default VehicleEditPage;
