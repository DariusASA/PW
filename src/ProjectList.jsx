import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('toate');
  const [sortBy, setSortBy] = useState('default');

  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTech, setEditTech] = useState('');

  useEffect(function () {
    fetch('http://localhost:3000/api/projects')
      .then(function (response) { return response.json(); })
      .then(function (data) {
        setProjects(data);
        setLoading(false);
      })
      .catch(function () {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  async function handleSubmit() {
    if (!title.trim() || !tech.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech }),
      });
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setTitle('');
      setTech('');
    } catch (err) {
      console.error('Eroare la adaugare:', err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Sigur doriti sa stergeti acest proiect?')) return;
    try {
      await fetch('http://localhost:3000/api/projects/' + id, { method: 'DELETE' });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Eroare la stergere:', err);
    }
  }

  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone }),
      });
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
    } catch (err) {
      console.error('Eroare la toggle:', err);
    }
  }

  function handleEdit(project) {
    setEditingId(project._id);
    setEditTitle(project.title);
    setEditTech(project.tech);
  }

  async function handleSave(id) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech }),
      });
      const updatedProject = await response.json();
      setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
      setEditingId(null);
    } catch (err) {
      console.error('Eroare la salvare:', err);
    }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (loading) return <p>Se incarca...</p>;

  const displayed = projects
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      if (filterStatus === 'finalizate') return p.done;
      if (filterStatus === 'inlucru') return !p.done;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'titlu') return a.title.localeCompare(b.title);
      if (sortBy === 'data') return a._id.localeCompare(b._id);
      return 0;
    });

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h3>Proiecte</h3>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Titlu proiect"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Tehnologie"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleSubmit} style={{ ...btnStyle, background: '#22c55e', color: '#fff' }}>
          Adauga
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Cauta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={inputStyle}>
          <option value="toate">Toate</option>
          <option value="finalizate">Finalizate</option>
          <option value="inlucru">In lucru</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={inputStyle}>
          <option value="default">Sortare implicita</option>
          <option value="titlu">Dupa titlu</option>
          <option value="data">Dupa data</option>
        </select>
      </div>

      {displayed.map(function (project) {
        if (editingId === project._id) {
          return (
            <div key={project._id} style={cardStyle}>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{ ...inputStyle, marginBottom: '6px', width: '100%' }}
              />
              <input
                value={editTech}
                onChange={(e) => setEditTech(e.target.value)}
                style={{ ...inputStyle, marginBottom: '8px', width: '100%' }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => handleSave(project._id)} style={{ ...btnStyle, background: '#3b82f6', color: '#fff' }}>
                  Salveaza
                </button>
                <button onClick={() => setEditingId(null)} style={btnStyle}>
                  Anuleaza
                </button>
              </div>
            </div>
          );
        }

        return (
          <div
            key={project._id}
            style={{
              ...cardStyle,
              background: project.done ? '#f0fdf4' : '#fff',
              borderColor: project.done ? '#22c55e' : '#e2e8f0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{project.title}</strong>
                <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '0.85rem' }}>{project.tech}</span>
                <span style={{
                  marginLeft: '10px',
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  background: project.done ? '#bbf7d0' : '#fef9c3',
                  color: project.done ? '#15803d' : '#854d0e',
                }}>
                  {project.done ? 'Finalizat' : 'In lucru'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleToggle(project._id, project.done)} style={{ ...btnStyle, background: '#22c55e', color: '#fff' }}>
                  {project.done ? 'Redeschide' : 'Finalizeaza'}
                </button>
                <button onClick={() => handleEdit(project)} style={{ ...btnStyle, background: '#3b82f6', color: '#fff' }}>
                  Editeaza
                </button>
                <button onClick={() => handleDelete(project._id)} style={{ ...btnStyle, background: '#ef4444', color: '#fff' }}>
                  Sterge
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 4px' }}>Total proiecte: <strong>{projects.length}</strong></p>
        <p style={{ margin: '0 0 4px' }}>Finalizate: <strong>{projects.filter((p) => p.done).length}</strong></p>
        <p style={{ margin: 0 }}>In lucru: <strong>{projects.filter((p) => !p.done).length}</strong></p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '6px 10px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
};

const btnStyle = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.85rem',
  background: '#f1f5f9',
  color: '#334155',
};

const cardStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '12px 16px',
  marginBottom: '10px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
};

export default ProjectList;