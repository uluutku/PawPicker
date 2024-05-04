import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Card, CardActionArea, IconButton, LinearProgress, Skeleton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DoneIcon from '@mui/icons-material/Done';

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
                updateProgress();
            } else {
                onComplete(imageData);
            }
            setLoading(false);
        }, 500); // Added delay to simulate loading
    };

    const handleVote = (winnerIndex) => {
        if (!loading) {
            const endTime = Date.now();
            const decisionTime = endTime - startTime;
            const loserIndex = 1 - winnerIndex;
            const winner = currentPair[winnerIndex];
            const loser = currentPair[loserIndex];

            const updatedImageData = updateImageData(winner, loser, decisionTime);
            setVoteHistory([...voteHistory, { winner: winner.url, loser: loser.url }]);
            setImageData(updatedImageData);
            pickRandomPair();
        }
    };

    const updateImageData = (winner, loser, decisionTime) => {
        return imageData.map(img => {
            if (img.url === winner.url) {
                return { ...img, health: img.health + 5, wins: img.wins + 1, decisionTimes: [...img.decisionTimes, decisionTime] };
            } else if (img.url === loser.url) {
                return { ...img, health: Math.max(img.health - 10, 0), losses: img.losses + 1 };
            }
            return img;
        });
    };

    const undoLastVote = () => {
        if (voteHistory.length > 0 && !loading) {
            const lastVote = voteHistory.pop();
            const revertedImageData = imageData.map(img => {
                if (img.url === lastVote.winner) {
                    return { ...img, wins: img.wins - 1 };
                } else if (img.url === lastVote.loser) {
                    return { ...img, losses: img.losses - 1 };
                }
                return img;
            });
            setImageData(revertedImageData);
        }
    };

    const updateProgress = () => {
        const totalPairsPossible = imageData.length * (imageData.length - 1) / 2;
        const pairsTested = voteHistory.length;
        setProgress((pairsTested / totalPairsPossible) * 100);
    };

    return (
        <Paper elevation={3} square={false} sx={{
            
            bgcolor: 'var(--card-background-color)',
            color: 'white',
            padding: "50px",
            margin: "50px",
          }} 
          className="abtest-container">
            <Typography variant="h5">Just select better looking one</Typography>
            <LinearProgress variant="determinate" value={progress} className="progress-bar" />
            <Grid container spacing={2}>
                {currentPair.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index} >
                        <Card className="image-card" sx={{
            
            bgcolor: 'var(--card-background-color)',
            color: 'white',
            margin: "20px",
          }} >
                            <CardActionArea onClick={() => handleVote(index)}>
                                {loading ? (
                                    <Skeleton variant="rectangular" className="card-skeleton" height="100%" />
                                ) : (
                                    <img src={item.url} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <div className="action-buttons">
                <IconButton onClick={undoLastVote} className="icon-button" disabled={loading}>
                    <UndoIcon />
                </IconButton>
                <IconButton onClick={() => onComplete(imageData)} className="icon-button" disabled={loading}>
                    <DoneIcon />
                </IconButton>
            </div>
        </Paper>
    );
}
