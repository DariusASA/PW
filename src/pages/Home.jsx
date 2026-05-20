import { useState, useEffect } from 'react';
import QuickNote from '../QuickNote';
import TodoList from '../TodoList';

function Home() {
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState(null);

  useEffect(function () {
    fetch('http://localhost:3000/api/stats')
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch((err) => console.error('Eroare stats:', err));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1>TITLU------------------------</h1>
      <p>Darius Asaragiu</p>

      {}
      {stats ? (
        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0', flexWrap: 'wrap' }}>
          <div style={statCard}>
            <span style={statNumber}>{stats.total}</span>
            <span style={statLabel}>Total proiecte</span>
          </div>
          <div style={{ ...statCard, borderColor: '#22c55e' }}>
            <span style={{ ...statNumber, color: '#16a34a' }}>{stats.done}</span>
            <span style={statLabel}>Finalizate</span>
          </div>
          <div style={{ ...statCard, borderColor: '#f59e0b' }}>
            <span style={{ ...statNumber, color: '#d97706' }}>{stats.inProgress}</span>
            <span style={statLabel}>In lucru</span>
          </div>
        </div>
      ) : (
        <p>Se incarca statisticile...</p>
      )}

      <QuickNote />
      <TodoList />

      <div>
        <p>Ai apasat de {count} ori</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

const statCard = {
  flex: 1,
  minWidth: '120px',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '1rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
};
const statNumber = { fontSize: '2rem', fontWeight: 'bold' };
const statLabel = { fontSize: '0.85rem', color: '#64748b' };

export default Home;