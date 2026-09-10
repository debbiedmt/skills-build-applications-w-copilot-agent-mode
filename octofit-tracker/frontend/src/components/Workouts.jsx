import { useEffect, useState } from 'react';
import { fetchApiCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiCollection('workouts')
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-2">{workout.title}</h3>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.duration} min</p>
                <p className="mb-1"><strong>Focus:</strong> {workout.focus}</p>
                <p className="mb-0"><strong>Target:</strong> {workout.target || 'General fitness'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
