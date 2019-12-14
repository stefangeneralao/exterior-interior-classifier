import React, { useState } from 'react';
import './App.css';
import Camera from '../Camera/Camera';
import Prediction from '../Prediction/Prediction';
import Header from '../Header/Header';
import axios from 'axios';

console.log(process.env);
const apiURL = 'http://ec2-3-10-175-0.eu-west-2.compute.amazonaws.com:3001';
const classifierURL = `${ apiURL }/prediction/exterior_interior`;

function App() {
  const [ imageURL, setImageURL ] = useState();
  const [ prediction, setPrediction ] = useState();
  const [ isFetchingPrediction, setIsFetchingPrediction ] = useState(false);
  const [ isFetchingPredictionFailed, setIsFetchingPredictionFailed ] = useState(false);

  const onImageUploadHandler = async e => {
    try {
      const [ image ] = e.currentTarget.files;
      setImageURL(URL.createObjectURL(image));

      setIsFetchingPrediction(true);
      const formData = new FormData();
      formData.append('image', image);
      const { data: prediction } = await axios.post(
        classifierURL,
        formData,
        { headers: { "Content-type": "multipart/form-data" } }
      );
      setPrediction(prediction);

      setIsFetchingPredictionFailed(false);
    } catch {
      setIsFetchingPredictionFailed(true);
    } finally {
      setIsFetchingPrediction(false);
    }
  }

  return (
    <div className="App">
      <Header>RMIT Analytica</Header>
      <Camera
        onImageUpload={ onImageUploadHandler }
        imageURL={ imageURL }
        isFetching={ isFetchingPrediction }
      />
      <Prediction
        prediction={ prediction }
        isFetching={ isFetchingPrediction }
        isFetchingFailed={ isFetchingPredictionFailed }
      />
    </div>
  );
}

export default App;
