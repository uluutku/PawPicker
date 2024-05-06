import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

import Confetti from "react-confetti";

export default function Report({ imageData, onReset }) {
  imageData.forEach((img) => {
    const totalVotes = img.wins + img.losses;
    img.winPercentage = ((img.wins / totalVotes) * 100).toFixed(2);
    img.score = ((img.wins / (img.losses || 1)) * totalVotes).toFixed(2);
    img.avgDecisionTime =
      img.decisionTimes.length > 0
        ? (
            img.decisionTimes.reduce((a, b) => a + b, 0) /
            img.decisionTimes.length
          ).toFixed(0)
        : "N/A";
  });
  const sortedData = imageData.sort((a, b) => b.score - a.score);
  const winner = sortedData[0];

  return (
    <Card
      sx={{
        mt: "10vh",
        mb: "10vh",
        bgcolor: "#333333", // Dark blue background
        color: "#c9d1d9", // Light grey text
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)", // Enhanced shadow
        borderRadius: "10px",
        p: 1,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          style={{ animation: "slideDown 1s" }}
        >
          Alchemy of Analytics: Selection Spell Report
        </Typography>

        {winner && (
          <Box
            sx={{
              position: "relative",
              display: "flex",

              flexDirection: "column",
              alignItems: "center",
              my: 2,
            }}
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={400}
              recycle={false}
            />
            <Typography variant="h5" gutterBottom>
              Top Performer Revealed!
            </Typography>
            <Card
              elevation={1}
              sx={{ maxWidth: "100%", animation: "scaleUp 1s" }}
            >
              <CardMedia
                component="img"
                image={winner.url}
                alt="Top Performer"
                sx={{ width: "100%", maxHeight: 600, objectFit: "contain" }}
              />
              <CardContent>
                <Typography>
                  Discover the magic behind the success with an impressive win
                  percentage of {winner.winPercentage}%.
                </Typography>
              </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{ maxWidth: "95%", mt: 2 }}>
              <Table aria-label="Winner details">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Wins
                    </TableCell>
                    <TableCell align="right">{winner.wins}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Losses
                    </TableCell>
                    <TableCell align="right">{winner.losses}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Total Votes
                    </TableCell>
                    <TableCell align="right">
                      {winner.wins + winner.losses}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Win Percentage (%)
                    </TableCell>
                    <TableCell align="right">{winner.winPercentage}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Avg. Decision Time (ms)
                    </TableCell>
                    <TableCell align="right">
                      {winner.avgDecisionTime}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
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
                    <img
                      src={item.url}
                      alt={`Uploaded ${index}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell align="right">{item.wins}</TableCell>
                  <TableCell align="right">{item.losses}</TableCell>
                  <TableCell align="right">{item.totalVotes}</TableCell>
                  <TableCell align="right">{item.winPercentage}</TableCell>
                  <TableCell align="right">{item.score}</TableCell>
                  <TableCell align="right">{item.avgDecisionTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          onClick={onReset}
          variant="contained"
          style={{ marginTop: "20px", animation: "pulse 2s infinite" }}
        >
          Reset Enchantment
        </Button>
      </CardContent>
    </Card>
  );
}

Report.propTypes = {
  imageData: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      wins: PropTypes.number.isRequired,
      losses: PropTypes.number.isRequired,
      decisionTimes: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  onReset: PropTypes.func.isRequired,
};
