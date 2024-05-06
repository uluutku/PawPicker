const styles = {
  uploadPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    height: "100vh", // Full viewport height
    backgroundColor: "#121212", // Dark background for the entire upload page
  },
  uploadContainer: {
    mt: "10vh", // Sets top margin; adjust as necessary
    padding: "10px",
    backgroundColor: "#333333", // Dark grey
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Stronger shadow for dark mode
    borderRadius: "10px",
    width: "100%",
    minHeight: "80vh",
  },
  dropzone: {
    display: "flex",
    minHeight: "200px", // Minimum height for the dropzone area
    flexDirection: "column",
    justifyContent: "center", // Vertical centering
    alignItems: "center", // Horizontal centering
    border: "2px dashed #555555", // Darker gray border
    borderRadius: "10px",
    backgroundColor: "#2a2a2a", // Very dark gray background
    color: "#dddddd", // Light gray text for better contrast
    padding: "20px",
    textAlign: "center",
    "&:hover": {
      borderColor: "#3f51b5", // Primary blue on hover
      backdropFilter: "blur(4px)", // Blur effect on hover
    },
  },
  gridItem: {
    position: "relative",
    img: {
      width: "100%",
      height: "auto",
      borderRadius: "5px",
      transition: "transform 0.4s ease", // Smoother transition for scaling
      "&:hover": {
        zIndex: 1, // Ensures the image is on top of other elements on hover
        transform: "scale(1.05)", // Scales the image up by 150% on hover after 1 second
      },
    },
  },
  deleteIcon: {
    position: "absolute",
    bottom: "8px", // More visually pleasing placement
    right: "8px", // More visually pleasing placement
    color: "#f44336", // Red color for delete actions, indicating a warning or negative action
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly transparent black background to make the icon stand out
    borderRadius: "50%", // Circular shape
    padding: "5px", // Padding around the icon
    transition: "transform 0.4s ease", // Smoother transition for scaling
    "&:hover": {
      zIndex: 1, // Ensures the image is on top of other elements on hover
      transform: "scale(1.2)", // Scales the image up by 150% on hover after 1 second
      backgroundColor: "rgba(0, 0, 0, 0.9)", // Darker background on hover
    },
  },
  button: {
    mt: 2, // Sets top margin; adjust as necessary
    backgroundColor: "#4caf50", // Green button for actions
    color: "#ffffff", // White text on button
    "&:hover": {
      backgroundColor: "#388e3c", // Darker green on hover
    },
  },
};

export default styles;
