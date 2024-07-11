import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import DateRangeIcon from "@mui/icons-material/DateRange";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

async function getFriendsDatabase(email) {
  const friendsCollection = collection(db, "friends");
  const q = query(friendsCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  let friends = [];

  querySnapshot.forEach((doc) => {
    friends = doc.data().Friends || [];
  });

  // Include the user email in the friends list
  friends.push(email);

  return friends;
}

async function getWeeklyPoints(email) {
  try {
    const pointsCollection = collection(db, "points");
    const q = query(pointsCollection, where("Email", "==", email));
    const querySnapshot = await getDocs(q);

    let userPoints = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.WeeklyPoints > 0) {
        userPoints = data.WeeklyPoints;
      }
    });

    return userPoints;
  } catch (error) {
    console.error("Error in getWeeklyPoints: ", error);
    return 0;
  }
}

async function getUserPoints(email) {
  try {
    const pointsCollection = collection(db, "points");
    const q = query(pointsCollection, where("Email", "==", email));
    const querySnapshot = await getDocs(q);

    let userPoints = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userPoints = data.Points;
    });

    return userPoints;
  } catch (error) {
    console.error("Error in getUserPoints: ", error);
    return 0;
  }
}

async function getUsername(email) {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let username = email; // Fallback to email if no username is found
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      username = data.name;
    });

    return username;
  } catch (error) {
    console.error("Error in getUsername: ", error);
    return email; // Fallback to email in case of an error
  }
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState("weekly"); // State to track the leaderboard type
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const friendsArray = await getFriendsDatabase(session.user.email);
          const friendsWithPointsAndNames = await Promise.all(
            friendsArray.map(async (friend) => {
              const weeklyPoints = await getWeeklyPoints(friend);
              const allTimePoints = await getUserPoints(friend);
              const name = await getUsername(friend);
              return { email: friend, weeklyPoints, allTimePoints, name };
            })
          );

          // Sort friends by the selected leaderboard type points in descending order
          friendsWithPointsAndNames.sort(
            (a, b) =>
              b[`${leaderboardType}Points`] - a[`${leaderboardType}Points`]
          );

          setLeaderboard(friendsWithPointsAndNames);
        } catch (e) {
          console.error("Error fetching data: " + e);
        }
      };
      fetchData();
    }
  }, [status, session, leaderboardType]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ alignItems: "center", width: "100%", maxWidth: "800px" }}>
        <h1 style={{ textAlign: "center" }}>Leaderboard</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="outlined"
            style={{
              padding: "10px",
              marginTop: "30px",
              marginRight: "30px",
              width: "150px",
              fontSize: "16px",
            }}
            onClick={() => setLeaderboardType("weekly")}
            endIcon={<DateRangeIcon />}
          >
            Weekly
          </Button>
          <Button
            variant="outlined"
            style={{
              padding: "10px",
              width: "150px",
              marginTop: "30px",
              fontSize: "16px",
            }}
            onClick={() => setLeaderboardType("allTime")}
            endIcon={<EmojiEventsRoundedIcon />}
          >
            All time
          </Button>
        </div>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: "50px",
            width: "100%",
            alignItems: "center",
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
                    width: "100px",
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
                  Points{" "}
                  {leaderboardType === "weekly"
                    ? "Earned This Week"
                    : "Earned All Time"}
                </TableCell>
                {/*
                <TableCell sx={{ fontSize: "17px", fontWeight: "bold" }}>
                  Total Hours this{" "}
                  {leaderboardType === "weekly" ? "week" : "all time"}
                </TableCell>
                */}
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((friend, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ fontSize: "17px", borderRight: "1px solid #bdbdbd" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "17px", borderRight: "1px solid #bdbdbd" }}
                  >
                    {friend.name}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "17px", borderRight: "1px solid #bdbdbd" }}
                  >
                    {leaderboardType === "weekly"
                      ? friend.weeklyPoints
                      : friend.allTimePoints}
                  </TableCell>
                  {/*
                  <TableCell sx={{ fontSize: "17px" }}>
                    {/* Placeholder for total hours }0
                  </TableCell>
                  */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Leaderboard;
