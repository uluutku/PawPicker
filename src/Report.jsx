import React from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import './Report.css';

export default function Report({ imageData }) {
    // Compute win/loss ratios and sort images based on this ratio
    imageData.forEach(img => {
        img.ratio = img.losses === 0 ? img.wins : img.wins / img.losses;
    });
    const sortedData = imageData.sort((a, b) => b.ratio - a.ratio);
    const winner = sortedData[0];

    // Data for the chart
    const chartData = {
        labels: sortedData.map(img => img.url),
        datasets: [
            {
                label: 'Win/Loss Ratio',
                data: sortedData.map(img => img.ratio),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }
        ]
    };

    return (
        <Paper className="report-container">
            <Typography variant="h3" className="report-title">Detailed Analysis Report</Typography>
            {winner && (
                <Box className="winner-section" style={{ marginBottom: "50px"}}>
                    <Typography variant="h6">Winner image</Typography>
                    <img src={winner.url} alt="Winner" style={{ width: '100%', maxWidth: '30vw', height: "auto" , borderRadius: '8px' , border: '6px solid gold', margin: '20px'  }} />
                    <Typography><b>{`Wins: ${winner.wins}, Losses: ${winner.losses}, Ratio: ${winner.ratio.toFixed(2)}`}</b></Typography>
                </Box>
            )}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Image</b></TableCell>
                            <TableCell><b>Wins</b></TableCell>
                            <TableCell><b>Losses</b></TableCell>
                            <TableCell><b>Win/Loss Ratio</b></TableCell>
                            <TableCell><b>Health</b></TableCell>
                            <TableCell><b>Avg. Decision Time (ms)</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img src={item.url} alt={`Uploaded ${index}`} style={{ width: 120, height: 120, objectFit: 'cover' }} />
                                </TableCell>
                                <TableCell>{item.wins}</TableCell>
                                <TableCell>{item.losses}</TableCell>
                                <TableCell>{item.ratio.toFixed(2)}</TableCell>
                                <TableCell className="report-td" align="right">{item.health}</TableCell>
                            <TableCell className="report-td" align="right">
                                {item.decisionTimes.length > 0 ? 
                                    (item.decisionTimes.reduce((a, b) => a + b, 0) / item.decisionTimes.length).toFixed(0) 
                                    : 'N/A'}
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Paper>
    );
}
