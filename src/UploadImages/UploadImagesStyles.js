const styles = {
  uploadPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#121212",
  },
  uploadContainer: {
    mt: "10vh",
    padding: "10px",
    backgroundColor: "#333333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    width: "100%",
    minHeight: "80vh",
    display: "flex", // Use Flexbox
    flexDirection: "column", // Column layout
    justifyContent: "space-between", // Push button to the bottom
  },
  titleText: {
    color: "#dddddd",
    mb: 2,
  },
  dropzone: {
    m: "3vh 3vw",
    display: "flex",
    minHeight: "30vh",
    minWidth: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px dashed #555555",
    borderRadius: "10px",
    backgroundColor: "#2a2a2a",
    color: "#dddddd",
    padding: "20px",
    textAlign: "center",
    "&:hover": {
      borderColor: "#3f51b5",
      backdropFilter: "blur(4px)",
    },
  },
  gridItem: {
    position: "relative",
    img: {
      width: "100%",
      height: "auto",
      borderRadius: "5px",
      transition: "transform 0.4s ease",
      "&:hover": {
        zIndex: 1,
        transform: "scale(1.05)",
      },
    },
  },
  deleteIcon: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    color: "#f44336",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "50%",
    padding: "5px",
    transition: "transform 0.4s ease",
    "&:hover": {
      zIndex: 1,
      transform: "scale(1.2)",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
    },
  },
  button: {
    alignSelf: "flex-end", // Align button to the right
    mb: 4,
    mr: 4,
    backgroundColor: "#4caf50",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#388e3c",
    },
    "&:disabled": {
      backgroundColor: "#757575",
      color: "#bdbdbd",
    },
  },
};

export default styles;
