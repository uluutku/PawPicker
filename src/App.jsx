// App.jsx

import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import UploadImages from './UploadImages';
import ABTest from './ABTest';
import Results from './Results';
import "./App.css"

const App = () => {
  const [images, setImages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [testData, setTestData] = useState(null);

  const startABTest = () => {
    const initialHealth = 100;
    const initialResults = images.map(image => ({
      id: image, // Using image URL as id
      selectedCount: 0,
      notSelectedCount: 0,
      health: initialHealth,
    }));
    setTestData(initialResults);
    setShowResults(false); // Hide results in case it was shown before
  }

  const handleImageSelection = (selectedImage) => {
    // Find the selected image in the testData array
    const updatedResults = [...testData];
    const selectedImageIndex = updatedResults.findIndex(result => result.id === selectedImage);
    // Increase health of selected image
    updatedResults[selectedImageIndex].health += 5;
    // Decrease health of not selected image
    const notSelectedImageIndex = updatedResults.findIndex(result => result.id !== selectedImage);
    updatedResults[notSelectedImageIndex].health -= 10;
    // Update counts
    updatedResults[selectedImageIndex].selectedCount++;
    updatedResults[notSelectedImageIndex].notSelectedCount++;
    // Remove images with health <= 0
    const filteredResults = updatedResults.filter(result => result.health > 0);
    setTestData(filteredResults);

    // If only one image left, end the test
    if (filteredResults.length === 1) {
      setShowResults(true);
    } else {
      startABTest(); // Continue test
    }
  };

  return (
    <Container maxWidth="md" className="app-container">
      <Typography variant="h3" gutterBottom className="app-title">Picture A/B Tester</Typography>
      {!showResults && (
        <div className="upload-container">
          <UploadImages setImages={setImages} />
        </div>
      )}
      <div className="test-section">
        {showResults ? <Results testData={testData} /> : <ABTest images={images} handleImageSelection={handleImageSelection} />}
      </div>
    </Container>
  );
}

export default App;
