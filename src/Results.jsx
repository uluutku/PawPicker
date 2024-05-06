// Results.jsx
import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Results = ({ testData }) => {
  useEffect(() => {
  console.log("Received testData:", testData);
  console.log("Total Tests Conducted:", getTotalTests());
}, [testData]); // I

  const getTotalTests = () => {
    if (!testData || !Array.isArray(testData)) {
      return 0;
    }
    return testData.reduce((total, result) => total + result.selectedCount + result.notSelectedCount, 0);
  };

  const sortedTestData = useMemo(() => {
    if (!testData) return [];
    return [...testData].sort((a, b) => b.health - a.health); // Sort testData based on health
  }, [testData]);

  return (
    <Paper style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>Test Results</Typography>
      <TableContainer>
        <Table>
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
                  <img src={result.id} alt={`Test Image ${index}`} style={{ maxWidth: 100, maxHeight: 100 }} />
                </TableCell>
                <TableCell align="right">{result.selectedCount}</TableCell>
                <TableCell align="right">{result.notSelectedCount}</TableCell>
                <TableCell align="right">{result.selectedCount * 5}</TableCell> {/* Health earned = times selected * 5 */}
                <TableCell align="right">{result.notSelectedCount * 10}</TableCell> {/* Health lost = times not selected * 10 */}
                <TableCell align="right">{result.health}</TableCell> {/* Health remaining */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1" gutterBottom>Total Tests Conducted: {getTotalTests()}</Typography>
    </Paper>
  );
}

Results.propTypes = {
  testData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    selectedCount: PropTypes.number.isRequired,
    notSelectedCount: PropTypes.number.isRequired,
    health: PropTypes.number.isRequired, // Add health prop
  })).isRequired,
};

export default Results;
