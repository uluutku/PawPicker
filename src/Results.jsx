import React, { useMemo } from 'react';
import { Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './Results.css'; // Ensure to include CSS for styling

const downloadPDF = async (votes) => {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: 'a4'
    });

    let yPos = 20;

    // Sorting votes by win/loss ratio
    const sortedVotes = Object.entries(votes).sort((a, b) => {
        return (b[1].wins / (b[1].losses || 1)) - (a[1].wins / (a[1].losses || 1));
    });

    // Adding images and stats to PDF
    for (const [url, data] of sortedVotes) {
        const canvas = await html2canvas(document.querySelector(`[data-url='${url}']`));
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 20, yPos, 180, 180); // Adjust size as needed
        pdf.setFontSize(10);
        pdf.text(`Wins: ${data.wins}, Losses: ${data.losses}, Ratio: ${(data.wins / (data.losses || 1)).toFixed(2)}`, 210, yPos + 90);
        yPos += 200;

        if (yPos >= 800) { // Check page overflow
            pdf.addPage();
            yPos = 20;
        }
    }

    pdf.save('test-results.pdf');
}

export default function Results({ votes, onReset }) {
    const sortedVotes = useMemo(() => {
        const sortedItems = Object.entries(votes).map(([url, data]) => ({
            url,
            ...data,
            ratio: data.wins / (data.losses || 1) // Prevent division by zero
        }));
        sortedItems.sort((a, b) => b.ratio - a.ratio);
        return sortedItems;
    }, [votes]);

    const winner = sortedVotes[0] || null;

    return (
        <Paper className="results-container">
            <Typography variant="h4">Test Results</Typography>
            {winner && (
                <div className="winner-section">
                    <Typography variant="h6">Winner</Typography>
                    <img src={winner.url} alt="Winner" className="winner-image"/>
                    <Typography>{`Wins: ${winner.wins}, Losses: ${winner.losses}, Ratio: ${winner.ratio.toFixed(2)}`}</Typography>
                </div>
            )}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Wins</TableCell>
                            <TableCell>Losses</TableCell>
                            <TableCell>Win/Lose Ratio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedVotes.map((vote, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <img src={vote.url} alt="Uploaded" data-url={vote.url} style={{ width: 100, height: 100, objectFit: 'cover' }}/>
                                </TableCell>
                                <TableCell>{vote.wins}</TableCell>
                                <TableCell>{vote.losses}</TableCell>
                                <TableCell>{vote.ratio.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={() => downloadPDF(votes)} className="export-button">
                Export to PDF
            </Button>
            <Button variant="contained" color="secondary" onClick={onReset} className="reset-button">
                Start Over
            </Button>
        </Paper>
    );
}
