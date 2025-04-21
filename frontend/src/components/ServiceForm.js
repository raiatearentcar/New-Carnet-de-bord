import React, { useState } from 'react';

function ServiceForm({ onSubmit, submitLabel }) {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !date) {
      setError('Type et date requis.');
      setTimeout(() => setError(''), 2000);
      return;
    }
    onSubmit({ type, date, details });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input type="text" placeholder="Type de service" value={type} onChange={e => setType(e.target.value)} required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="text" placeholder="Détails (optionnel)" value={details} onChange={e => setDetails(e.target.value)} />
      <button type="submit">{submitLabel || 'Enregistrer'}</button>
    </form>
  );
}

export default ServiceForm;
