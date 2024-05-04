import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Card, CardActionArea, IconButton, LinearProgress, Skeleton, Divider, Chip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import "./ABTest.css";

export default function ABTest({ images, onComplete }) {
    const [imageData, setImageData] = useState(images.map(url => ({
        url,
        health: 100,
        wins: 0,
        losses: 0,
        decisionTimes: []
    })));
    const [currentPair, setCurrentPair] = useState([]);
    const [voteHistory, setVoteHistory] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        pickRandomPair();
    }, [images]);

    const pickRandomPair = () => {
        setLoading(true);
        setTimeout(() => {
            let activeImages = imageData.filter(img => img.health > 0);
            if (activeImages.length > 1) {
                activeImages.sort(() => 0.5 - Math.random());
                setCurrentPair(activeImages.slice(0, 2));
                setStartTime(Date.now());
            } else {
                onComplete(imageData);
            }
            setLoading(false);
        }, 1500); // Added delay to simulate loading
    };

    const handleVote = (winnerIndex) => {
        const endTime = Date.now();
        const decisionTime = endTime - startTime;
        const loserIndex = 1 - winnerIndex;
        const winner = currentPair[winnerIndex];
        const loser = currentPair[loserIndex];

        const updatedImageData = imageData.map(img => {
            if (img.url === winner.url) {
                return { ...img, health: img.health + 5, wins: img.wins + 1, decisionTimes: [...img.decisionTimes, decisionTime], votes: (img.votes || 0) + 1 };
            } else if (img.url === loser.url) {
                return { ...img, health: Math.max(img.health - 10, 0), losses: img.losses + 1, votes: (img.votes || 0) + 1 };
            }
            return img;
        });
        setImageData(updatedImageData);

        // Updating vote history to correctly calculate progress
        const newVoteHistory = [...voteHistory, { winner: winner.url, loser: loser.url }];
        setVoteHistory(newVoteHistory);
        updateProgress(newVoteHistory.length); // Update progress with new vote history length

        pickRandomPair();
    };

    const updateProgress = (pairsTested) => {
        const totalPairsPossible = imageData.length * (imageData.length - 1) / 2;
        setProgress((pairsTested / totalPairsPossible) * 100);
    };

    return (
        <Paper elevation={3} className="abtest-container">
            <Typography variant="h5" className="test-heading">Select the better-looking one</Typography>
            <LinearProgress variant="determinate" value={progress} className="progress-bar" />
            <Grid container spacing={2}>
                {currentPair.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index} className="grid-item">
                        <Card className="image-card">
                            <CardActionArea onClick={() => handleVote(index)}>
                                {loading ? (
                                    <Skeleton variant="rounded" animation="wave" className="card-skeleton" />
                                ) : (
                                    <img src={item.url} alt={`Image ${index}`} className="image-display" />
                                )}
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="action-buttons">
                <IconButton onClick={() => onComplete(imageData)} className="icon-button" disabled={loading}>
                    <DoneIcon />
                </IconButton>
            </div>
        </Paper>
    );
}
