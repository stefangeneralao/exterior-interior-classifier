import React from 'react';
import { LinearProgress } from '@material-ui/core';
import './Prediction.scss';

function formatNum(n) {
  return (n * 100).toFixed(1) + '%';
}

function Prediction({ prediction, isFetching, isFetchingFailed }) {
  if (isFetching) {
    return (
      <LinearProgress />
    );
  }

  if (isFetchingFailed) {
    return (
      <div>Fetching Failed.</div>
    );
  }

  if (!prediction) {
    return null;
  }

  const { interior, exterior } = prediction;
  const formattedInterior = formatNum(interior);
  const formattedExterior = formatNum(exterior);

  return (
    <div className="prediction">
      <div className="exterior">
        Exterior: { formattedExterior }
      </div>
      <div className="interior">
        Interior: { formattedInterior }
      </div>
    </div>
  );
}

export default Prediction;