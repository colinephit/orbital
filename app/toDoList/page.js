import Link from "next/link";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import HomePageButton from "./components/HomePageButton";
import ListGroup from "./components/ListGroup";

export default function Page() {
  return (
    <>
      <div>
        <HomePageButton></HomePageButton>
      </div>
      <div>
        <ListGroup></ListGroup>
      </div>
    </>
  );
}
