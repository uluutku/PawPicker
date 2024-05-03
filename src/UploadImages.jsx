import React, { useState } from 'react';
import { Button, Grid, Typography, Paper, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import './UploadImages.css';

export default function UploadImages({ onImagesUploaded, onImageRemoved }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileSelect = (event) => {
        const newFiles = Array.from(event.target.files).map(file => ({
            url: URL.createObjectURL(file),
            file
        }));
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleUpload = () => {
        onImagesUploaded(selectedFiles.map(file => file.url));
    };

    const handleDelete = (fileUrl) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.url !== fileUrl));
        onImageRemoved(fileUrl);
    };

    return (
        <Paper className="upload-container">
            <Typography variant="h6">Upload Your Images</Typography>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                multiple
                type="file"
                onChange={handleFileSelect}
            />
            <label htmlFor="file-input">
                <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                    Choose Images
                </Button>
            </label>
            <Grid container spacing={2} className="preview-grid">
                {selectedFiles.map((file, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <img src={file.url} alt="Upload preview" className="upload-preview-img" />
                        <IconButton onClick={() => handleDelete(file.url)} className="delete-icon" aria-label="Delete image">
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFiles.length}>
                Start Test
            </Button>
        </Paper>
    );
}
