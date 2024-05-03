// Results.jsx

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import './Results.css';

const Results = ({ testData }) => {
  useEffect(() => {
    console.log("Received testData:", testData);
    console.log("Total Tests Conducted:", getTotalTests());
  }, [testData]);

  const getTotalTests = () => {
    if (!testData || !Array.isArray(testData)) {
      return 0;
    }
    return testData.reduce((total, result) => total + result.selectedCount + result.notSelectedCount, 0);
  };

  const sortedTestData = useMemo(() => {
    if (!testData) return [];
    return [...testData].sort((a, b) => {
      const ratioA = a.selectedCount / (a.selectedCount + a.notSelectedCount);
      const ratioB = b.selectedCount / (b.selectedCount + b.notSelectedCount);
      return ratioB - ratioA;
    });
  }, [testData]);

  const downloadImage = (imageUrl, fileName) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/jpeg');
    };
    img.src = imageUrl;
  };

  // Get the winner image with the highest selected:not selected ratio
  const winnerImage = sortedTestData.length > 0 ? sortedTestData[0] : null;

  return (
    <Paper className="results-paper">
      <Typography variant="h5" gutterBottom className="results-title">Test Results</Typography>
      {winnerImage && (
        <div className="winner-section">
          <Typography variant="h6">Winner Image</Typography>
          <img src={winnerImage.id} alt="Winner" className="winner-image" />
          <Button variant="contained" onClick={() => downloadImage(winnerImage.id, 'WinnerImage')}>Download Winner</Button>
          <Typography variant="body1">Selected: {winnerImage.selectedCount}, Not Selected: {winnerImage.notSelectedCount}</Typography>
        </div>
      )}
      <TableContainer>
        <Table className="results-table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Times Selected</TableCell>
              <TableCell align="right">Times Not Selected</TableCell>
              <TableCell align="right">Health Earned</TableCell>
              <TableCell align="right">Health Lost</TableCell>
              <TableCell align="right">Health Remaining</TableCell>
              <TableCell align="right">Ratio</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTestData.map((result, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <img
                    src={result.id}
                    alt={`Test Image ${index}`}
                    className="results-image"
                    style={{ maxHeight: '100px', maxWidth: '100px' }}
                    onClick={() => downloadImage(result.id, `TestImage_${index}`)}
                  />
                </TableCell>
                <TableCell align="right">{result.selectedCount}</TableCell>
                <TableCell align="right">{result.notSelectedCount}</TableCell>
                <TableCell align="right">{result.selectedCount * 5}</TableCell>
                <TableCell align="right">{result.notSelectedCount * 10}</TableCell>
                <TableCell align="right">{result.health}</TableCell>
                <TableCell align="right">{`${result.selectedCount / (result.selectedCount + result.notSelectedCount) * 100}%`}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => downloadImage(result.id, `TestImage_${index}`)}>Download</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1" gutterBottom className="total-tests-text">Total Tests Conducted: {getTotalTests()}</Typography>
    </Paper>
  );
};

Results.propTypes = {
  testData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    selectedCount: PropTypes.number.isRequired,
    notSelectedCount: PropTypes.number.isRequired,
    health: PropTypes.number.isRequired,
  })).isRequired,
};

export default Results;
