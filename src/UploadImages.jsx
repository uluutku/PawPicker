import { Button, Grid, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';
import './UploadImages.css';

export default function UploadImages({ onImagesUploaded, onImageRemoved }) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            url: URL.createObjectURL(file),
            file
        }));
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
        multiple: true
    });

    const handleUpload = () => {
        onImagesUploaded(selectedFiles.map(file => file.url));
    };

    const handleDelete = (fileUrl) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.url !== fileUrl));
        onImageRemoved(fileUrl);
    };

    return (
        <Paper className="upload-container">
            <Typography variant="h6" style={{ fontFamily: '"Merriweather", "Roboto", "sans sherif"' }}>Throw your pictures into the wizard's cauldron</Typography>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
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
                Cast Selection Spell
            </Button>
        </Paper>
    );
}
