import React, { useRef } from 'react';
import './Camera.scss';

function Camera({ onImageUpload, imageURL, isFetching }) {
  const fileUpload = useRef();
  
  const image = imageURL ?
    <img
      src={ imageURL }
      alt="uploaded"
      className={ isFetching ? 'is-fetching' : undefined }
    /> :
    <div className="placeholder">Upload</div>;
  
  const onClickHandler = () => {
    if (isFetching) {
      return null;
    }

    return fileUpload.current.click();
  }
    
  return (
    <div className="camera">
      <div className="camera-frame" onClick={ onClickHandler }>
        { image }
      </div>
      <input
        type="file"
        accept="image/*;capture=camera"
        onChange={ onImageUpload }
        ref={ fileUpload }
        style={ { display: "none" } }
      />
    </div>
  )
}

export default Camera;