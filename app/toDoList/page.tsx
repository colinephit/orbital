import Link from "next/link";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "./components/ListGroup";
import NavigationBar from "../NavigationBar";
import Checkboxes from "./components/Checkbox,";

export default function Page() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div>
        <ListGroup></ListGroup>
      </div>
    </>
  );
}
