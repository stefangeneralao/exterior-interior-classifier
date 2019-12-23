import React, { useState } from 'react';
import './App.css';
import Camera from '../Camera/Camera';
import Prediction from '../Prediction/Prediction';
import Header from '../Header/Header';
import axios from 'axios';

const classifierURL = process.env.REACT_APP_CLASSIFIER_URL ||
  'http://localhost:3001/prediction/exterior_interior';

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
      <Header>Exterior Interior Classifier</Header>
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
