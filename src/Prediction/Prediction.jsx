import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import "./Prediction.css";

const Prediction = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selection, setSelection] = useState("");
  const [formData, setFormData] = useState({
    n: "",
    p: "",
    k: "",
    methane: "",
    temperature: "",
    humidity: "",
    moisture: "",
    ph: "",
  });
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const THINGSPEAK_CHANNEL_ID = "2575448";
  const THINGSPEAK_API_KEY = "47F9U3G42U0RZZMH"; // Leave empty if public

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Handle input change for manual mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch real-time sensor data from ThingSpeak
  const handleAutomaticSelection = async () => {
    setLoading(true);
    setError(null);

    const url = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?results=100`;

    try {
      const response = await axios.get(url, {
        params: THINGSPEAK_API_KEY ? { api_key: THINGSPEAK_API_KEY } : {},
      });

      if (response.status === 200 && response.data.feeds.length > 0) {
        const latestData = response.data.feeds[response.data.feeds.length - 1];

        setSensorData({
          n: latestData.field1 || "N/A",
          p: latestData.field2 || "N/A",
          k: latestData.field3 || "N/A",
          methane: latestData.field4 || "N/A",
          temperature: latestData.field5 || "N/A",
          humidity: latestData.field6 || "N/A",
          moisture: latestData.field7 || "N/A",
          ph: latestData.field8 || "N/A",
        });
      } else {
        setError("No sensor data available.");
      }
    } catch (error) {
      setError("Failed to fetch sensor data.");
      console.error("Error fetching sensor data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className="prediction-container" style={{ padding: "5%" }}>
          {/* Selection Buttons */}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            {/* Manual Selection */}
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Manual</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelection("manual")}
                >
                  Select Manual
                </button>
              </div>
            </div>

            {/* Automatic (Sensors) Selection */}
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Sensors</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelection("automatic");
                    handleAutomaticSelection();
                  }}
                >
                  Select Automatic
                </button>
              </div>
            </div>
          </div>

          {/* Manual Mode Form */}
          {selection === "manual" && (
            <div style={{ marginTop: "20px" }}>
              <h3>Enter Details</h3>
              <form>
                {Object.keys(formData).map((key) => (
                  <div className="form-group" key={key}>
                    <label htmlFor={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="number"
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                ))}
              </form>
              <h4>Manual Data:</h4>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}

          {/* Automatic Mode Sensor Data */}
          {selection === "automatic" && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <h3>Sensor Data</h3>
              {loading ? (
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : sensorData ? (
                <pre>{JSON.stringify(sensorData, null, 2)}</pre>
              ) : (
                <p>No data available</p>
              )}
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
