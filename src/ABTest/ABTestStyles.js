import { maxWidth } from "@mui/system";

const styles = {
  abTestPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    m: 0, // Zero margin
    p: 0, // Zero padding
    height: "100vh", // Ensures the page takes up full viewport height
    backgroundColor: "#121212", // Dark background for better contrast in dark mode
    color: "#ffffff", // White text for readability
  },
  abtestContainer: {
    width: "100%",
    minWidth: "60vw", // Minimum width for better responsiveness+
    minHeight: "60vh", // Minimum height for better responsiveness
    padding: "20px",
    backgroundColor: "#333333", // Dark grey background
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)", // More prominent shadow for depth
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center vertically
    justifyContent: "center", // Center horizontally
    gap: "20px", // Space between child elements
  },
  testHeading: {
    fontSize: "1.5rem", // Larger font size for headings
    fontWeight: "bold", // Bold font weight for emphasis
    textAlign: "center",
    color: "#81D4FA", // Light blue for an appealing contrast
  },
  progressBar: {
    width: "100%", // Full width of the container
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#555555", // Darker grey background for the progress bar
  },
  gridItem: {
    width: "100%", // Ensures the grid item takes the full width of its container
    padding: "10px",
    display: "flex",
    justifyContent: "center", // Centers the cards horizontally
  },
  imageCard: {
    width: "100%", // Full width to maximize space
    maxHeight: "300px", // Max height for images
    overflow: "hidden", // Hides parts of the image that overflow the container
    borderRadius: "5px", // Rounded corners for a softer look
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    transition: "transform 0.3s ease-in-out", // Smooth transform on hover
    display: "flex", // Ensures that the child elements can be flexibly aligned
    justifyContent: "center", // Centers the image horizontally
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.05)", // Slightly enlarge the card on hover
    },
  },
  imageDisplay: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto", // Adjust height automatically to maintain aspect ratio
    width: "auto", // Adjust width automatically to maintain aspect ratio
    objectFit: "contain",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center", // Center alignment for the action buttons
    padding: "10px 0", // Padding top and bottom
  },
  iconButton: {
    color: "#4caf50", // Green color for actionable icons
    "&:hover": {
      backgroundColor: "#388e3c", // Darker green on hover for better feedback
    },
  },
};

export default styles;
