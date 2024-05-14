"use client";

function ListGroup() {
  let items = [
    "CS2030S lab",
    "CS2040S tutorial",
    "Math tutorial",
    "Write Essay",
  ];

  return (
    <>
      <h1>To Do List</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li
            className="list-group-item"
            key={item}
            onClick={() => console.log("done!")}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
