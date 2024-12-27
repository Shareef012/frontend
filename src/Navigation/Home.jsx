import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { suggetion, prediction } from '../Images/Images'; // Correct import for images
import './Home.css';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  useEffect(() => {
    // Simulate a delay for loading effect
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        setLoading(false); // Once authentication check is done, stop the loading effect
      }
    }, 1000); // Simulate a 2-second loading time (adjust as needed)

    return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <ClipLoader color="#36d7b7" size={50} />
          <p>Loading...</p>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '5%', padding: '5%' }}>
          {/* First Card - Crop Prediction */}
          <div className="card" style={{ width: '18rem' }}>
            <img
              src={prediction}
              className="card-img-top"
              alt="Crop Prediction"
              style={{ height: '200px', objectFit: 'cover' }} // Set fixed height for consistency
            />
            <div className="card-body">
              <h5 className="card-title">Crop Prediction</h5>
              <p className="card-text">
                Crop prediction forecasts optimal crops using data and environmental factors.
              </p>
              <Link to="/prediction" className="btn btn-primary">
                Go to Prediction
              </Link>
            </div>
          </div>

          {/* Second Card - Crop Suggestion */}
          <div className="card" style={{ width: '18rem' }}>
            <img
              src={suggetion}
              className="card-img-top"
              alt="Crop Suggestion"
              style={{ height: '200px', objectFit: 'cover' }} // Set fixed height for consistency
            />
            <div className="card-body">
              <h5 className="card-title">Crop Suggestion</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
              <Link to="/suggestion" className="btn btn-primary">
                Go to Suggestion
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
