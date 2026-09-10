import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiCollection('teams')
      .then((data) => setTeams(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-2">{team.name}</h3>
                <p className="mb-1"><strong>Location:</strong> {team.location || 'Remote'}</p>
                <p className="mb-1"><strong>Points:</strong> {team.points ?? 0}</p>
                <p className="mb-0"><strong>Members:</strong> {(team.members || []).length}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
