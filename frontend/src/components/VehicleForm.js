import React, { useState, useEffect } from 'react';

function VehicleForm({ initialData = {}, onSubmit, submitLabel }) {
  const [marque, setMarque] = useState(initialData.marque || '');
  const [modele, setModele] = useState(initialData.modele || '');
  const [immatriculation, setImmatriculation] = useState(initialData.immatriculation || '');
  const [annee, setAnnee] = useState(initialData.annee || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setMarque(initialData.marque || '');
    setModele(initialData.modele || '');
    setImmatriculation(initialData.immatriculation || '');
    setAnnee(initialData.annee || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!marque || !modele || !immatriculation || !annee) {
      setError('Tous les champs sont requis.');
      setTimeout(() => setError(''), 2000);
      return;
    }
    onSubmit({ marque, modele, immatriculation, annee });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input type="text" placeholder="Marque" value={marque} onChange={e => setMarque(e.target.value)} required />
      <input type="text" placeholder="Modèle" value={modele} onChange={e => setModele(e.target.value)} required />
      <input type="text" placeholder="Immatriculation" value={immatriculation} onChange={e => setImmatriculation(e.target.value)} required />
      <input type="number" placeholder="Année" value={annee} onChange={e => setAnnee(e.target.value)} required />
      <button type="submit">{submitLabel || 'Enregistrer'}</button>
    </form>
  );
}

export default VehicleForm;
