import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./UploadImagesStyles"; // Import styles

export default function UploadImages({ onImagesUploaded, onImageRemoved }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleUpload = () => {
    onImagesUploaded(selectedFiles.map((file) => file.url));
  };

  const handleDelete = (fileUrl) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.url !== fileUrl)
    );
    onImageRemoved(fileUrl);
  };

  return (
    <Box sx={styles.uploadPage}>
      <Paper sx={styles.uploadContainer}>
        <Typography variant="h5" sx={styles.titleText}>
          Throw your pictures into the wizard&apos;s hat!
        </Typography>
        <Box {...getRootProps()} sx={styles.dropzone}>
          <input {...getInputProps()} />
          <p>
            Drag &apos;n&apos; drop some files in hat, or click to select files
          </p>
          <img
            src="https://en.snackson.com/wp-content/uploads/2015/06/magic_hat-255x258.png"
            alt="Wizard Hat"
            style={{
              width: "5vw",
              minWidth: "60px",
              alignSelf: "center",
              marginTop: "30px",
              animation: "bounce 2s infinite",
            }}
          />{" "}
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {selectedFiles.map((file, index) => (
            <Grid item xs={6} sm={4} md={3} key={index} sx={styles.gridItem}>
              <img src={file.url} alt="Upload preview" />
              <IconButton
                onClick={() => handleDelete(file.url)}
                sx={styles.deleteIcon}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!selectedFiles.length}
          sx={styles.button}
        >
          Cast Selection Spell
        </Button>
      </Paper>
    </Box>
  );
}

UploadImages.propTypes = {
  onImagesUploaded: PropTypes.func.isRequired,
  onImageRemoved: PropTypes.func.isRequired,
};
