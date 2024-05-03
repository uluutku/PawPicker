// ABTest.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';
import Results from './Results'; // Import the Results component
import './ABTest.css'; // Import the CSS file

const ABTest = ({ images }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [testingStarted, setTestingStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testData, setTestData] = useState([]);

  const startTest = () => {
    const randomImageIndex1 = Math.floor(Math.random() * images.length);
    let randomImageIndex2 = Math.floor(Math.random() * images.length);
    while (randomImageIndex2 === randomImageIndex1) {
      randomImageIndex2 = Math.floor(Math.random() * images.length);
    }
    setImage1(images[randomImageIndex1]);
    setImage2(images[randomImageIndex2]);
    setTestingStarted(true);
    setShowResults(false);
    setTestData(images.map(image => ({ id: image, selectedCount: 0, notSelectedCount: 0, health: 100 }))); // Initialize testData
  };

  const handleFinishTest = () => {
    setTestingStarted(false);
    setShowResults(true);
  };

  const handleImageSelectionAndUpdate = (selectedImage) => {
    const updatedTestData = testData.map(item => {
        if (item.id === selectedImage) {
            return { ...item, selectedCount: item.selectedCount + 1, health: item.health + 5 };
        } else {
            const updatedHealth = item.health - 10;
            if (updatedHealth >= 0) {
                return { ...item, notSelectedCount: item.notSelectedCount + 1, health: updatedHealth };
            } else {
                return item; // Discard the image with health below 0
            }
        }
    });
    setTestData(updatedTestData);

    const remainingImages = images.filter(image => image !== selectedImage && updatedTestData.find(item => item.id === image && item.health > 0));
    if (remainingImages.length >= 2) {
        const randomImageIndex1 = Math.floor(Math.random() * remainingImages.length);
        let randomImageIndex2 = Math.floor(Math.random() * remainingImages.length);
        while (randomImageIndex2 === randomImageIndex1) {
            randomImageIndex2 = Math.floor(Math.random() * remainingImages.length);
        }
        setImage1(remainingImages[randomImageIndex1]);
        setImage2(remainingImages[randomImageIndex2]);
    } else {
        setTestingStarted(false);
        setShowResults(true);
    }
};

  return (
    <div className="abtest-container">
      {showResults ? (
        <Results testData={testData} />
      ) : (
        <>
          <Typography variant="h5" gutterBottom className="abtest-title">A/B Testing</Typography>
          {testingStarted ? (
            <>
              <Grid container spacing={2}>
                <Grid item>
                  {image1 && <img src={image1} alt="Image 1" height={200} />}
                  <Button variant="contained" onClick={() => handleImageSelectionAndUpdate(image1)} className="select-btn">Select</Button>
                </Grid>
                <Grid item>
                  {image2 && <img src={image2} alt="Image 2" height={200} />}
                  <Button variant="contained" onClick={() => handleImageSelectionAndUpdate(image2)} className="select-btn">Select</Button>
                </Grid>
              </Grid>
              <Button variant="contained" color="secondary" onClick={handleFinishTest} className="finish-btn">Finish Test Early</Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={startTest} className="start-btn">Start Test</Button>
          )}
        </>
      )}
    </div>
  );
}

ABTest.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ABTest;
