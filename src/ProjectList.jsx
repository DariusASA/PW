import { useState, useEffect } from 'react';
import Card from './Card'; 

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function() {
    fetch('/data/projects.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(function(err) {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Se incarca...</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>
      
      <input 
        type="text" 
        placeholder="Cauta un proiect..."
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {projects
        .filter(function(project) {
          return project.title.toLowerCase().includes(search.toLowerCase());
        })
        .map(function(project) {
          return (
            <Card 
              key={project.id} 
              title={project.title} 
              description={project.tech} 
            />
          );
        })}

      <div>
        <p>Total proiecte: {projects.length}</p>
        <p>Finalizate: {projects.filter(p => p.done).length}</p>
        <p>In lucru: {projects.filter(p => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;