// Results.jsx

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import "./Results.css"

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
    return [...testData].sort((a, b) => b.health - a.health);
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
      }, 'image/jpeg'); // Change 'image/jpeg' to the original format of the image if needed
    };
    img.src = imageUrl;
  };

  return (
    <Paper className="results-paper">
      <Typography variant="h5" gutterBottom className="results-title">Test Results</Typography>
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
                    onClick={() => downloadImage(result.id, `TestImage_${index}`)}
                  />
                </TableCell>
                <TableCell align="right">{result.selectedCount}</TableCell>
                <TableCell align="right">{result.notSelectedCount}</TableCell>
                <TableCell align="right">{result.selectedCount * 5}</TableCell>
                <TableCell align="right">{result.notSelectedCount * 10}</TableCell>
                <TableCell align="right">{result.health}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1" gutterBottom className="total-tests-text">Total Tests Conducted: {getTotalTests()}</Typography>
    </Paper>
  );
}

Results.propTypes = {
  testData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    selectedCount: PropTypes.number.isRequired,
    notSelectedCount: PropTypes.number.isRequired,
    health: PropTypes.number.isRequired,
  })).isRequired,
};

export default Results;
