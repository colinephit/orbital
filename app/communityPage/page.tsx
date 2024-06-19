"use client";
import FriendsCard from "./FriendsCard";
import AddFriends from "./AddFriends";
import SearchFriendsPopUp from "./SearchFriendsPopUp";
import { Search } from "@mui/icons-material";

function Page() {
  return (
    <div>
      <h1>My Friends</h1>
      <SearchFriendsPopUp />
      <div style={{ marginTop: "30px" }}>
        <FriendsCard />
      </div>
    </div>
  );
}

export default Page;
