import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Card, CardActionArea, Button } from '@mui/material';

export default function ABTest({ images, onComplete }) {
    const [imageData, setImageData] = useState(images.map(url => ({
        url,
        health: 100,
        wins: 0,
        losses: 0,
        decisionTimes: []
    })));
    const [currentPair, setCurrentPair] = useState([]);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        pickRandomPair();
    }, [images]); // Ensure this effect correctly handles updates to `images`

    const pickRandomPair = () => {
        let activeImages = imageData.filter(img => img.health > 0);
        if (activeImages.length > 1) {
            activeImages.sort(() => 0.5 - Math.random());
            setCurrentPair(activeImages.slice(0, 2));
            setStartTime(Date.now());
        } else {
            onComplete(imageData); // When not enough images are active, complete the test
        }
    };

    const handleVote = (winnerIndex) => {
        const endTime = Date.now();
        const decisionTime = endTime - startTime;
        const loserIndex = 1 - winnerIndex;
        const winner = currentPair[winnerIndex];
        const loser = currentPair[loserIndex];

        updateImageData(winner, loser, decisionTime);
        pickRandomPair(); // Continue picking pairs after voting
    };

    const updateImageData = (winner, loser, decisionTime) => {
        const newData = imageData.map(img => {
            if (img.url === winner.url) {
                return { ...img, health: img.health + 5, wins: img.wins + 1, decisionTimes: [...img.decisionTimes, decisionTime] };
            } else if (img.url === loser.url) {
                return { ...img, health: Math.max(img.health - 10, 0), losses: img.losses + 1 };
            }
            return img;
        });
        setImageData(newData);
    };

    const finishEarly = () => {
        onComplete(imageData); // Send the current imageData to the onComplete handler
    };

    if (currentPair.length === 0) {
        return <Typography>No more pairs to test, or not enough images.</Typography>;
    }

    return (
        <Paper>
            <Typography variant="h5">A/B Test Your Images</Typography>
            <Grid container spacing={2}>
                {currentPair.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleVote(index)}>
                                <img src={item.url} alt={`Image ${index}`} style={{ width: '100%' }} />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={finishEarly} style={{ marginTop: '20px' }}>
                Finish Test Early
            </Button>
        </Paper>
    );
}
