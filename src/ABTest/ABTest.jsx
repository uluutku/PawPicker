import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Card,
  CardActionArea,
  Typography,
  LinearProgress,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Skeleton from "@mui/material/Skeleton";
import styles from "./ABTestStyles";
import PropTypes from "prop-types";

export default function ABTest({ images, onComplete }) {
  const [imageData, setImageData] = useState(
    images.map((url) => ({
      url,
      health: 100,
      wins: 0,
      losses: 0,
      decisionTimes: [],
    }))
  );
  const [currentPair, setCurrentPair] = useState([]);
  const [voteHistory, setVoteHistory] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const pickRandomPair = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let activeImages = imageData.filter((img) => img.health > 0);
      if (activeImages.length > 1) {
        activeImages.sort(() => 0.5 - Math.random());
        setCurrentPair(activeImages.slice(0, 2));
        setStartTime(Date.now());
      } else {
        onComplete(imageData);
      }
      setLoading(false);
    }, 0); // Added delay to simulate loading
  }, [imageData, onComplete]);

  useEffect(() => {
    pickRandomPair();
  }, [images, pickRandomPair]);

  const handleVote = (winnerIndex) => {
    const endTime = Date.now();
    const decisionTime = endTime - startTime;
    const loserIndex = 1 - winnerIndex;
    const winner = currentPair[winnerIndex];
    const loser = currentPair[loserIndex];

    // Define base points and calculate the multiplier based on decision time
    const basePoints = 10;
    let multiplier;
    if (decisionTime <= 800) {
      // Less than 800ms for a strong decision
      multiplier = 3;
    } else if (decisionTime <= 2000) {
      // Less than 2 seconds for a medium decision
      multiplier = 1;
    } else {
      // More than 2 seconds for a weak decision
      multiplier = 0.33;
    }

    // Apply the multiplier to the base points
    const winnerPoints = Math.round(basePoints * multiplier);
    const loserPoints = Math.round(basePoints * multiplier);

    const updatedImageData = imageData.map((img) => {
      if (img.url === winner.url) {
        return {
          ...img,
          health: Math.min(img.health + winnerPoints, 100),
          wins: img.wins + 1,
          decisionTimes: [...img.decisionTimes, decisionTime],
          votes: (img.votes || 0) + 1,
        };
      } else if (img.url === loser.url) {
        return {
          ...img,
          health: Math.max(img.health - loserPoints, 0),
          losses: img.losses + 1,
          votes: (img.votes || 0) + 1,
        };
      }
      return img;
    });
    setImageData(updatedImageData);

    // Updating vote history to correctly calculate progress
    const newVoteHistory = [
      ...voteHistory,
      { winner: winner.url, loser: loser.url },
    ];
    setVoteHistory(newVoteHistory);
    updateProgress(newVoteHistory.length);

    pickRandomPair();
  };

  const updateProgress = (pairsTested) => {
    const totalPairsPossible = (imageData.length * (imageData.length - 1)) / 2;
    setProgress((pairsTested / totalPairsPossible) * 60);
  };

  return (
    <Box sx={styles.abTestPage}>
      <Paper sx={styles.abtestContainer}>
        <Typography variant="h5" sx={styles.testHeading}>
          Just select the better-looking one between two.
        </Typography>
        <LinearProgress
          variant="determinate"
          sx={styles.progressBar}
          value={progress}
        />
        {progress >= 100 && (
          <div
            style={{ color: "#ffffff", textAlign: "center", marginTop: "5px" }}
          >
            Enough data is collected, but keep voting more images. It will
            refine results.
          </div>
        )}
        <Grid container spacing={2}>
          {currentPair.map((item, index) => (
            <Grid item xs={12} sm={6} key={index} sx={styles.gridItem}>
              <Card sx={styles.imageCard}>
                <CardActionArea onClick={() => handleVote(index)}>
                  {loading ? (
                    <Skeleton variant="rectangular" sx={styles.imageDisplay} />
                  ) : (
                    <Box
                      component="img"
                      sx={styles.imageDisplay}
                      alt={`Image ${index}`}
                      src={item.url}
                    />
                  )}
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={styles.actionButtons}>
          <IconButton
            sx={styles.iconButton}
            onClick={() => onComplete(imageData)}
            disabled={loading}
          >
            <DoneIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

ABTest.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onComplete: PropTypes.func.isRequired,
};
