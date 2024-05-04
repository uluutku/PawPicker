import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent, CardMedia, Box } from '@mui/material';
import Confetti from 'react-confetti'; // Add this for celebratory animation

export default function Report({ imageData, onReset }) {
    imageData.forEach(img => {
        const totalVotes = img.wins + img.losses;
        img.winPercentage = ((img.wins / totalVotes) * 100).toFixed(2);
        img.score = ((img.wins / (img.losses || 1)) * totalVotes).toFixed(2);
        img.avgDecisionTime = img.decisionTimes.length > 0 ? (img.decisionTimes.reduce((a, b) => a + b, 0) / img.decisionTimes.length).toFixed(0) : 'N/A';
    });
    const sortedData = imageData.sort((a, b) => b.score - a.score);
    const winner = sortedData[0];

    return (
        <Card className="report-container" sx={{ animation: 'fadeIn 1s', maxWidth: 1200, mx: 'auto', my: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom component="div" sx={{ animation: 'slideDown .5s' }}>
                    Comprehensive Analysis Report
                </Typography>
                
                {winner && (
                    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                        <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} />
                        <Card elevation={6} sx={{ maxWidth: 600, animation: 'scaleUp .5s' }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 'auto', maxWidth: '100%', width: 'auto' }}
                                image={winner.url}
                                alt="Winner Image"
                            />
                            <CardContent>
                                <Typography variant="h5" textAlign="center">Winner Image Details</Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Total Votes</TableCell>
                                            <TableCell>{winner.votes}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Wins</TableCell>
                                            <TableCell>{winner.wins}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Losses</TableCell>
                                            <TableCell>{winner.losses}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Win Percentage</TableCell>
                                            <TableCell>{winner.winPercentage}%</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total Score</TableCell>
                                            <TableCell>{winner.score}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Avg. Decision Time (ms)</TableCell>
                                            <TableCell>{winner.avgDecisionTime}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                <TableContainer component={Paper} elevation={2} sx={{ mb: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="right">Wins</TableCell>
                                <TableCell align="right">Losses</TableCell>
                                <TableCell align="right">Total Votes</TableCell>
                                <TableCell align="right">Win Percentage (%)</TableCell>
                                <TableCell align="right">Total Score</TableCell>
                                <TableCell align="right">Avg. Decision Time (ms)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <img src={item.url} alt={`Uploaded ${index}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                    </TableCell>
                                    <TableCell align="right">{item.wins}</TableCell>
                                    <TableCell align="right">{item.losses}</TableCell>
                                    <TableCell align="right">{item.votes}</TableCell>
                                    <TableCell align="right">{item.winPercentage}</TableCell>
                                    <TableCell align="right">{item.score}</TableCell>
                                    <TableCell align="right">{item.avgDecisionTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Button onClick={onReset} variant="contained" sx={{ mt: 2 }}>Reset Analysis</Button>
            </CardContent>
        </Card>
    );
}
