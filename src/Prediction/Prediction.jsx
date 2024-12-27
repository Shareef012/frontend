import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './Prediction.css';

const Prediction = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selection, setSelection] = useState('');
  const [formData, setFormData] = useState({
    n: '',
    p: '',
    k: '',
    methane: '',
    temperature: '',
    humidity: '',
    moisture: '',
    ph: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAutomaticSelection = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds (simulate sensor data processing)
    }, 1000);
  };

  if (loading) {
      return (
        <div className="loading-container">
          <ClipLoader color="#36d7b7" size={50} />
          <p>Loading...</p>
        </div>
      );
    }

  return (
    <div>
      {isAuthenticated ? (
        <div className="prediction-container" style={{ padding: '5%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Manual</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelection('manual')}
                >
                  Select Manual
                </button>
              </div>
            </div>

            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">Sensors</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelection('automatic');
                    handleAutomaticSelection();
                  }}
                >
                  Select Automatic
                </button>
              </div>
            </div>
          </div>

          {selection === 'manual' && (
            <div style={{ marginTop: '20px' }}>
              <h3>Enter Details</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="n">Nitrogen (N)</label>
                  <input
                    type="number"
                    id="n"
                    name="n"
                    value={formData.n}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="p">Phosphorus (P)</label>
                  <input
                    type="number"
                    id="p"
                    name="p"
                    value={formData.p}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="k">Potassium (K)</label>
                  <input
                    type="number"
                    id="k"
                    name="k"
                    value={formData.k}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="methane">Methane</label>
                  <input
                    type="number"
                    id="methane"
                    name="methane"
                    value={formData.methane}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="temperature">Temperature</label>
                  <input
                    type="number"
                    id="temperature"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="humidity">Humidity</label>
                  <input
                    type="number"
                    id="humidity"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="moisture">Moisture</label>
                  <input
                    type="number"
                    id="moisture"
                    name="moisture"
                    value={formData.moisture}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ph">pH</label>
                  <input
                    type="number"
                    id="ph"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success" style={{ marginTop: '20px' }}>
                  Submit
                </button>
              </form>
            </div>
          )}

          {selection === 'automatic' && loading && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <ClipLoader color="#36d7b7" size={50} />
              <h3>Processing Sensor Data...</h3>
              <p>Please wait while we fetch and process the sensor data.</p>
            </div>
          )}
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default Prediction;
