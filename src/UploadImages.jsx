// UploadImages.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';
import "./UploadImages.css"

const UploadImages = ({ setImages }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setUploadedImages((prevImages) => [...prevImages, ...imagesArray]);
      setImages((prevImages) => [...prevImages, ...imagesArray]);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    setImages(updatedImages);
  };

  const handleAddImages = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="upload-images-container">
      <Typography variant="h5" gutterBottom className="upload-title">Upload Images</Typography>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} id="file-input" className="upload-input" />
      <Button variant="contained" color="primary" onClick={handleAddImages} className="add-button">Add Images</Button>
      <Grid container spacing={2} className="uploaded-images-grid">
        {uploadedImages.map((image, index) => (
          <Grid item key={index} className="uploaded-image-item">
            <div className="image-container">
              <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
              <Button variant="contained" color="error" onClick={() => handleDeleteImage(index)} className="delete-button">
                <span role="img" aria-label="Delete">❌</span>
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

UploadImages.propTypes = {
  setImages: PropTypes.func.isRequired,
};

export default UploadImages;
