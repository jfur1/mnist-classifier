import { useState } from 'react'
import './App.css'

import DigitCanvas from "./components/DigitCanvas";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
console.log("Using API URL:", API_URL);  // 🔥 Debugging

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const clearPrediction = () => setPrediction(null);

  // Handle image processing and API request
  const classifyDigit = async (image: Blob) => {
      const formData = new FormData();
      formData.append("file", image, "digit.png");

      try {
          const response = await axios.post(`${API_URL}/predict/`, formData);
          setPrediction(response.data.prediction);
      } catch (error) {
          console.error("Error sending image:", error);
          setPrediction(null);
      }
  };

  return (
      <div style={{ textAlign: "center" }}>
          <h1>MNIST Digit Classifier</h1>
          <DigitCanvas onImageReady={classifyDigit} clearPrediction={clearPrediction}/>
          {prediction !== null && <h2>Prediction: {prediction}</h2>}
      </div>
  );
}

export default App
