import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import UploadImages from './UploadImages';
import ABTest from './ABTest';
import Report from './Report';
import './App.css';

export default function App() {
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [stage, setStage] = useState('upload'); // Correctly initialize to 'upload'

    const handleImageUpload = (uploadedImages) => {
        setImages(uploadedImages);
        setStage('test'); // Transition to 'test' after images are uploaded
    };

    const handleTestComplete = (testResults) => {
        setResults(testResults);
        setStage('report'); // Transition to 'report' only after test is complete
    };

    const resetTest = () => {
        setImages([]);
        setResults([]);
        setStage('upload'); // Resetting the app to start state
    };

    const renderContent = () => {
        switch (stage) {
            case 'upload':
                return <UploadImages onImagesUploaded={handleImageUpload} />;
            case 'test':
                if (images.length > 1) { // Ensure there are enough images to conduct tests
                    return <ABTest images={images} onComplete={handleTestComplete} />;
                } else {
                    alert('Upload more images to begin testing.');
                    setStage('upload');
                    return null;
                }
            case 'report':
                return <Report imageData={results} onReset={resetTest} />;
            default:
                return <Typography variant="h6">Invalid application stage</Typography>;
        }
    };

    return (
        <Container maxWidth="xl" >
            <Typography variant="h4" gutterBottom className="app-title">
                Picture A/B Tester
            </Typography>
            {renderContent()}
        </Container>
    );
}
