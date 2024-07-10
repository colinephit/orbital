import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Leaderboard() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: "800px", alignItems: "center" }}>
        <h1 style={{ textAlign: "center" }}>Leaderboard</h1>

        <TableContainer
          component={Paper}
          sx={{
            width: "800px",
            marginTop: "50px",
            display: "flex",
          }}
        >
          <Table sx={{ width: "800px" }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#ECF2D5" }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    borderRight: "1px solid #bdbdbd",
                  }}
                >
                  Ranking
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    borderRight: "1px solid #bdbdbd",
                    width: "250px",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "17px",
                    fontWeight: "bold",
                    borderRight: "1px solid #bdbdbd",
                    width: "200px",
                  }}
                >
                  Points this week
                </TableCell>
                <TableCell sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Total Hours this week
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/*map each person on the leaderboard to a row  */}
              <TableRow sx={{}}>
                <TableCell
                  sx={{ fontSize: "17px", borderRight: "1px solid #bdbdbd" }}
                >
                  {/*person's leaderboard ranking */}1
                </TableCell>
                <TableCell
                  sx={{ fontSize: "17px", borderRight: "1px solid #bdbdbd" }}
                >
                  {/*friends name */}
                  Me
                </TableCell>
                <TableCell
                  sx={{ fontSize: "17px", borderRight: "1px solid #bdbdbd" }}
                >
                  {/*number of points */}
                  4000
                </TableCell>{" "}
                {/*number of hours */}
                <TableCell sx={{ fontSize: "17px" }}>50</TableCell>{" "}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Leaderboard;
